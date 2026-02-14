import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/storage';
import { formatCurrencyShort } from '@/lib/format';
import type { Product } from '@/lib/types';
import { PRODUCT_CATEGORIES } from '@/lib/types';

export default function Recetario() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>('Todas');

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const filtered = filter === 'Todas' ? products : products.filter(p => p.category === filter);

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4">
      <h2 className="text-xl font-bold">📖 Mi Recetario de Costos</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['Todas', ...PRODUCT_CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product list */}
      {filtered.length === 0 ? (
        <Card className="p-8 text-center">
          <BookOpen className="mx-auto mb-2 h-10 w-10 text-muted-foreground/50" />
          <p className="text-muted-foreground">No hay productos todavía. ¡Creá tu primera receta!</p>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map(p => (
            <Card key={p.id} className="overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                {p.photo ? (
                  <img src={p.photo} alt={p.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-4xl">🎂</span>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.category}</p>
                <p className="mt-1 text-lg font-bold text-primary">{formatCurrencyShort(p.totalCost)}</p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs" asChild>
                    <Link to={`/recetario/${p.id}`}>Ver detalle</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* FAB */}
      <Button
        asChild
        className="fixed bottom-20 right-4 z-30 h-14 w-14 rounded-full shadow-lg md:bottom-6"
        size="icon"
      >
        <Link to="/recetario/nuevo">
          <Plus className="h-6 w-6" />
        </Link>
      </Button>
    </div>
  );
}
