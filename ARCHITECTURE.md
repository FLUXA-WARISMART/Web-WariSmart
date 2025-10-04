# Arquitectura del Proyecto - Domain-Driven Design (DDD)

## 📐 Principios de DDD Aplicados

Este proyecto sigue los principios de Domain-Driven Design para mantener una arquitectura escalable y mantenible.

## 🏗️ Estructura de Dominios

### 1. Dashboard Domain (`src/domains/dashboard/`)

Dominio principal que maneja toda la lógica y presentación del panel de control.

#### Componentes:
- **StatCard.vue**: Componente reutilizable para mostrar estadísticas con iconos
- **SalesChart.vue**: Visualización de datos de ventas con gráficos interactivos
- **QuickActions.vue**: Panel de acciones rápidas del sistema
- **LowStockProducts.vue**: Lista de productos con stock bajo
- **ExpirationAlerts.vue**: Alertas de productos próximos a vencer
- **RecentActivity.vue**: Registro de actividad reciente del sistema

#### Views:
- **DashboardView.vue**: Vista principal que orquesta todos los componentes del dashboard

### 2. Shared Domain (`src/domains/shared/`)

Dominio que contiene componentes y utilidades compartidas entre todos los dominios.

#### Componentes:
- **Navbar.vue**: Barra de navegación global del sistema

## 🎯 Beneficios de esta Arquitectura

### 1. **Separación de Responsabilidades**
Cada dominio tiene su propia responsabilidad claramente definida:
- Dashboard: Visualización y análisis de datos
- Shared: Componentes comunes y reutilizables

### 2. **Escalabilidad**
Fácil agregar nuevos dominios sin afectar los existentes:
```
src/domains/
├── dashboard/
├── inventory/      # Futuro dominio
├── sales/          # Futuro dominio
├── suppliers/      # Futuro dominio
└── shared/
```

### 3. **Mantenibilidad**
- Código organizado por contexto de negocio
- Componentes cohesivos y bajo acoplamiento
- Fácil localización de funcionalidades

### 4. **Reutilización**
- Componentes compartidos en `shared/`
- Componentes específicos de dominio encapsulados
- Evita duplicación de código

## 📦 Convenciones de Nomenclatura

### Componentes
- **PascalCase**: Todos los componentes Vue usan PascalCase
- **Descriptivos**: Nombres que describen claramente su función
- **Sufijos**: 
  - `Card` para tarjetas de información
  - `View` para vistas principales
  - `List` para listas de elementos

### Archivos
```
ComponentName.vue    # Componentes
viewName.vue        # Vistas (con sufijo View)
```

## 🔄 Flujo de Datos

```
App.vue
  └── Navbar.vue (shared)
  └── DashboardView.vue (dashboard)
      ├── StatCard.vue (dashboard)
      ├── SalesChart.vue (dashboard)
      ├── QuickActions.vue (dashboard)
      ├── LowStockProducts.vue (dashboard)
      ├── ExpirationAlerts.vue (dashboard)
      └── RecentActivity.vue (dashboard)
```

## 🎨 Patrones de Diseño Utilizados

### 1. **Composition API**
Uso de `<script setup>` para una sintaxis más limpia y mejor performance.

### 2. **Props & Events**
- Props para pasar datos hacia abajo
- Events para comunicación hacia arriba

### 3. **Component Composition**
Componentes pequeños y enfocados que se componen para crear vistas complejas.

### 4. **Scoped Styles**
Estilos encapsulados para evitar conflictos CSS.

## 🚀 Extensibilidad Futura

### Agregar un Nuevo Dominio

1. Crear directorio del dominio:
```
src/domains/nuevo-dominio/
├── components/
├── views/
├── composables/     # Lógica reutilizable
└── services/        # Servicios de API
```

2. Crear componentes específicos del dominio

3. Crear vista principal del dominio

4. Integrar en el router (cuando se implemente)

### Agregar Funcionalidades Compartidas

1. Crear en `src/domains/shared/`:
```
shared/
├── components/      # Componentes UI
├── composables/     # Lógica compartida
├── utils/          # Utilidades
└── constants/      # Constantes globales
```

## 📝 Mejores Prácticas

1. **Un dominio = Un contexto de negocio**
2. **Componentes pequeños y enfocados**
3. **Evitar dependencias entre dominios** (excepto shared)
4. **Documentar componentes complejos**
5. **Mantener consistencia en nomenclatura**
6. **Tests por dominio**

## 🔍 Próximos Pasos Recomendados

1. **State Management**: Implementar Pinia para gestión de estado
2. **Router**: Agregar Vue Router para navegación
3. **API Services**: Crear capa de servicios para comunicación con backend
4. **Composables**: Extraer lógica reutilizable en composables
5. **Tests**: Agregar tests unitarios y de integración
6. **TypeScript**: Migrar a TypeScript para mayor type safety

## 📚 Referencias

- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Component Design Patterns](https://vuejs.org/guide/components/registration.html)
