import express from "express";
import { paymentMiddlewareFromConfig } from "@x402/express";
import { HTTPFacilitatorClient } from "@x402/core/server";
import { ExactStellarScheme } from "@x402/stellar/exact/server";
import cors from "cors";

const app = express();
app.use(express.json());

// RECOVERY_CORS: Enabling both SDK and Dashboard visibility
app.use(cors({ 
  exposedHeaders: [
    'x-x402-payment-required', 
    'x-x402-payment-settled', 
    'payment-required', 
    'payment-settled',
    'payment-response'
  ] 
}));

const PORT = Number(process.env.PORT) || 4021;
const FACILITATOR_URL = process.env.X402_FACILITATOR_URL || "https://www.x402.org/facilitator";
const DEFAULT_PAY_TO = process.env.PUBLIC_PAY_TO_ADDRESS || "GAIDBQMDGEEGJF6WQ6VJMRLBVUMPDWD724TUCGTPRBQ4UFMSN766C4FO";

// IN-MEMORY STORES
const dynamicProxies: Record<string, any> = {
  "/weather": {
    target: "INTERNAL_STATIC",
    price: "$0.001",
    payTo: DEFAULT_PAY_TO
  }
};

const paymentLog: Array<{
  name: string; url: string; amt: string;
  time: string; hash: string; ok: boolean;
}> = [];

/**
 * DYNAMIC PAYWALL MIDDLEWARE
 */
app.use(async (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  if (req.path === "/health") return next();
  
  const proxy = dynamicProxies[req.path];
  if (!proxy) return next();

  console.log(`🛡️  MONITORING: ${req.path}`);
  const middleware = paymentMiddlewareFromConfig(
    {
      [`GET ${req.path}`]: {
        accepts: { 
          scheme: "exact", 
          price: proxy.price, 
          network: "stellar:testnet", 
          payTo: proxy.payTo 
        },
      },
    },
    new HTTPFacilitatorClient({ url: FACILITATOR_URL }),
    [{ network: "stellar:testnet", server: new ExactStellarScheme() }],
  );

  // EXECUTE MIDDLEWARE
  return middleware(req, res, () => {
    // IF WE ARE HERE, PAYMENT IS VERIFIED!
    console.log(`💰 [PAYMENT SUCCESS] Logged for ${req.path}`);
    paymentLog.unshift({
      name: `Proxy ${req.path}`,
      url: `http://localhost:${PORT}${req.path}`,
      amt: proxy.price.replace('$', ''),
      time: new Date().toLocaleTimeString(),
      hash: req.headers['payment-response']?.toString().slice(0, 12) || "verified_" + Math.random().toString(36).slice(2, 8),
      ok: true
    });
    next();
  });
});

// --- ADMIN & HUD APIs ---

app.get("/health", (req, res) => {
  res.status(200).json({ status: "online", version: "8.2.0-auditor" });
});

app.get("/api/payments", (req, res) => {
  res.json({ payments: paymentLog.slice(0, 10) }); // Return last 10
});

app.get("/api/proxies", (req, res) => {
  const proxies = Object.entries(dynamicProxies).map(([path, data]) => ({
    name: `User Proxy (${path})`,
    price: data.price,
    url: `http://localhost:${PORT}${path}`,
    status: "active",
    calls: Math.floor(Math.random() * 5), // Mocking calls for demo flavor
    verified: true,
    payments: 0,
  }));
  res.json({ proxies });
});

app.post("/api/create-paywall", (req, res) => {
  const { path, target, price, payTo } = req.body;
  const slug = path.startsWith("/") ? path : `/${path}`;
  dynamicProxies[slug] = { target, price, payTo: payTo || DEFAULT_PAY_TO };
  console.log(`✨ NEW PAYWALL: ${slug} -> ${target}`);
  res.json({ success: true, proxyUrl: `http://localhost:${PORT}${slug}` });
});

// --- CONTENT HANDLERS ---

app.get("/weather", (req, res) => {
  res.json({ weather: "It is Sunny on Stellar!", status: "Paid" });
});

app.use(async (req, res) => {
  const proxy = dynamicProxies[req.path];
  if (proxy && proxy.target !== "INTERNAL_STATIC") {
    try {
      const response = await fetch(proxy.target);
      const data = await response.text();
      return res.send(data);
    } catch {
      return res.status(502).json({ error: "Upstream Error" });
    }
  }
  res.status(404).send("Not Found");
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 PayWall.ai v8.2.0 LIVE at http://127.0.0.1:${PORT}`);
});
