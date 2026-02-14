import { useEffect, useState } from 'react';
import { Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getExpenses } from '@/lib/storage';
import { formatCurrencyShort } from '@/lib/format';
import { EXPENSE_CATEGORIES } from '@/lib/types';
import type { Expense } from '@/lib/types';

export default function BolsilloDiario() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  const now = new Date();
  const monthLabel = now.toLocaleString('es-AR', { month: 'long', year: 'numeric' });
  const monthExpenses = expenses.filter(e => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const total = monthExpenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4">
      <h2 className="text-xl font-bold">💰 Mi Bolsillo Diario</h2>

      <Card className="border-secondary/20 bg-secondary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-base capitalize">💼 {monthLabel}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatCurrencyShort(total)}</p>
          <p className="text-sm text-muted-foreground">Total gastado este mes</p>
        </CardContent>
      </Card>

      {/* Expense list */}
      {monthExpenses.length === 0 ? (
        <Card className="p-8 text-center">
          <Wallet className="mx-auto mb-2 h-10 w-10 text-muted-foreground/50" />
          <p className="text-muted-foreground">No registraste gastos este mes. ¡Empezá a llevar el control!</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {monthExpenses.map(e => {
            const cat = EXPENSE_CATEGORIES[e.category];
            return (
              <Card key={e.id} className="flex items-center gap-3 p-3">
                <span className="text-2xl">{cat.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{e.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {cat.label} · {new Date(e.date).toLocaleDateString('es-AR')}
                    {e.recurring && ' · 🔁 Recurrente'}
                  </p>
                </div>
                <p className="font-bold text-destructive">{formatCurrencyShort(e.amount)}</p>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
