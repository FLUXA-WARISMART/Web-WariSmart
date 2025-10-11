/**
 * Suppliers API Service
 * Gestión de proveedores
 */

import { BaseAPI } from './base.js';

class SuppliersAPI extends BaseAPI {
  constructor() {
    super('suppliers');
  }

  /**
   * Obtener proveedores activos
   */
  async getActive() {
    const response = await this.getAll();
    const activeSuppliers = response.data.filter(s => s.estado === 'Activo' || !s.estado);
    
    return {
      success: true,
      data: activeSuppliers,
      total: activeSuppliers.length,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Obtener proveedores por categoría
   */
  async getByCategory(category) {
    return await this.getAll({ categoria: category });
  }

  /**
   * Buscar proveedor por RUC
   */
  async getByRUC(ruc) {
    const response = await this.getAll();
    const supplier = response.data.find(s => s.ruc === ruc);
    
    if (!supplier) {
      throw {
        success: false,
        error: `Proveedor con RUC ${ruc} no encontrado`,
        timestamp: new Date().toISOString()
      };
    }
    
    return {
      success: true,
      data: supplier,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Actualizar estado de un proveedor
   */
  async updateStatus(id, status) {
    return await this.update(id, { estado: status });
  }

  /**
   * Obtener estadísticas de proveedores
   */
  async getStats() {
    const response = await this.getAll();
    const suppliers = response.data;
    
    const stats = {
      totalSuppliers: suppliers.length,
      activeSuppliers: suppliers.filter(s => s.estado === 'Activo' || !s.estado).length,
      inactiveSuppliers: suppliers.filter(s => s.estado === 'Inactivo').length,
      categories: [...new Set(suppliers.map(s => s.categoria))],
      totalOrders: suppliers.reduce((sum, s) => sum + (s.ordenes || 0), 0),
      timestamp: new Date().toISOString()
    };
    
    return {
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    };
  }
}

// Exportar instancia única (Singleton)
export default new SuppliersAPI();
