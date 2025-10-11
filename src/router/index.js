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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
