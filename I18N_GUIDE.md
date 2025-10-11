# Guía de Internacionalización (i18n) - WariSmart

## 📋 Resumen

Se ha implementado un sistema completo de internacionalización (i18n) para el proyecto WariSmart con soporte para **Español (ES)** e **Inglés (EN)**.

## 🎯 Características Implementadas

### 1. **Archivo de Traducciones** (`src/i18n.js`)
- Contiene todas las traducciones en español e inglés
- Organizado por módulos: navbar, dashboard, inventory, sales, suppliers, reports, users, settings, common
- Guarda la preferencia del usuario en `localStorage` con la clave `warismart_language`
- Idioma por defecto: Español (ES)

### 2. **Componente LanguageSwitcher** (`src/shared/presentation/components/LanguageSwitcher.vue`)
- Botón tipo switch con opciones ES/EN
- Diseño moderno y minimalista
- Cambio instantáneo de idioma
- Persistencia de la selección en localStorage

### 3. **Integración en Navbar**
- El switch de idioma está ubicado en la barra de navegación superior
- Visible en todas las páginas del sistema
- Posicionado entre el buscador y las notificaciones

### 4. **Componentes Actualizados**
Se han actualizado los siguientes componentes para usar traducciones:
- ✅ Navbar
- ✅ Dashboard
- ✅ Inventory (Inventario)
- ✅ Sales (Ventas)
- ✅ Suppliers (Proveedores)
- ✅ Reports (Reportes)
- ✅ Users (Usuarios)
- ✅ Settings (Configuración)

## 🚀 Cómo Usar las Traducciones

### En Templates (HTML)
```vue
<template>
  <!-- Traducción simple -->
  <h1>{{ $t('dashboard.title') }}</h1>
  
  <!-- Traducción en atributos -->
  <input :placeholder="$t('navbar.search')" />
  
  <!-- Traducción con interpolación -->
  <p>{{ $t('dashboard.subtitle') }} • {{ $t('dashboard.today') }}</p>
</template>
```

### En Script (JavaScript)
```vue
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Usar en código JavaScript
const message = t('common.success');
console.log(message);
</script>
```

## 📝 Agregar Nuevas Traducciones

Para agregar nuevas traducciones, edita el archivo `src/i18n.js`:

```javascript
const messages = {
    es: {
        // Tu nuevo módulo
        miModulo: {
            titulo: 'Mi Título',
            descripcion: 'Mi Descripción'
        }
    },
    en: {
        // Tu nuevo módulo
        miModulo: {
            titulo: 'My Title',
            descripcion: 'My Description'
        }
    }
};
```

Luego úsalo en tus componentes:
```vue
<h1>{{ $t('miModulo.titulo') }}</h1>
```

## 🎨 Estructura de Traducciones

```
messages
├── es (Español)
│   ├── navbar (Navegación)
│   ├── dashboard (Panel principal)
│   ├── inventory (Inventario)
│   ├── sales (Ventas)
│   ├── suppliers (Proveedores)
│   ├── reports (Reportes)
│   ├── users (Usuarios)
│   ├── settings (Configuración)
│   └── common (Común)
└── en (English)
    ├── navbar
    ├── dashboard
    ├── inventory
    ├── sales
    ├── suppliers
    ├── reports
    ├── users
    ├── settings
    └── common
```

## 💡 Ejemplos de Uso

### Dashboard
```vue
<h1>{{ $t('dashboard.title') }}</h1>
<p>{{ $t('dashboard.subtitle') }}</p>
```

### Inventario
```vue
<button>{{ $t('inventory.newProduct') }}</button>
<label>{{ $t('inventory.code') }}</label>
```

### Ventas
```vue
<h3>{{ $t('sales.newSale') }}</h3>
<label>{{ $t('sales.customer') }}</label>
```

## 🔧 Configuración Técnica

- **Librería**: vue-i18n
- **Modo**: Composition API (`legacy: false`)
- **Locale por defecto**: `es`
- **Fallback locale**: `en`
- **Storage**: localStorage (`warismart_language`)

## 📱 Funcionamiento

1. El usuario hace clic en el botón ES o EN
2. El idioma se cambia instantáneamente en toda la aplicación
3. La preferencia se guarda en localStorage
4. Al recargar la página, se mantiene el idioma seleccionado

## ✨ Mejoras Futuras (Opcional)

- Agregar más idiomas (PT, FR, etc.)
- Traducción de mensajes dinámicos
- Formateo de fechas según el idioma
- Formateo de números y monedas según el idioma
- Traducción de categorías y datos dinámicos

---

**Nota**: Todos los textos estáticos principales ya están traducidos. Para componentes adicionales o nuevos, simplemente agrega las traducciones en `i18n.js` y usa `$t('clave.traduccion')` en tus templates.
