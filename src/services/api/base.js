/**
 * Base API Service - Simula una API REST real
 * Usa localStorage como base de datos
 */

// Configuración de la API
const API_CONFIG = {
  baseURL: '/api',
  delay: 300, // Simula latencia de red (ms)
  enableLogs: true // Logs de peticiones
};

// Simular delay de red
const simulateNetworkDelay = () => {
  return new Promise(resolve => setTimeout(resolve, API_CONFIG.delay));
};

// Logger de peticiones
const logRequest = (method, endpoint, data = null) => {
  if (!API_CONFIG.enableLogs) return;
  
  const timestamp = new Date().toLocaleTimeString();
  console.log(`%c[API ${method}] ${timestamp}`, 'color: #3b82f6; font-weight: bold', endpoint);
  if (data) {
    console.log('%cRequest Data:', 'color: #10b981', data);
  }
};

const logResponse = (method, endpoint, data, duration) => {
  if (!API_CONFIG.enableLogs) return;
  
  console.log(`%c[API ${method}] ✓ ${duration}ms`, 'color: #10b981; font-weight: bold', endpoint);
  console.log('%cResponse Data:', 'color: #8b5cf6', data);
};

const logError = (method, endpoint, error) => {
  if (!API_CONFIG.enableLogs) return;
  
  console.error(`%c[API ${method}] ✗`, 'color: #ef4444; font-weight: bold', endpoint, error);
};

/**
 * Clase base para operaciones CRUD
 */
class BaseAPI {
  constructor(resourceName) {
    this.resourceName = resourceName;
    this.storageKey = `${resourceName}`;
  }

  /**
   * GET - Obtener todos los recursos
   */
  async getAll(filters = {}) {
    const startTime = performance.now();
    logRequest('GET', `${API_CONFIG.baseURL}/${this.resourceName}`, filters);
    
    try {
      await simulateNetworkDelay();
      
      let data = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      
      // Aplicar filtros si existen
      if (Object.keys(filters).length > 0) {
        data = this.applyFilters(data, filters);
      }
      
      const duration = Math.round(performance.now() - startTime);
      logResponse('GET', `${API_CONFIG.baseURL}/${this.resourceName}`, data, duration);
      
      return {
        success: true,
        data: data,
        total: data.length,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logError('GET', `${API_CONFIG.baseURL}/${this.resourceName}`, error);
      throw {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * GET - Obtener un recurso por ID
   */
  async getById(id) {
    const startTime = performance.now();
    logRequest('GET', `${API_CONFIG.baseURL}/${this.resourceName}/${id}`);
    
    try {
      await simulateNetworkDelay();
      
      const data = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      const item = data.find(item => item.id === id);
      
      if (!item) {
        throw new Error(`${this.resourceName} con ID ${id} no encontrado`);
      }
      
      const duration = Math.round(performance.now() - startTime);
      logResponse('GET', `${API_CONFIG.baseURL}/${this.resourceName}/${id}`, item, duration);
      
      return {
        success: true,
        data: item,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logError('GET', `${API_CONFIG.baseURL}/${this.resourceName}/${id}`, error);
      throw {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * POST - Crear un nuevo recurso
   */
  async create(newItem) {
    const startTime = performance.now();
    logRequest('POST', `${API_CONFIG.baseURL}/${this.resourceName}`, newItem);
    
    try {
      await simulateNetworkDelay();
      
      const data = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      
      // Generar ID único
      const item = {
        ...newItem,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      data.push(item);
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      
      // Disparar evento de actualización
      this.dispatchUpdateEvent();
      
      const duration = Math.round(performance.now() - startTime);
      logResponse('POST', `${API_CONFIG.baseURL}/${this.resourceName}`, item, duration);
      
      return {
        success: true,
        data: item,
        message: `${this.resourceName} creado exitosamente`,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logError('POST', `${API_CONFIG.baseURL}/${this.resourceName}`, error);
      throw {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * PUT - Actualizar un recurso existente
   */
  async update(id, updates) {
    const startTime = performance.now();
    logRequest('PUT', `${API_CONFIG.baseURL}/${this.resourceName}/${id}`, updates);
    
    try {
      await simulateNetworkDelay();
      
      const data = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      const index = data.findIndex(item => item.id === id);
      
      if (index === -1) {
        throw new Error(`${this.resourceName} con ID ${id} no encontrado`);
      }
      
      // Actualizar item
      data[index] = {
        ...data[index],
        ...updates,
        id: id, // Mantener el ID original
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      
      // Disparar evento de actualización
      this.dispatchUpdateEvent();
      
      const duration = Math.round(performance.now() - startTime);
      logResponse('PUT', `${API_CONFIG.baseURL}/${this.resourceName}/${id}`, data[index], duration);
      
      return {
        success: true,
        data: data[index],
        message: `${this.resourceName} actualizado exitosamente`,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logError('PUT', `${API_CONFIG.baseURL}/${this.resourceName}/${id}`, error);
      throw {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * DELETE - Eliminar un recurso
   */
  async delete(id) {
    const startTime = performance.now();
    logRequest('DELETE', `${API_CONFIG.baseURL}/${this.resourceName}/${id}`);
    
    try {
      await simulateNetworkDelay();
      
      const data = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      const index = data.findIndex(item => item.id === id);
      
      if (index === -1) {
        throw new Error(`${this.resourceName} con ID ${id} no encontrado`);
      }
      
      const deletedItem = data[index];
      data.splice(index, 1);
      
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      
      // Disparar evento de actualización
      this.dispatchUpdateEvent();
      
      const duration = Math.round(performance.now() - startTime);
      logResponse('DELETE', `${API_CONFIG.baseURL}/${this.resourceName}/${id}`, deletedItem, duration);
      
      return {
        success: true,
        data: deletedItem,
        message: `${this.resourceName} eliminado exitosamente`,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logError('DELETE', `${API_CONFIG.baseURL}/${this.resourceName}/${id}`, error);
      throw {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Aplicar filtros a los datos
   */
  applyFilters(data, filters) {
    return data.filter(item => {
      return Object.keys(filters).every(key => {
        if (filters[key] === undefined || filters[key] === null) return true;
        
        // Búsqueda por texto (case insensitive)
        if (typeof filters[key] === 'string') {
          return String(item[key]).toLowerCase().includes(filters[key].toLowerCase());
        }
        
        // Comparación exacta
        return item[key] === filters[key];
      });
    });
  }

  /**
   * Disparar evento de actualización
   */
  dispatchUpdateEvent() {
    const eventName = `${this.resourceName}-updated`;
    window.dispatchEvent(new CustomEvent(eventName));
    
    // También disparar evento genérico
    window.dispatchEvent(new CustomEvent('api-data-updated', {
      detail: { resource: this.resourceName }
    }));
  }
}

export { BaseAPI, API_CONFIG };
