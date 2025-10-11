import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../Pages/Home/presentation/views/DashboardView.vue')
    },
    {
        path: '/inventario',
        name: 'Inventory',
        component: () => import('../Pages/Inventory/presentation/views/InventoryView.vue')
    },
    {
        path: '/ventas',
        name: 'Sales',
        component: () => import('../Pages/Sales/presentation/views/SalesView.vue')
    },
    {
        path: '/proveedores',
        name: 'Suppliers',
        component: () => import('../Pages/Suppliers/presentation/views/SuppliersView.vue')
    },
    {
        path: '/reportes',
        name: 'Reports',
        component: () => import('../Pages/Reports/presentation/views/ReportsView.vue')
    },
    {
        path: '/usuarios',
        name: 'Users',
        component: () => import('../Pages/Users/presentation/views/UsersView.vue')
    },
    {
        path: '/configuracion',
        name: 'Settings',
        component: () => import('../Pages/Settings/presentation/views/SettingsView.vue')
    },
    {
        path: '/localstorage',
        name: 'LocalStorage',
        component: () => import('../WebStorage/components/LocalStorage.component.vue'),
        alias: '/storage'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
