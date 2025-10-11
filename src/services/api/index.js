/**
 * API Services - Punto de entrada principal
 * Exporta todos los servicios de la fake API
 */

import productsAPI from './products.js';
import salesAPI from './sales.js';
import suppliersAPI from './suppliers.js';
import { API_CONFIG } from './base.js';

/**
 * Objeto principal de la API
 */
const API = {
  products: productsAPI,
  sales: salesAPI,
  suppliers: suppliersAPI,
  
  // Configuración
  config: API_CONFIG,
  
  // Métodos de utilidad
  setDelay(ms) {
    API_CONFIG.delay = ms;
  },
  
  enableLogs(enable = true) {
    API_CONFIG.enableLogs = enable;
  },
  
  // Información de la API
  info() {
    return {
      name: 'WariSmart Fake API',
      version: '1.0.0',
      baseURL: API_CONFIG.baseURL,
      delay: API_CONFIG.delay,
      logsEnabled: API_CONFIG.enableLogs,
      endpoints: {
        products: [
          'GET /api/inventory_products',
          'GET /api/inventory_products/:id',
          'POST /api/inventory_products',
          'PUT /api/inventory_products/:id',
          'DELETE /api/inventory_products/:id',
          'GET /api/inventory_products/low-stock',
          'GET /api/inventory_products/out-of-stock',
          'GET /api/inventory_products/stats'
        ],
        sales: [
          'GET /api/sales',
          'GET /api/sales/:id',
          'POST /api/sales',
          'PUT /api/sales/:id',
          'DELETE /api/sales/:id',
          'GET /api/sales/today',
          'GET /api/sales/stats'
        ],
        suppliers: [
          'GET /api/suppliers',
          'GET /api/suppliers/:id',
          'POST /api/suppliers',
          'PUT /api/suppliers/:id',
          'DELETE /api/suppliers/:id',
          'GET /api/suppliers/active',
          'GET /api/suppliers/stats'
        ]
      },
      storage: 'localStorage',
      timestamp: new Date().toISOString()
    };
  }
};

// Hacer API global para debugging (solo en desarrollo)
if (import.meta.env.DEV) {
  window.API = API;
  console.log('%cFake API Loaded!', 'color: #10b981; font-size: 16px; font-weight: bold');
  console.log('%cAccede a la API desde la consola con: window.API', 'color: #3b82f6');
  console.log('%cEjemplo: await window.API.products.getAll()', 'color: #8b5cf6');
}

export default API;
