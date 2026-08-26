export type AdminDashboardCounts = {
  orders: number;
  customers: number;
  pending: number;
  paid: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  toShip: number;
  lowStock: number;
};

export type AdminDashboardTotals = {
  pending: number;
  revenue: number;
};

export type AdminDashboardOrder = {
  id: string;
  status: string;
  total: number;
  currency: string;
  createdAt: string;
  itemCount: number;
  customer: {
    email: string;
    fullName: string;
    phone: string;
  } | null;
};

export type AdminDashboard = {
  counts: AdminDashboardCounts;
  totals: AdminDashboardTotals;
  recentOrders: AdminDashboardOrder[];
};

export type AdminCustomer = {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  createdAt: string;
  orderCount: number;
  totalSpent: number;
  lastOrderAt: string;
  lastStatus: string;
};

export type AdminInventoryItem = {
  productId: string;
  variantId: string | null;
  name: string;
  slug: string;
  brand: string;
  type: string;
  label: string;
  price: number;
  stock: number;
  published: boolean;
};
