import { createI18n } from 'vue-i18n';

const messages = {
    es: {
        // Navbar
        navbar: {
            brand: 'WARISMART',
            dashboard: 'Dashboard',
            inventory: 'Inventario',
            sales: 'Ventas',
            suppliers: 'Proveedores',
            reports: 'Reportes',
            users: 'Gestión de usuarios',
            settings: 'Configuración',
            search: 'Buscar...',
            notifications: 'Notificaciones'
        },
        
        // Dashboard
        dashboard: {
            title: 'Dashboard',
            subtitle: 'Resumen general de tu negocio',
            today: 'Hoy',
            salesToday: 'Ventas Hoy',
            productsSold: 'Productos Vendidos',
            totalStock: 'Stock Total',
            activeSuppliers: 'Proveedores Activos',
            vsYesterday: 'vs ayer',
            lowStockProducts: 'productos bajo stock',
            pendingOrders: 'pedidos pendientes',
            salesChart: 'Gráfico de Ventas',
            quickActions: 'Acciones Rápidas',
            lowStock: 'Stock Bajo',
            expirationAlerts: 'Alertas de Vencimiento',
            recentActivity: 'Actividad Reciente'
        },
        
        // Inventory
        inventory: {
            title: 'Inventario',
            subtitle: 'Gestión completa de productos',
            newProduct: 'Nuevo Producto',
            editProduct: 'Editar Producto',
            code: 'Código/SKU',
            category: 'Categoría',
            productName: 'Nombre del Producto',
            price: 'Precio',
            stock: 'Stock',
            initialStock: 'Stock Inicial',
            minStock: 'Stock Mínimo',
            supplier: 'Proveedor',
            expirationDate: 'Fecha de Vencimiento',
            description: 'Descripción',
            actions: 'Acciones',
            save: 'Guardar',
            cancel: 'Cancelar',
            edit: 'Editar',
            delete: 'Eliminar',
            search: 'Buscar productos...',
            filter: 'Filtrar',
            export: 'Exportar',
            import: 'Importar',
            totalProducts: 'Productos Totales',
            lowStockAlert: 'Alerta de Stock Bajo',
            outOfStock: 'Sin Stock',
            totalValue: 'Valor Total',
            clickToUpload: 'Haz clic para subir una imagen',
            changeImage: 'Cambiar imagen',
            remove: 'Eliminar',
            select: 'Seleccionar'
        },
        
        // Sales
        sales: {
            title: 'Ventas',
            subtitle: 'Gestión de ventas y transacciones',
            newSale: 'Nueva Venta',
            saleDate: 'Fecha de Venta',
            customer: 'Cliente',
            product: 'Producto',
            quantity: 'Cantidad',
            unitPrice: 'Precio Unitario',
            total: 'Total',
            paymentMethod: 'Método de Pago',
            status: 'Estado',
            invoice: 'Factura',
            receipt: 'Recibo',
            cash: 'Efectivo',
            card: 'Tarjeta',
            transfer: 'Transferencia',
            completed: 'Completada',
            pending: 'Pendiente',
            cancelled: 'Cancelada',
            dailySales: 'Ventas Diarias',
            monthlySales: 'Ventas Mensuales',
            totalRevenue: 'Ingresos Totales',
            averageTicket: 'Ticket Promedio'
        },
        
        // Suppliers
        suppliers: {
            title: 'Proveedores',
            subtitle: 'Gestión de proveedores',
            newSupplier: 'Nuevo Proveedor',
            editSupplier: 'Editar Proveedor',
            name: 'Nombre',
            contact: 'Contacto',
            phone: 'Teléfono',
            email: 'Correo Electrónico',
            address: 'Dirección',
            ruc: 'RUC',
            productsSupplied: 'Productos Suministrados',
            lastOrder: 'Último Pedido',
            totalSuppliers: 'Proveedores Totales',
            activeSuppliers: 'Proveedores Activos',
            pendingOrders: 'Pedidos Pendientes'
        },
        
        // Reports
        reports: {
            title: 'Reportes',
            subtitle: 'Análisis y reportes del negocio',
            salesReport: 'Reporte de Ventas',
            inventoryReport: 'Reporte de Inventario',
            profitReport: 'Reporte de Ganancias',
            customReport: 'Reporte Personalizado',
            dateRange: 'Rango de Fechas',
            from: 'Desde',
            to: 'Hasta',
            generate: 'Generar',
            download: 'Descargar',
            print: 'Imprimir'
        },
        
        // Users
        users: {
            title: 'Gestión de Usuarios',
            subtitle: 'Administración de usuarios y permisos',
            newUser: 'Nuevo Usuario',
            editUser: 'Editar Usuario',
            username: 'Usuario',
            fullName: 'Nombre Completo',
            role: 'Rol',
            permissions: 'Permisos',
            active: 'Activo',
            inactive: 'Inactivo',
            admin: 'Administrador',
            manager: 'Gerente',
            employee: 'Empleado',
            lastAccess: 'Último Acceso',
            accessLog: 'Registro de Accesos',
            performance: 'Rendimiento'
        },
        
        // Settings
        settings: {
            title: 'Configuración',
            subtitle: 'Configuración del sistema',
            general: 'General',
            business: 'Negocio',
            notifications: 'Notificaciones',
            security: 'Seguridad',
            integrations: 'Integraciones',
            language: 'Idioma',
            currency: 'Moneda',
            timezone: 'Zona Horaria',
            theme: 'Tema',
            light: 'Claro',
            dark: 'Oscuro',
            saveChanges: 'Guardar Cambios'
        },
        
        // Common
        common: {
            yes: 'Sí',
            no: 'No',
            ok: 'Aceptar',
            confirm: 'Confirmar',
            close: 'Cerrar',
            back: 'Volver',
            next: 'Siguiente',
            previous: 'Anterior',
            loading: 'Cargando...',
            error: 'Error',
            success: 'Éxito',
            warning: 'Advertencia',
            info: 'Información',
            required: 'Requerido',
            optional: 'Opcional',
            all: 'Todos',
            none: 'Ninguno',
            other: 'Otro'
        }
    },
    
    en: {
        // Navbar
        navbar: {
            brand: 'WARISMART',
            dashboard: 'Dashboard',
            inventory: 'Inventory',
            sales: 'Sales',
            suppliers: 'Suppliers',
            reports: 'Reports',
            users: 'User Management',
            settings: 'Settings',
            search: 'Search...',
            notifications: 'Notifications'
        },
        
        // Dashboard
        dashboard: {
            title: 'Dashboard',
            subtitle: 'Business overview',
            today: 'Today',
            salesToday: 'Sales Today',
            productsSold: 'Products Sold',
            totalStock: 'Total Stock',
            activeSuppliers: 'Active Suppliers',
            vsYesterday: 'vs yesterday',
            lowStockProducts: 'low stock products',
            pendingOrders: 'pending orders',
            salesChart: 'Sales Chart',
            quickActions: 'Quick Actions',
            lowStock: 'Low Stock',
            expirationAlerts: 'Expiration Alerts',
            recentActivity: 'Recent Activity'
        },
        
        // Inventory
        inventory: {
            title: 'Inventory',
            subtitle: 'Complete product management',
            newProduct: 'New Product',
            editProduct: 'Edit Product',
            code: 'Code/SKU',
            category: 'Category',
            productName: 'Product Name',
            price: 'Price',
            stock: 'Stock',
            initialStock: 'Initial Stock',
            minStock: 'Minimum Stock',
            supplier: 'Supplier',
            expirationDate: 'Expiration Date',
            description: 'Description',
            actions: 'Actions',
            save: 'Save',
            cancel: 'Cancel',
            edit: 'Edit',
            delete: 'Delete',
            search: 'Search products...',
            filter: 'Filter',
            export: 'Export',
            import: 'Import',
            totalProducts: 'Total Products',
            lowStockAlert: 'Low Stock Alert',
            outOfStock: 'Out of Stock',
            totalValue: 'Total Value',
            clickToUpload: 'Click to upload an image',
            changeImage: 'Change image',
            remove: 'Remove',
            select: 'Select'
        },
        
        // Sales
        sales: {
            title: 'Sales',
            subtitle: 'Sales and transactions management',
            newSale: 'New Sale',
            saleDate: 'Sale Date',
            customer: 'Customer',
            product: 'Product',
            quantity: 'Quantity',
            unitPrice: 'Unit Price',
            total: 'Total',
            paymentMethod: 'Payment Method',
            status: 'Status',
            invoice: 'Invoice',
            receipt: 'Receipt',
            cash: 'Cash',
            card: 'Card',
            transfer: 'Transfer',
            completed: 'Completed',
            pending: 'Pending',
            cancelled: 'Cancelled',
            dailySales: 'Daily Sales',
            monthlySales: 'Monthly Sales',
            totalRevenue: 'Total Revenue',
            averageTicket: 'Average Ticket'
        },
        
        // Suppliers
        suppliers: {
            title: 'Suppliers',
            subtitle: 'Supplier management',
            newSupplier: 'New Supplier',
            editSupplier: 'Edit Supplier',
            name: 'Name',
            contact: 'Contact',
            phone: 'Phone',
            email: 'Email',
            address: 'Address',
            ruc: 'Tax ID',
            productsSupplied: 'Products Supplied',
            lastOrder: 'Last Order',
            totalSuppliers: 'Total Suppliers',
            activeSuppliers: 'Active Suppliers',
            pendingOrders: 'Pending Orders'
        },
        
        // Reports
        reports: {
            title: 'Reports',
            subtitle: 'Business analysis and reports',
            salesReport: 'Sales Report',
            inventoryReport: 'Inventory Report',
            profitReport: 'Profit Report',
            customReport: 'Custom Report',
            dateRange: 'Date Range',
            from: 'From',
            to: 'To',
            generate: 'Generate',
            download: 'Download',
            print: 'Print'
        },
        
        // Users
        users: {
            title: 'User Management',
            subtitle: 'User and permissions administration',
            newUser: 'New User',
            editUser: 'Edit User',
            username: 'Username',
            fullName: 'Full Name',
            role: 'Role',
            permissions: 'Permissions',
            active: 'Active',
            inactive: 'Inactive',
            admin: 'Administrator',
            manager: 'Manager',
            employee: 'Employee',
            lastAccess: 'Last Access',
            accessLog: 'Access Log',
            performance: 'Performance'
        },
        
        // Settings
        settings: {
            title: 'Settings',
            subtitle: 'System configuration',
            general: 'General',
            business: 'Business',
            notifications: 'Notifications',
            security: 'Security',
            integrations: 'Integrations',
            language: 'Language',
            currency: 'Currency',
            timezone: 'Timezone',
            theme: 'Theme',
            light: 'Light',
            dark: 'Dark',
            saveChanges: 'Save Changes'
        },
        
        // Common
        common: {
            yes: 'Yes',
            no: 'No',
            ok: 'OK',
            confirm: 'Confirm',
            close: 'Close',
            back: 'Back',
            next: 'Next',
            previous: 'Previous',
            loading: 'Loading...',
            error: 'Error',
            success: 'Success',
            warning: 'Warning',
            info: 'Information',
            required: 'Required',
            optional: 'Optional',
            all: 'All',
            none: 'None',
            other: 'Other'
        }
    }
};

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('warismart_language') || 'es',
    fallbackLocale: 'en',
    messages
});

export default i18n;
