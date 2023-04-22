export interface Receipt {
  id: string;
  hash: string;
  store: string;
  OCRData: ReceiptData;
  created_at: string;
}

interface ReceiptData {
  products: Product[];
}

interface Product {
  name: string;
  price: string;
}

export interface receiptsHttpResponse {
  data: Receipt[];
}

export interface receiptHttpResponse {
  data: Receipt;
}
