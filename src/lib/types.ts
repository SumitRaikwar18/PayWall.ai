export interface PaymentRecord {
  name: string;
  url: string;
  amt: string;
  time: string;
  hash: string;
  ok: boolean;
}

export interface ServiceEntry {
  name: string;
  price: string;
  url: string;
  verified: boolean;
  payments: number;
  status: string; // 'active', 'offline', 'deploying'
  calls: number;  // total request count
}
