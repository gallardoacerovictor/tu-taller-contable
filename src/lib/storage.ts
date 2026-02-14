import type { UserProfile, Supply, Product, Expense } from './types';

const KEYS = {
  profile: 'mtc_profile',
  supplies: 'mtc_supplies',
  products: 'mtc_products',
  expenses: 'mtc_expenses',
  initialized: 'mtc_initialized',
};

function get<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

function set<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Profile
export const getProfile = (): UserProfile | null => get(KEYS.profile);
export const saveProfile = (p: UserProfile) => set(KEYS.profile, p);

// Supplies
export const getSupplies = (): Supply[] => get(KEYS.supplies) ?? [];
export const saveSupplies = (s: Supply[]) => set(KEYS.supplies, s);
export const addSupply = (s: Supply) => {
  const list = getSupplies();
  list.push(s);
  saveSupplies(list);
};

// Products
export const getProducts = (): Product[] => get(KEYS.products) ?? [];
export const saveProducts = (p: Product[]) => set(KEYS.products, p);
export const addProduct = (p: Product) => {
  const list = getProducts();
  list.push(p);
  saveProducts(list);
};
export const updateProduct = (p: Product) => {
  const list = getProducts().map(x => x.id === p.id ? p : x);
  saveProducts(list);
};
export const deleteProduct = (id: string) => {
  saveProducts(getProducts().filter(x => x.id !== id));
};

// Expenses
export const getExpenses = (): Expense[] => get(KEYS.expenses) ?? [];
export const saveExpenses = (e: Expense[]) => set(KEYS.expenses, e);
export const addExpense = (e: Expense) => {
  const list = getExpenses();
  list.push(e);
  saveExpenses(list);
};
export const updateExpense = (e: Expense) => {
  const list = getExpenses().map(x => x.id === e.id ? e : x);
  saveExpenses(list);
};
export const deleteExpense = (id: string) => {
  saveExpenses(getExpenses().filter(x => x.id !== id));
};

// Seed
export function initializeSeedData() {
  if (localStorage.getItem(KEYS.initialized)) return;

  const profile: UserProfile = {
    name: 'Maru',
    business: {
      name: 'Dulces de Maru',
      category: 'Gastronomía',
      startDate: '2024-03-01',
      location: 'Ciudad de Buenos Aires',
    },
    settings: {
      hourlyRate: 4000,
      services: { electricity: 300, gas: 200, water: 50 },
      fixedCosts: { rent: 20000, services: 5000, other: 0 },
      transport: { mode: 'per-trip', value: 0 },
      distributeFixedCosts: false,
      darkMode: false,
    },
  };

  const supplies: Supply[] = [
    { id: 's1', name: 'Harina 0000', category: 'gastronomia', unit: 'kg', quantityBought: 1, pricePaid: 450, pricePerUnit: 450 },
    { id: 's2', name: 'Azúcar', category: 'gastronomia', unit: 'kg', quantityBought: 1, pricePaid: 500, pricePerUnit: 500 },
    { id: 's3', name: 'Huevos', category: 'gastronomia', unit: 'unidades', quantityBought: 12, pricePaid: 1080, pricePerUnit: 90 },
    { id: 's4', name: 'Manteca', category: 'gastronomia', unit: 'kg', quantityBought: 1, pricePaid: 1200, pricePerUnit: 1200 },
    { id: 's5', name: 'Levadura', category: 'gastronomia', unit: 'g', quantityBought: 500, pricePaid: 350, pricePerUnit: 0.7 },
    { id: 's6', name: 'Cacao', category: 'gastronomia', unit: 'kg', quantityBought: 1, pricePaid: 2500, pricePerUnit: 2500 },
    { id: 's7', name: 'Vainilla', category: 'gastronomia', unit: 'ml', quantityBought: 100, pricePaid: 800, pricePerUnit: 8 },
    { id: 's8', name: 'Tela de algodón', category: 'indumentaria', unit: 'metros', quantityBought: 1, pricePaid: 3500, pricePerUnit: 3500 },
    { id: 's9', name: 'Hilo', category: 'indumentaria', unit: 'metros', quantityBought: 100, pricePaid: 500, pricePerUnit: 5 },
    { id: 's10', name: 'Botones', category: 'indumentaria', unit: 'unidades', quantityBought: 10, pricePaid: 300, pricePerUnit: 30 },
    { id: 's11', name: 'Cierres', category: 'indumentaria', unit: 'unidades', quantityBought: 5, pricePaid: 750, pricePerUnit: 150 },
    { id: 's12', name: 'Etiquetas', category: 'indumentaria', unit: 'unidades', quantityBought: 100, pricePaid: 1000, pricePerUnit: 10 },
    { id: 's13', name: 'Cajas de cartón', category: 'packaging', unit: 'unidades', quantityBought: 10, pricePaid: 1200, pricePerUnit: 120 },
    { id: 's14', name: 'Bolsas kraft', category: 'packaging', unit: 'unidades', quantityBought: 25, pricePaid: 625, pricePerUnit: 25 },
    { id: 's15', name: 'Cintas', category: 'packaging', unit: 'metros', quantityBought: 10, pricePaid: 300, pricePerUnit: 30 },
    { id: 's16', name: 'Etiquetas adhesivas', category: 'packaging', unit: 'unidades', quantityBought: 50, pricePaid: 500, pricePerUnit: 10 },
    { id: 's17', name: 'Papel de regalo', category: 'packaging', unit: 'metros', quantityBought: 5, pricePaid: 750, pricePerUnit: 150 },
  ];

  const products: Product[] = [
    {
      id: 'p1',
      name: 'Torta de Manzana',
      category: 'Gastronomía',
      ingredients: [
        { supplyId: 's1', name: 'Harina 0000', quantity: 0.2, unit: 'kg', cost: 90 },
        { supplyId: 's2', name: 'Azúcar', quantity: 0.15, unit: 'kg', cost: 75 },
        { supplyId: 's3', name: 'Huevos', quantity: 2, unit: 'unidades', cost: 180 },
        { supplyId: 's4', name: 'Manteca', quantity: 0.1, unit: 'kg', cost: 120 },
      ],
      packaging: [
        { supplyId: 's13', name: 'Caja tortera', quantity: 1, unit: 'unidades', cost: 120 },
      ],
      services: { hours: 1, minutes: 30, cost: 450 },
      labor: { hours: 2, minutes: 30, cost: 10000 },
      fixedCostPerUnit: 0,
      totalCost: 11035,
      sellingPrice: 17055,
      unitsPerMonth: 10,
      createdAt: '2024-06-15',
    },
  ];

  const expenses: Expense[] = [
    { id: 'e1', description: 'Nafta para comprar ingredientes', category: 'transporte', amount: 2000, date: '2026-02-05', paymentMethod: 'efectivo', recurring: false },
    { id: 'e2', description: 'Instagram Ads', category: 'marketing', amount: 5000, date: '2026-02-01', paymentMethod: 'debito', recurring: true },
    { id: 'e3', description: 'Alquiler local', category: 'alquiler', amount: 20000, date: '2026-02-01', paymentMethod: 'transferencia', recurring: true },
  ];

  saveProfile(profile);
  saveSupplies(supplies);
  saveProducts(products);
  saveExpenses(expenses);
  localStorage.setItem(KEYS.initialized, 'true');
}
