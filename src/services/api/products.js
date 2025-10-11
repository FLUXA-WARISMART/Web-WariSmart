/**
 * Products API Service
 * Gestión de productos del inventario
 */

import { BaseAPI } from './base.js';

class ProductsAPI extends BaseAPI {
  constructor() {
    super('inventory_products');
  }

  /**
   * Obtener productos con bajo stock
   */
  async getLowStock(threshold = 10) {
    const response = await this.getAll();
    const lowStockProducts = response.data.filter(p => p.stock > 0 && p.stock <= threshold);
    
    return {
      success: true,
      data: lowStockProducts,
      total: lowStockProducts.length,
      threshold: threshold,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Obtener productos sin stock
   */
  async getOutOfStock() {
    const response = await this.getAll();
    const outOfStockProducts = response.data.filter(p => p.stock === 0);
    
    return {
      success: true,
      data: outOfStockProducts,
      total: outOfStockProducts.length,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Buscar productos por categoría
   */
  async getByCategory(category) {
    return await this.getAll({ categoria: category });
  }

  /**
   * Buscar productos por código
   */
  async getByCode(code) {
    const response = await this.getAll();
    const product = response.data.find(p => p.codigo === code);
    
    if (!product) {
      throw {
        success: false,
        error: `Producto con código ${code} no encontrado`,
        timestamp: new Date().toISOString()
      };
    }
    
    return {
      success: true,
      data: product,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Actualizar stock de un producto
   */
  async updateStock(id, newStock) {
    return await this.update(id, { stock: newStock });
  }

  /**
   * Obtener estadísticas de inventario
   */
  async getStats() {
    const response = await this.getAll();
    const products = response.data;
    
    const stats = {
      totalProducts: products.length,
      totalStock: products.reduce((sum, p) => sum + (p.stock || 0), 0),
      lowStockCount: products.filter(p => p.stock > 0 && p.stock <= 10).length,
      outOfStockCount: products.filter(p => p.stock === 0).length,
      totalValue: products.reduce((sum, p) => sum + (p.precioVenta * p.stock), 0),
      categories: [...new Set(products.map(p => p.categoria))],
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
export default new ProductsAPI();
