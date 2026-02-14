

# Mi Taller Contable 🧮
**Plataforma de gestión de costos y precios para emprendedores argentinos**

---

## Visión General
App web responsive, mobile-first, con lenguaje en voseo argentino, diseñada para emprendedores en etapa inicial (0-2 años). Persistencia en LocalStorage, sin backend. Datos de ejemplo pre-cargados para demo.

**Paleta de colores:** Verde/Turquesa (#00A86B) como primario, Naranja (#FF6B35) para CTAs, fondos claros y grises neutros.

---

## Fase 1: Base y Navegación

- **Layout principal** con header ("Mi Taller Contable"), menú hamburguesa en mobile y navegación inferior con íconos a los 3 módulos
- **Sistema de rutas**: Dashboard, Recetario, Bolsillo Diario, Precio Justo, Perfil
- **Modelo de datos en LocalStorage** para productos, insumos, gastos y configuración del usuario
- **Datos seed pre-cargados**: usuario de ejemplo (Maru), insumos por categoría (Gastronomía, Indumentaria, Packaging), producto de ejemplo (Torta de Manzana)
- **Formato argentino**: moneda con $, separador de miles con punto, decimales con coma ($12.345,67)

---

## Fase 2: Perfil y Configuración ⚙️

- **Mi Emprendimiento**: nombre, rubro, fecha inicio, ubicación, logo
- **Valor por hora**: input con botones sugeridos ($2.000 / $4.000 / $6.000 / Personalizado)
- **Costos de servicios**: electricidad, gas y agua por hora/litro
- **Gastos fijos mensuales**: lista editable (alquiler, servicios, otros) con total automático y toggle para distribuir entre productos
- **Transporte**: calcular por viaje o % fijo
- **Preferencias**: modo oscuro

---

## Fase 3: Módulo 1 – Recetario de Costos 📖

### Lista de productos
- Grid de tarjetas con foto (placeholder si no hay), nombre, costo total destacado
- Filtros por categoría (Gastronomía, Indumentaria, Cosmética, Artesanías, Servicios, Otros)
- Botón flotante "+ Nueva Receta"

### Wizard de creación (4 pasos con stepper visual)
1. **Info Básica**: nombre, categoría, foto opcional
2. **Ingredientes/Materiales**: biblioteca de insumos con buscador y autocomplete, agregar insumos nuevos via modal, tabla editable con cálculo automático de costo por cantidad usada
3. **Costos Indirectos**: servicios (horno/electricidad con tiempo), packaging, gastos fijos opcionales con cálculo por unidad
4. **Tu Tiempo**: horas y minutos de producción, cálculo automático según valor/hora del perfil, mensaje motivacional

### Pantalla Resumen
- Desglose completo con emojis: materias primas, packaging, servicios, tu tiempo, gastos fijos
- **Costo total destacado**
- Botones: Guardar Receta, Calcular Precio de Venta (→ Módulo 3), Volver a editar

---

## Fase 4: Módulo 2 – Bolsillo Diario 💰

### Vista principal
- Selector de mes
- Card resumen con total gastado
- **Gráfico de dona** con distribución por categorías (usando Recharts)
- Lista cronológica de gastos con categoría (ícono+color), descripción, monto, acciones

### Agregar/Editar Gasto
- Modal con: descripción, categoría con íconos (🚗 Transporte, 📱 Marketing, etc.), monto con formato, fecha (default hoy), método de pago, toggle "gasto recurrente"

### Reportes
- Resumen mensual con tabla de categorías y porcentajes
- Comparativo de barras de últimos 6 meses

---

## Fase 5: Módulo 3 – El Precio Justo 💵

- **Selector de producto** del Recetario
- **Costo de producción** destacado
- **Slider de margen de ganancia** (0%-200%) con botones rápidos: 🌱 Básica (40%), ⭐ Recomendada (70%), 👑 Premium (100%)
- **Precio sugerido en vivo** con ganancia y rentabilidad
- **Comparación con mercado** (opcional): 3 inputs de precios de competencia, promedio, posición relativa y consejo contextual
- **Proyección de ventas**: input unidades → ingresos, costos, ganancia neta + "necesitás vender X unidades para cubrir gastos"
- **Precio según forma de pago**: Efectivo, Débito (+3%), Crédito 3 cuotas (+9%)
- Botón guardar precio de venta

---

## Fase 6: Dashboard Principal 🏠

- Saludo personalizado "¡Hola [Nombre]!"
- Card resumen del mes: productos creados, gastos registrados, ganancia proyectada
- Últimos 3 productos con nombre y precio
- Botones de acción rápida: "+ Nueva Receta" (primario), "+ Nuevo Gasto" (secundario)
- Empty states amigables: "Aún no creaste productos. ¡Empezá ahora!"

---

## Fase 7: Pulido y UX

- Transiciones suaves entre pasos del wizard
- Tooltips con "?" para ayuda contextual
- Confirmación antes de eliminar (diálogos)
- Mensajes motivacionales en voseo argentino a lo largo de toda la app
- Loading states y feedback visual en cálculos en tiempo real
- Validaciones: no valores negativos, campos requeridos con mensajes claros
- Responsive final: mobile, tablet, desktop
- Modo oscuro funcional

