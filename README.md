# WARISMART Dashboard

Sistema de gestión empresarial desarrollado con Vue 3 + Vite siguiendo arquitectura Domain-Driven Design (DDD).

## 🚀 Características

- **Dashboard Interactivo**: Visualización en tiempo real de métricas clave del negocio
- **Gestión de Inventario**: Control de stock y alertas de productos
- **Análisis de Ventas**: Gráficos y estadísticas de ventas
- **Alertas de Vencimiento**: Notificaciones de productos próximos a vencer
- **Accesos Rápidos**: Navegación eficiente a funciones principales
- **Actividad Reciente**: Registro de todas las operaciones del sistema

## 📁 Estructura del Proyecto (DDD)

```
src/
├── domains/
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── StatCard.vue
│   │   │   ├── SalesChart.vue
│   │   │   ├── QuickActions.vue
│   │   │   ├── LowStockProducts.vue
│   │   │   ├── ExpirationAlerts.vue
│   │   │   └── RecentActivity.vue
│   │   └── views/
│   │       └── DashboardView.vue
│   └── shared/
│       └── components/
│           └── Navbar.vue
├── App.vue
└── main.js
```

### Organización por Dominios

- **dashboard**: Dominio principal con componentes del panel de control
- **shared**: Componentes compartidos entre dominios (navegación, layouts)

## 🛠️ Tecnologías

- **Vue 3**: Framework JavaScript progresivo
- **Vite**: Build tool de nueva generación
- **Composition API**: API moderna de Vue con `<script setup>`
- **CSS Moderno**: Estilos scoped con diseño responsive

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🎨 Componentes Principales

### StatCard
Tarjeta de estadística con icono, valor y cambio porcentual.

### SalesChart
Gráfico de líneas interactivo para visualizar ventas en el tiempo.

### QuickActions
Panel de accesos rápidos a funciones principales del sistema.

### LowStockProducts
Lista de productos con stock bajo que requieren atención.

### ExpirationAlerts
Alertas de productos próximos a vencer.

### RecentActivity
Registro cronológico de actividades recientes en el sistema.

## 🎯 Características de Diseño

- **Responsive**: Adaptable a dispositivos móviles, tablets y desktop
- **Modern UI**: Interfaz limpia y profesional
- **Animaciones suaves**: Transiciones y hover effects
- **Accesibilidad**: Diseño pensado en la experiencia del usuario
- **Colores semánticos**: Sistema de colores intuitivo

## 📱 Responsive Breakpoints

- **Desktop**: > 1200px
- **Tablet**: 768px - 1200px
- **Mobile**: < 768px

## 🔧 Configuración

El proyecto usa Vite con la configuración por defecto para Vue 3. Puedes personalizar la configuración en `vite.config.js`.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
