export interface Sales {
  time: string;
  total_income: string;
}

export interface Orders {
  time: string;
  total_orders: string;
}

export interface OrdersByStatus {
  status: string;
  total_orders: string;
}

export interface TopBuyers {
  nama: string;
  total_pembelian: number;
  total_pendapatan: string;
  persentase_pendapatan: string;
}