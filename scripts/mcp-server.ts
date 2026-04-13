import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { Transaction, TransactionBuilder } from "@stellar/stellar-sdk";
import { x402Client, x402HTTPClient } from "@x402/fetch";
import { createEd25519Signer, getNetworkPassphrase } from "@x402/stellar";
import { ExactStellarScheme } from "@x402/stellar/exact/client";

const SECRET_KEY = process.env.STELLAR_SECRET_KEY || "";
const DEFAULT_PAY_TO = process.env.PUBLIC_PAY_TO_ADDRESS || "GAIDBQMDGEEGJF6WQ6VJMRLBVUMPDWD724TUCGTPRBQ4UFMSN766C4FO";
const NETWORK = "stellar:testnet";
const STELLAR_RPC_URL = "https://soroban-testnet.stellar.org";
const LOCAL_PROXY = "http://127.0.0.1:4021";

const server = new McpServer({
  name: "PayWall.ai",
  version: "8.1.0",
});

/**
 * TOOL 1: register_paywall
 */
server.tool(
  "register_paywall",
  {
    path: z.string().describe("The slug (e.g. /portfolio)"),
    targetUrl: z.string().describe("URL to protect"),
    price: z.string().describe("Price (e.g. $0.05)"),
    payTo: z.string().optional().describe("Stellar G-address. Defaults to system wallet if omitted.")
  },
  async ({ path, targetUrl, price, payTo }) => {
    try {
      // SMART_FALLBACK: If payTo is invalid or missing, use the system default
      const finalPayTo = (payTo && payTo.startsWith('G')) ? payTo : DEFAULT_PAY_TO;
      
      console.error(`[v8.1.0] Registering: ${path} for ${finalPayTo}`);
      const res = await fetch(`${LOCAL_PROXY}/api/create-paywall`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, target: targetUrl, price, payTo: finalPayTo })
      });
      return { content: [{ type: "text", text: `Success! Paywall live at: ${LOCAL_PROXY}${path}. Payouts will go to ${finalPayTo}` }] };
    } catch (err: any) {
      return { content: [{ type: "text", text: `Registration Fail: ${err.message}` }], isError: true };
    }
  }
);

/**
 * TOOL 2: pay_and_fetch
 */
server.tool(
  "pay_and_fetch",
  { url: z.string().describe("The COMPLETE URL to fetch") },
  async ({ url }) => {
    if (!SECRET_KEY) return { content: [{ type: "text", text: "Error: No secret key." }], isError: true };
    try {
      const signer = createEd25519Signer(SECRET_KEY, NETWORK);
      const x402client = new x402Client().register("stellar:*", new ExactStellarScheme(signer, { url: STELLAR_RPC_URL }));
      const httpClient = new x402HTTPClient(x402client);

      const probe = await fetch(url, { headers: { 'bypass-tunnel-reminder': 'true' } });
      if (probe.status !== 402) return { content: [{ type: "text", text: `Data: ${await probe.text()}` }] };

      const paymentRequired = httpClient.getPaymentRequiredResponse((name) => probe.headers.get(name));
      let paymentPayload = await x402client.createPaymentPayload(paymentRequired);
      
      const networkPassphrase = getNetworkPassphrase(NETWORK);
      const tx = new Transaction(paymentPayload.payload.transaction as string, networkPassphrase);
      const sorobanData = tx.toEnvelope().v1()?.tx()?.ext()?.sorobanData();

      if (sorobanData) {
        paymentPayload = {
          ...paymentPayload,
          payload: {
            ...paymentPayload.payload,
            transaction: TransactionBuilder.cloneFrom(tx, {
              fee: "50000", 
              sorobanData,
              networkPassphrase,
            }).build().toXDR(),
          },
        };
      }

      const paymentHeaders = httpClient.encodePaymentSignatureHeader(paymentPayload);
      const res = await fetch(url, { headers: { ...paymentHeaders, 'bypass-tunnel-reminder': 'true' } });
      const data = await res.text();
      return { content: [{ type: "text", text: `✅ SUCCESS DATA: ${data}` }] };
    } catch (err: any) {
      return { content: [{ type: "text", text: `ERROR: ${err.message}` }], isError: true };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("PayWall MCP v8.1.1 (Smart-Creator) running");
}

main().catch(console.error);
