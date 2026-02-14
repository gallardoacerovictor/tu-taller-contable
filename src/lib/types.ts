export interface UserProfile {
  name: string;
  business: {
    name: string;
    category: string;
    startDate: string;
    location: string;
    logo?: string;
  };
  settings: {
    hourlyRate: number;
    services: {
      electricity: number;
      gas: number;
      water: number;
    };
    fixedCosts: {
      rent: number;
      services: number;
      other: number;
    };
    transport: {
      mode: 'per-trip' | 'percentage';
      value: number;
    };
    distributeFixedCosts: boolean;
    darkMode: boolean;
  };
}

export interface Supply {
  id: string;
  name: string;
  category: 'gastronomia' | 'indumentaria' | 'cosmetica' | 'artesanias' | 'packaging' | 'otros';
  unit: string;
  quantityBought: number;
  pricePaid: number;
  pricePerUnit: number;
}

export interface ProductIngredient {
  supplyId: string;
  name: string;
  quantity: number;
  unit: string;
  cost: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  photo?: string;
  ingredients: ProductIngredient[];
  packaging: ProductIngredient[];
  services: {
    hours: number;
    minutes: number;
    cost: number;
  };
  labor: {
    hours: number;
    minutes: number;
    cost: number;
  };
  fixedCostPerUnit: number;
  totalCost: number;
  sellingPrice?: number;
  unitsPerMonth?: number;
  createdAt: string;
}

export type ExpenseCategory =
  | 'transporte'
  | 'marketing'
  | 'alquiler'
  | 'servicios'
  | 'limpieza'
  | 'capacitacion'
  | 'comisiones'
  | 'tramites'
  | 'muestras'
  | 'otros';

export interface Expense {
  id: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  paymentMethod: 'efectivo' | 'debito' | 'credito' | 'transferencia';
  recurring: boolean;
}

export const EXPENSE_CATEGORIES: Record<ExpenseCategory, { label: string; emoji: string; color: string }> = {
  transporte: { label: 'Transporte y Nafta', emoji: '🚗', color: 'hsl(200, 70%, 50%)' },
  marketing: { label: 'Publicidad y Marketing', emoji: '📱', color: 'hsl(280, 70%, 55%)' },
  alquiler: { label: 'Alquiler', emoji: '🏢', color: 'hsl(30, 70%, 50%)' },
  servicios: { label: 'Servicios', emoji: '📞', color: 'hsl(180, 60%, 45%)' },
  limpieza: { label: 'Limpieza', emoji: '🧹', color: 'hsl(120, 40%, 50%)' },
  capacitacion: { label: 'Capacitación', emoji: '📚', color: 'hsl(220, 70%, 55%)' },
  comisiones: { label: 'Comisiones Bancarias', emoji: '🏦', color: 'hsl(0, 0%, 50%)' },
  tramites: { label: 'Trámites', emoji: '📄', color: 'hsl(45, 70%, 50%)' },
  muestras: { label: 'Muestras', emoji: '🎁', color: 'hsl(340, 70%, 55%)' },
  otros: { label: 'Otros', emoji: '📦', color: 'hsl(0, 0%, 60%)' },
};

export const PRODUCT_CATEGORIES = [
  'Gastronomía',
  'Indumentaria',
  'Cosmética',
  'Artesanías',
  'Servicios',
  'Otros',
] as const;
