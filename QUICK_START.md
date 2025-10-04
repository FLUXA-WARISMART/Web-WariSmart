# 🚀 WARISMART - Inicio Rápido

## ⚡ Ejecutar el Proyecto

```bash
# 1. Asegúrate de tener las dependencias instaladas
npm install

# 2. Ejecutar en modo desarrollo
npm run dev

# 3. Abrir en el navegador
# El servidor se ejecutará en: http://localhost:5173
```

## 📋 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con hot-reload |
| `npm run build` | Compila el proyecto para producción |
| `npm run preview` | Vista previa de la versión de producción |

## 🎯 Características Implementadas

### ✅ Dashboard Completo
- **4 Tarjetas de Estadísticas**: Ventas, Productos Vendidos, Stock Total, Proveedores
- **Gráfico de Ventas**: Visualización de ventas de los últimos 7 días
- **Accesos Rápidos**: 4 acciones principales (Nueva Venta, Agregar Producto, Nuevo Proveedor, Ver Reportes)
- **Productos con Stock Bajo**: Lista de 3 productos que requieren reabastecimiento
- **Alertas de Vencimiento**: 3 productos próximos a vencer
- **Actividad Reciente**: Registro de las últimas 4 actividades del sistema

### ✅ Navegación
- **Navbar Completa**: Con logo WARISMART, menú de navegación, búsqueda, notificaciones y perfil de usuario
- **Menú de Navegación**: Dashboard, Inventario, Ventas, Proveedores, Reportes, Gestión de usuarios, Configuración

### ✅ Diseño Responsive
- **Desktop**: Optimizado para pantallas grandes (> 1200px)
- **Tablet**: Adaptado para tablets (768px - 1200px)
- **Mobile**: Completamente responsive para móviles (< 768px)

## 🏗️ Arquitectura DDD

El proyecto está organizado siguiendo Domain-Driven Design:

```
src/
├── domains/
│   ├── dashboard/          # Dominio del Dashboard
│   │   ├── components/     # Componentes específicos
│   │   └── views/          # Vistas del dashboard
│   └── shared/             # Componentes compartidos
│       └── components/     # Navbar, etc.
├── App.vue                 # Componente raíz
└── main.js                 # Punto de entrada
```

## 🎨 Paleta de Colores

- **Primario**: `#3b82f6` (Azul)
- **Éxito**: `#10b981` (Verde)
- **Advertencia**: `#f59e0b` (Naranja)
- **Peligro**: `#ef4444` (Rojo)
- **Morado**: `#8b5cf6` (Proveedores)
- **Fondo**: `#f9fafb` (Gris claro)

## 📱 Componentes Principales

### StatCard
```vue
<StatCard
  title="Ventas Hoy"
  value="S/8,450"
  changeText="+16,5% vs ayer"
  changeType="positive"
  :icon="salesIcon"
  iconBgColor="#dcfce7"
/>
```

### SalesChart
Gráfico interactivo con tabs para 7, 30 y 90 días.

### QuickActions
Emite evento `@action` cuando se hace clic en una acción.

## 🔧 Próximas Mejoras Sugeridas

1. **Router**: Implementar Vue Router para navegación entre secciones
2. **State Management**: Agregar Pinia para gestión de estado global
3. **API Integration**: Conectar con backend para datos reales
4. **Autenticación**: Sistema de login y permisos
5. **Más Dominios**: Inventario, Ventas, Proveedores, Reportes completos
6. **Tests**: Agregar tests unitarios y e2e
7. **TypeScript**: Migrar a TypeScript para type safety

## 📚 Documentación Adicional

- **README.md**: Documentación general del proyecto
- **ARCHITECTURE.md**: Detalles de la arquitectura DDD

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Puerto 5173 ocupado
```bash
# Vite usará automáticamente el siguiente puerto disponible
# O puedes especificar uno diferente en vite.config.js
```

### Errores de compilación
```bash
# Limpiar caché de Vite
npm run build -- --force
```

## 💡 Tips de Desarrollo

1. **Hot Reload**: Los cambios se reflejan automáticamente en el navegador
2. **DevTools**: Usa Vue DevTools para debugging
3. **Console**: Revisa la consola del navegador para errores
4. **Componentes**: Cada componente es independiente y reutilizable

## 🎉 ¡Listo para Desarrollar!

El proyecto está completamente configurado y listo para ejecutarse. Solo ejecuta `npm run dev` y comienza a desarrollar.

---

**Versión**: 1.0.0  
**Framework**: Vue 3 + Vite  
**Arquitectura**: Domain-Driven Design (DDD)
