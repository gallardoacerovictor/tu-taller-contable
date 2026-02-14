import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { getProfile, saveProfile } from '@/lib/storage';
import { formatCurrencyShort } from '@/lib/format';
import type { UserProfile } from '@/lib/types';
import { toast } from 'sonner';

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  business: { name: '', category: 'Gastronomía', startDate: '', location: '' },
  settings: {
    hourlyRate: 4000,
    services: { electricity: 300, gas: 200, water: 50 },
    fixedCosts: { rent: 0, services: 0, other: 0 },
    transport: { mode: 'per-trip', value: 0 },
    distributeFixedCosts: false,
    darkMode: false,
  },
};

export default function Perfil() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    const saved = getProfile();
    if (saved) setProfile(saved);
  }, []);

  const update = (path: string, value: any) => {
    setProfile(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = copy;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  const handleSave = () => {
    saveProfile(profile);
    toast.success('¡Perfil guardado!');
  };

  const fixedTotal = profile.settings.fixedCosts.rent + profile.settings.fixedCosts.services + profile.settings.fixedCosts.other;

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4">
      <h2 className="text-xl font-bold">⚙️ Mi Perfil</h2>

      {/* Business info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Mi Emprendimiento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Tu nombre</Label>
            <Input value={profile.name} onChange={e => update('name', e.target.value)} />
          </div>
          <div>
            <Label>Nombre del emprendimiento</Label>
            <Input value={profile.business.name} onChange={e => update('business.name', e.target.value)} />
          </div>
          <div>
            <Label>Ubicación</Label>
            <Input value={profile.business.location} onChange={e => update('business.location', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Hourly rate */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">💰 Tu Valor por Hora</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>$/hora</Label>
            <Input
              type="number"
              value={profile.settings.hourlyRate}
              onChange={e => update('settings.hourlyRate', Number(e.target.value))}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {[2000, 4000, 6000].map(v => (
              <Button
                key={v}
                size="sm"
                variant={profile.settings.hourlyRate === v ? 'default' : 'outline'}
                onClick={() => update('settings.hourlyRate', v)}
              >
                {formatCurrencyShort(v)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">⚡ Costo Estimado de Servicios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-xs">Electricidad $/h</Label>
              <Input type="number" value={profile.settings.services.electricity} onChange={e => update('settings.services.electricity', Number(e.target.value))} />
            </div>
            <div>
              <Label className="text-xs">Gas $/h</Label>
              <Input type="number" value={profile.settings.services.gas} onChange={e => update('settings.services.gas', Number(e.target.value))} />
            </div>
            <div>
              <Label className="text-xs">Agua $/L</Label>
              <Input type="number" value={profile.settings.services.water} onChange={e => update('settings.services.water', Number(e.target.value))} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fixed costs */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">🏠 Gastos Fijos Mensuales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Alquiler</Label>
            <Input type="number" value={profile.settings.fixedCosts.rent} onChange={e => update('settings.fixedCosts.rent', Number(e.target.value))} />
          </div>
          <div>
            <Label>Servicios</Label>
            <Input type="number" value={profile.settings.fixedCosts.services} onChange={e => update('settings.fixedCosts.services', Number(e.target.value))} />
          </div>
          <div>
            <Label>Otros</Label>
            <Input type="number" value={profile.settings.fixedCosts.other} onChange={e => update('settings.fixedCosts.other', Number(e.target.value))} />
          </div>
          <p className="text-sm font-semibold">Total: {formatCurrencyShort(fixedTotal)}</p>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">Guardar Perfil</Button>
    </div>
  );
}
