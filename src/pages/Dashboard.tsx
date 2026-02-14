import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, BookOpen, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getProfile, getProducts, getExpenses } from '@/lib/storage';
import { formatCurrencyShort } from '@/lib/format';
import type { UserProfile, Product, Expense } from '@/lib/types';

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setProfile(getProfile());
    setProducts(getProducts());
    setExpenses(getExpenses());
  }, []);

  const currentMonth = new Date().toLocaleString('es-AR', { month: 'long', year: 'numeric' });
  const monthExpenses = expenses.filter(e => {
    const d = new Date(e.date);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const totalExpenses = monthExpenses.reduce((s, e) => s + e.amount, 0);
  const projectedRevenue = products.reduce((s, p) => s + (p.sellingPrice ?? 0) * (p.unitsPerMonth ?? 0), 0);

  const lastProducts = products.slice(-3).reverse();

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4">
      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-bold">
          ¡Hola {profile?.name ?? 'Emprendedor/a'}! 👋
        </h2>
        <p className="text-muted-foreground capitalize">{currentMonth}</p>
      </div>

      {/* Monthly summary */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">📊 Resumen del mes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{products.length}</p>
              <p className="text-xs text-muted-foreground">Productos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">{formatCurrencyShort(totalExpenses)}</p>
              <p className="text-xs text-muted-foreground">Gastos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{formatCurrencyShort(projectedRevenue)}</p>
              <p className="text-xs text-muted-foreground">Proyectado</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="flex gap-3">
        <Button asChild className="flex-1 gap-2">
          <Link to="/recetario/nuevo">
            <Plus className="h-4 w-4" /> Nueva Receta
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex-1 gap-2 border-secondary text-secondary hover:bg-secondary/10">
          <Link to="/bolsillo">
            <Wallet className="h-4 w-4" /> Nuevo Gasto
          </Link>
        </Button>
      </div>

      {/* Latest products */}
      <div>
        <h3 className="mb-3 text-lg font-semibold">Tus Productos</h3>
        {lastProducts.length === 0 ? (
          <Card className="p-6 text-center">
            <BookOpen className="mx-auto mb-2 h-10 w-10 text-muted-foreground/50" />
            <p className="text-muted-foreground">Aún no creaste productos. ¡Empezá ahora!</p>
            <Button asChild className="mt-3" size="sm">
              <Link to="/recetario/nuevo">+ Nueva Receta</Link>
            </Button>
          </Card>
        ) : (
          <div className="space-y-2">
            {lastProducts.map(p => (
              <Card key={p.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.category}</p>
                </div>
                <div className="text-right">
                  {p.sellingPrice && (
                    <p className="font-bold text-primary">{formatCurrencyShort(p.sellingPrice)}</p>
                  )}
                  <p className="text-xs text-muted-foreground">Costo: {formatCurrencyShort(p.totalCost)}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
