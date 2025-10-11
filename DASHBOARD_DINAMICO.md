# Dashboard Dinámico - WariSmart

## 🎯 Cambios Implementados

Se ha actualizado el **Dashboard** para que muestre estadísticas **dinámicas y en tiempo real** basadas en los datos reales almacenados en localStorage.

## 📊 Estadísticas Actualizadas

### 1. **Ventas Hoy**
- ✅ **Valor Real**: Calcula el total de ventas del día actual en soles (S/)
- ✅ **Comparación**: Muestra el porcentaje de cambio vs ayer
- ✅ **Indicador**: Verde (positivo), Rojo (negativo), Gris (neutral)
- 📍 **Fuente**: `localStorage.getItem('sales')`

### 2. **Productos Vendidos**
- ✅ **Valor Real**: Suma la cantidad de productos vendidos hoy
- ✅ **Comparación**: Muestra el porcentaje de cambio vs ayer
- ✅ **Indicador**: Verde (positivo), Rojo (negativo), Gris (neutral)
- 📍 **Fuente**: `localStorage.getItem('sales')`

### 3. **Stock Total**
- ✅ **Valor Real**: Suma el stock de todos los productos en inventario
- ✅ **Alerta**: Muestra cuántos productos tienen stock bajo (≤10 unidades)
- ✅ **Indicador**: Rojo si hay productos con bajo stock, Gris si todo está bien
- 📍 **Fuente**: `localStorage.getItem('inventory_products')`

### 4. **Proveedores Activos**
- ✅ **Valor Real**: Cuenta los proveedores con estado "Activo"
- ✅ **Info**: Muestra pedidos pendientes (actualmente en 0, listo para implementar)
- ✅ **Indicador**: Gris (neutral)
- 📍 **Fuente**: `localStorage.getItem('suppliers')`

## 🔄 Actualización Automática

El Dashboard se actualiza automáticamente cuando:

### ✅ Se agrega/edita un producto en Inventario
```javascript
// En InventoryView.vue (línea 446)
window.dispatchEvent(new CustomEvent('product-updated'));
```
**Resultado**: Las tarjetas de "Stock Total" y "Productos con bajo stock" se actualizan.

### ✅ Se registra una venta
```javascript
// En SalesView.vue (línea 262)
window.dispatchEvent(new CustomEvent('sales-updated'));
```
**Resultado**: Las tarjetas de "Ventas Hoy" y "Productos Vendidos" se actualizan.

### ✅ Se agrega/edita un proveedor
```javascript
// En SuppliersView.vue (línea 222-223)
window.dispatchEvent(new CustomEvent('supplier-updated'));
window.dispatchEvent(new CustomEvent('suppliers-updated'));
```
**Resultado**: La tarjeta de "Proveedores Activos" se actualiza.

## 📝 Cómo Funciona

### 1. **Carga Inicial**
Al montar el Dashboard, se cargan todos los datos:
```javascript
onMounted(() => {
  loadAllData(); // Carga productos, ventas y proveedores
  
  // Escucha eventos de actualización
  window.addEventListener('product-updated', loadProductos);
  window.addEventListener('sales-updated', loadVentas);
  window.addEventListener('supplier-updated', loadProveedores);
});
```

### 2. **Cálculos en Tiempo Real**
Todas las estadísticas son `computed properties` que se recalculan automáticamente:
```javascript
// Ejemplo: Total de ventas de hoy
const totalVentasHoy = computed(() => {
  const total = ventasHoy.value.reduce((sum, v) => sum + (v.total || 0), 0);
  return `S/${total.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`;
});
```

### 3. **Comparación con Ayer**
Se calculan automáticamente los porcentajes de cambio:
```javascript
const cambioVentasVsAyer = computed(() => {
  if (totalVentasAyer.value === 0) {
    return ventasHoy.value.length > 0 ? '+100%' : '0%';
  }
  const cambio = ((ventasHoy.value.reduce((sum, v) => sum + v.total, 0) - totalVentasAyer.value) / totalVentasAyer.value * 100);
  return cambio >= 0 ? `+${cambio.toFixed(1)}%` : `${cambio.toFixed(1)}%`;
});
```

## 🧪 Pruebas

### Probar Actualización de Inventario
1. Ve al módulo de **Inventario**
2. Agrega un nuevo producto con stock (ej: 50 unidades)
3. Vuelve al **Dashboard**
4. ✅ Verás que "Stock Total" aumentó en 50

### Probar Actualización de Ventas
1. Ve al módulo de **Ventas**
2. Registra una nueva venta
3. Vuelve al **Dashboard**
4. ✅ Verás que "Ventas Hoy" y "Productos Vendidos" se actualizaron

### Probar Actualización de Proveedores
1. Ve al módulo de **Proveedores**
2. Agrega un nuevo proveedor
3. Vuelve al **Dashboard**
4. ✅ Verás que "Proveedores Activos" aumentó en 1

## 📊 Estructura de Datos

### Productos (inventory_products)
```json
{
  "id": 1234567890,
  "codigo": "IP-14PRO-001",
  "nombre": "iPhone 14 Pro",
  "categoria": "Electrónicos",
  "precioVenta": 4500.00,
  "stock": 15,
  "imagen": "data:image/png;base64...",
  "fechaCreacion": "2025-10-11T16:00:00.000Z"
}
```

### Ventas (sales)
```json
{
  "id": 1234567890,
  "boleta": "B001-000001",
  "cliente": "Juan Pérez",
  "dni": "12345678",
  "productos": [...],
  "cantidadProductos": 3,
  "total": 450.50,
  "metodoPago": "Efectivo",
  "fechaTexto": "11/10/2025",
  "hora": "16:30",
  "estado": "Completada"
}
```

### Proveedores (suppliers)
```json
{
  "id": 1234567890,
  "idCode": "PRV001",
  "nombre": "Distribuidora San Miguel",
  "ruc": "20123456789",
  "categoria": "Alimentos",
  "contacto": {
    "nombre": "Carlos Mendoza",
    "email": "contacto@empresa.com",
    "telefono": "999999999"
  },
  "estado": "Activo",
  "ordenes": 0,
  "fechaCreacion": "2025-10-11T16:00:00.000Z"
}
```

## 🎨 Indicadores Visuales

- 🟢 **Verde (positive)**: Aumento respecto al día anterior
- 🔴 **Rojo (negative)**: Disminución respecto al día anterior  
- ⚪ **Gris (neutral)**: Sin cambios o información adicional

## 🚀 Mejoras Futuras (Opcional)

- [ ] Agregar gráfico de ventas con datos reales
- [ ] Implementar sistema de pedidos pendientes
- [ ] Agregar alertas de productos próximos a vencer
- [ ] Dashboard con filtros por fecha personalizada
- [ ] Exportar reportes en PDF/Excel

---

**¡El Dashboard ahora es completamente dinámico y se actualiza en tiempo real!** 🎉
