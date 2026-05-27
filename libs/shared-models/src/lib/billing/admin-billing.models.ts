export interface AdminBillingOverview {
  mrr: number;
  arr: number;
  totalActiveSubscriptions: number;
  planDistribution: { free: number; pro: number; enterprise: number; [key: string]: number };
}

export interface AdminInvoice {
  id: string;
  userId: string | null;
  userEmail: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
}

export interface AdminInvoicePage {
  content: AdminInvoice[];
  totalElements: number;
  page: number;
  size: number;
}
