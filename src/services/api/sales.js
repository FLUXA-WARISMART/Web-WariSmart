/**
 * Sales API Service
 * Gestión de ventas y transacciones
 */

import { BaseAPI } from './base.js';
import productsAPI from './products.js';

class SalesAPI extends BaseAPI {
  constructor() {
    super('sales');
  }

  /**
   * Crear una nueva venta y actualizar stock
   */
  async createSale(saleData) {
    try {
      // Validar stock disponible
      for (const item of saleData.productos) {
        const product = await productsAPI.getById(item.id);
        if (product.data.stock < item.cantidad) {
          throw new Error(`Stock insuficiente para ${product.data.nombre}`);
        }
      }

      // Generar número de boleta
      const allSales = await this.getAll();
      const boletaNumber = `B001-${String(allSales.data.length + 1).padStart(6, '0')}`;

      // Crear venta
      const sale = {
        boleta: boletaNumber,
        cliente: saleData.cliente,
        dni: saleData.dni || 'Sin documento',
        productos: saleData.productos,
        productosTexto: saleData.productos.map(p => `${p.cantidad}x ${p.nombre}`).join(', '),
        cantidadProductos: saleData.productos.reduce((sum, p) => sum + p.cantidad, 0),
        total: saleData.productos.reduce((sum, p) => sum + (p.precio * p.cantidad), 0),
        metodoPago: saleData.metodoPago,
        fecha: new Date().toISOString(),
        fechaTexto: new Date().toLocaleDateString('es-PE'),
        hora: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
        estado: 'Completada'
      };

      // Guardar venta
      const response = await this.create(sale);

      // Actualizar stock de productos
      for (const item of saleData.productos) {
        const product = await productsAPI.getById(item.id);
        const newStock = product.data.stock - item.cantidad;
        await productsAPI.updateStock(item.id, newStock);
      }

      return response;
    } catch (error) {
      throw {
        success: false,
        error: error.message || error,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Obtener ventas de hoy
   */
  async getTodaySales() {
    const today = new Date().toLocaleDateString('es-PE');
    const response = await this.getAll();
    const todaySales = response.data.filter(s => s.fechaTexto === today);
    
    return {
      success: true,
      data: todaySales,
      total: todaySales.length,
      totalAmount: todaySales.reduce((sum, s) => sum + s.total, 0),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Obtener ventas por rango de fechas
   */
  async getSalesByDateRange(startDate, endDate) {
    const response = await this.getAll();
    const sales = response.data.filter(s => {
      const saleDate = new Date(s.fecha);
      return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
    });
    
    return {
      success: true,
      data: sales,
      total: sales.length,
      totalAmount: sales.reduce((sum, s) => sum + s.total, 0),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Obtener estadísticas de ventas
   */
  async getStats() {
    const response = await this.getAll();
    const sales = response.data;
    
    const today = new Date().toLocaleDateString('es-PE');
    const todaySales = sales.filter(s => s.fechaTexto === today);
    
    const stats = {
      totalSales: sales.length,
      totalRevenue: sales.reduce((sum, s) => sum + s.total, 0),
      todaySales: todaySales.length,
      todayRevenue: todaySales.reduce((sum, s) => sum + s.total, 0),
      averageTicket: sales.length > 0 ? sales.reduce((sum, s) => sum + s.total, 0) / sales.length : 0,
      paymentMethods: this.groupByPaymentMethod(sales),
      timestamp: new Date().toISOString()
    };
    
    return {
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Agrupar ventas por método de pago
   */
  groupByPaymentMethod(sales) {
    const grouped = {};
    sales.forEach(sale => {
      if (!grouped[sale.metodoPago]) {
        grouped[sale.metodoPago] = { count: 0, total: 0 };
      }
      grouped[sale.metodoPago].count++;
      grouped[sale.metodoPago].total += sale.total;
    });
    return grouped;
  }
}

// Exportar instancia única (Singleton)
export default new SalesAPI();
