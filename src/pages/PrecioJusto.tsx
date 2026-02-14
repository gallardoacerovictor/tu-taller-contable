import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { getProducts, updateProduct } from '@/lib/storage';
import { formatCurrency, formatCurrencyShort } from '@/lib/format';
import type { Product } from '@/lib/types';
import { toast } from 'sonner';

export default function PrecioJusto() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [margin, setMargin] = useState(70);

  useEffect(() => {
    const p = getProducts();
    setProducts(p);
    if (p.length > 0) setSelectedId(p[0].id);
  }, []);

  const product = products.find(p => p.id === selectedId);
  const cost = product?.totalCost ?? 0;
  const price = cost * (1 + margin / 100);
  const profit = price - cost;

  const handleSave = () => {
    if (!product) return;
    const updated = { ...product, sellingPrice: Math.round(price) };
    updateProduct(updated);
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    toast.success('¡Precio guardado!');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4">
      <h2 className="text-xl font-bold">💵 El Precio Justo</h2>

      <Select value={selectedId} onValueChange={setSelectedId}>
        <SelectTrigger><SelectValue placeholder="Seleccioná un producto" /></SelectTrigger>
        <SelectContent>
          {products.map(p => (
            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {product && (
        <>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground">Tu costo de producción</p>
              <p className="text-3xl font-bold text-primary">{formatCurrency(cost)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">¿Qué margen de ganancia querés?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Slider
                value={[margin]}
                onValueChange={v => setMargin(v[0])}
                min={0}
                max={200}
                step={5}
                className="py-4"
              />
              <p className="text-center text-lg font-semibold">{margin}%</p>
              <div className="flex justify-center gap-2">
                {[
                  { label: '🌱 Básica', value: 40 },
                  { label: '⭐ Recomendada', value: 70 },
                  { label: '👑 Premium', value: 100 },
                ].map(opt => (
                  <Button
                    key={opt.value}
                    variant={margin === opt.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setMargin(opt.value)}
                    className="text-xs"
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-secondary/30 bg-secondary/5">
            <CardContent className="space-y-2 pt-6 text-center">
              <p className="text-sm text-muted-foreground">💵 Precio Sugerido</p>
              <p className="text-4xl font-bold text-secondary">{formatCurrency(price)}</p>
              <div className="flex justify-center gap-6 text-sm">
                <span>📈 Ganancia: {formatCurrencyShort(profit)}</span>
                <span>💰 Rentabilidad: {margin}%</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment method prices */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Precio según forma de pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>💵 Efectivo/Transferencia</span>
                <span className="font-semibold">{formatCurrency(price)}</span>
              </div>
              <div className="flex justify-between">
                <span>💳 Débito (+3%)</span>
                <span className="font-semibold">{formatCurrency(price * 1.03)}</span>
              </div>
              <div className="flex justify-between">
                <span>💳 Crédito 3 cuotas (+9%)</span>
                <span className="font-semibold">{formatCurrency(price * 1.09)}</span>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="w-full">
            Guardar Precio de Venta
          </Button>
        </>
      )}
    </div>
  );
}
