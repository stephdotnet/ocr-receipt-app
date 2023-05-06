export interface Receipt {
  id: string;
  hash: string;
  store: Store;
  products: Product[];
  created_at: string;
  invoice_date: string;
  recently_created: boolean;
}

interface Store {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
}

export interface receiptsHttpResponse {
  data: Receipt[];
}

export interface receiptHttpResponse {
  data: Receipt;
}
