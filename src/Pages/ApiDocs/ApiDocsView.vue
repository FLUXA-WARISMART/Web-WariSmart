<template>
  <div class="api-docs">
    <div class="docs-header">
      <h1 class="docs-title">WariSmart Fake API</h1>
      <div class="api-status">
        <span class="status-badge">API Activa</span>
        <span class="delay-badge">Delay: {{ apiInfo.delay }}ms</span>
      </div>
    </div>

    <!-- API Info -->
    <div class="info-card">
      <h2>Información General</h2>
      <div class="info-grid">
        <div class="info-item">
          <strong>Versión:</strong> {{ apiInfo.version }}
        </div>
        <div class="info-item">
          <strong>Base URL:</strong> <code>{{ apiInfo.baseURL }}</code>
        </div>
        <div class="info-item">
          <strong>Storage:</strong> {{ apiInfo.storage }}
        </div>
        <div class="info-item">
          <strong>Logs:</strong> {{ apiInfo.logsEnabled ? 'Activados' : 'Desactivados' }}
        </div>
      </div>
    </div>

    <!-- Quick Test -->
    <div class="test-card">
      <h2>Prueba Rápida</h2>
      <p>Ejecuta peticiones de prueba directamente desde aquí:</p>
      
      <div class="test-buttons">
        <button @click="testGetProducts" class="btn-test">
          <span class="method-badge get">GET</span>
          Obtener Productos
        </button>
        <button @click="testGetSales" class="btn-test">
          <span class="method-badge get">GET</span>
          Obtener Ventas
        </button>
        <button @click="testGetSuppliers" class="btn-test">
          <span class="method-badge get">GET</span>
          Obtener Proveedores
        </button>
        <button @click="testGetStats" class="btn-test">
          <span class="method-badge get">GET</span>
          Estadísticas
        </button>
      </div>

      <div v-if="testResult" class="test-result">
        <div class="result-header">
          <h3>Resultado:</h3>
          <button @click="testResult = null" class="btn-close-result">×</button>
        </div>
        <pre>{{ JSON.stringify(testResult, null, 2) }}</pre>
      </div>
    </div>

    <!-- Endpoints Documentation -->
    <div class="endpoints-section">
      <h2>Endpoints Disponibles</h2>

      <!-- Products Endpoints -->
      <div class="endpoint-group">
        <h3>Productos (Inventario)</h3>
        
        <div class="endpoint-card">
          <div class="endpoint-header">
            <span class="method-badge get">GET</span>
            <code>/api/inventory_products</code>
          </div>
          <p>Obtener todos los productos del inventario</p>
          <div class="code-example">
            <strong>Ejemplo:</strong>
            <pre>const response = await API.products.getAll();</pre>
          </div>
        </div>

        <div class="endpoint-card">
          <div class="endpoint-header">
            <span class="method-badge get">GET</span>
            <code>/api/inventory_products/:id</code>
          </div>
          <p>Obtener un producto específico por ID</p>
          <div class="code-example">
            <strong>Ejemplo:</strong>
            <pre>const response = await API.products.getById(123);</pre>
          </div>
        </div>

        <div class="endpoint-card">
          <div class="endpoint-header">
            <span class="method-badge post">POST</span>
            <code>/api/inventory_products</code>
          </div>
          <p>Crear un nuevo producto</p>
          <div class="code-example">
            <strong>Ejemplo:</strong>
            <pre>const response = await API.products.create({
  codigo: 'PROD-001',
  nombre: 'Producto Nuevo',
  categoria: 'Electrónicos',
  precioVenta: 100,
  stock: 50
});</pre>
          </div>
        </div>

        <div class="endpoint-card">
          <div class="endpoint-header">
            <span class="method-badge put">PUT</span>
            <code>/api/inventory_products/:id</code>
          </div>
          <p>Actualizar un producto existente</p>
          <div class="code-example">
            <strong>Ejemplo:</strong>
            <pre>const response = await API.products.update(123, {
  stock: 75,
  precioVenta: 120
});</pre>
          </div>
        </div>

        <div class="endpoint-card">
          <div class="endpoint-header">
            <span class="method-badge delete">DELETE</span>
            <code>/api/inventory_products/:id</code>
          </div>
          <p>Eliminar un producto</p>
          <div class="code-example">
            <strong>Ejemplo:</strong>
            <pre>const response = await API.products.delete(123);</pre>
          </div>
        </div>

        <div class="endpoint-card special">
          <div class="endpoint-header">
            <span class="method-badge get">GET</span>
            <code>/api/inventory_products/low-stock</code>
          </div>
          <p>Obtener productos con stock bajo (≤10 unidades)</p>
          <div class="code-example">
            <strong>Ejemplo:</strong>
            <pre>const response = await API.products.getLowStock();</pre>
          </div>
        </div>

        <div class="endpoint-card special">
          <div class="endpoint-header">
            <span class="method-badge get">GET</span>
            <code>/api/inventory_products/stats</code>
          </div>
          <p>Obtener estadísticas del inventario</p>
          <div class="code-example">
            <strong>Ejemplo:</strong>
            <pre>const response = await API.products.getStats();</pre>
          </div>
        </div>
      </div>

      <!-- Sales Endpoints -->
      <div class="endpoint-group">
        <h3>Ventas</h3>
        
        <div class="endpoint-card">
          <div class="endpoint-header">
            <span class="method-badge get">GET</span>
            <code>/api/sales</code>
          </div>
          <p>Obtener todas las ventas</p>
          <div class="code-example">
            <strong>Ejemplo:</strong>
            <pre>const response = await API.sales.getAll();</pre>
          </div>
        </div>

        <div class="endpoint-card">
          <div class="endpoint-header">
            <span class="method-badge post">POST</span>
            <code>/api/sales</code>
          </div>
          <p>Crear una nueva venta (actualiza stock automáticamente)</p>
          <div class="code-example">
            <strong>Ejemplo:</strong>
            <pre>const response = await API.sales.createSale({
  cliente: 'Juan Pérez',
  dni: '12345678',
  productos: [
    { id: 123, nombre: 'Producto A', precio: 100, cantidad: 2 }
  ],
  metodoPago: 'Efectivo'
});</pre>
          </div>
        </div>

        <div class="endpoint-card special">
          <div class="endpoint-header">
            <span class="method-badge get">GET</span>
            <code>/api/sales/today</code>
          </div>
          <p>Obtener ventas del día actual</p>
          <div class="code-example">
            <strong>Ejemplo:</strong>
            <pre>const response = await API.sales.getTodaySales();</pre>
          </div>
        </div>

        <div class="endpoint-card special">
          <div class="endpoint-header">
            <span class="method-badge get">GET</span>
            <code>/api/sales/stats</code>
          </div>
          <p>Obtener estadísticas de ventas</p>
          <div class="code-example">
            <strong>Ejemplo:</strong>
            <pre>const response = await API.sales.getStats();</pre>
          </div>
        </div>
      </div>

      <!-- Suppliers Endpoints -->
      <div class="endpoint-group">
        <h3>Proveedores</h3>
        
        <div class="endpoint-card">
          <div class="endpoint-header">
            <span class="method-badge get">GET</span>
            <code>/api/suppliers</code>
          </div>
          <p>Obtener todos los proveedores</p>
          <div class="code-example">
            <strong>Ejemplo:</strong>
            <pre>const response = await API.suppliers.getAll();</pre>
          </div>
        </div>

        <div class="endpoint-card">
          <div class="endpoint-header">
            <span class="method-badge post">POST</span>
            <code>/api/suppliers</code>
          </div>
          <p>Crear un nuevo proveedor</p>
          <div class="code-example">
            <strong>Ejemplo:</strong>
            <pre>const response = await API.suppliers.create({
  nombre: 'Proveedor XYZ',
  ruc: '20123456789',
  categoria: 'Alimentos',
  contacto: {
    nombre: 'Carlos',
    email: 'carlos@xyz.com',
    telefono: '999999999'
  }
});</pre>
          </div>
        </div>

        <div class="endpoint-card special">
          <div class="endpoint-header">
            <span class="method-badge get">GET</span>
            <code>/api/suppliers/active</code>
          </div>
          <p>Obtener proveedores activos</p>
          <div class="code-example">
            <strong>Ejemplo:</strong>
            <pre>const response = await API.suppliers.getActive();</pre>
          </div>
        </div>

        <div class="endpoint-card special">
          <div class="endpoint-header">
            <span class="method-badge get">GET</span>
            <code>/api/suppliers/stats</code>
          </div>
          <p>Obtener estadísticas de proveedores</p>
          <div class="code-example">
            <strong>Ejemplo:</strong>
            <pre>const response = await API.suppliers.getStats();</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Console Access -->
    <div class="console-card">
      <h2>Acceso desde Consola</h2>
      <p>Puedes acceder a la API directamente desde la consola del navegador:</p>
      <div class="console-examples">
        <div class="console-example">
          <code>window.API.info()</code>
          <span>Ver información de la API</span>
        </div>
        <div class="console-example">
          <code>await window.API.products.getAll()</code>
          <span>Obtener todos los productos</span>
        </div>
        <div class="console-example">
          <code>await window.API.sales.getTodaySales()</code>
          <span>Obtener ventas de hoy</span>
        </div>
        <div class="console-example">
          <code>window.API.setDelay(1000)</code>
          <span>Cambiar delay de red a 1 segundo</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import API from '../../services/api/index.js';

const apiInfo = ref({});
const testResult = ref(null);

onMounted(() => {
  apiInfo.value = API.info();
});

const testGetProducts = async () => {
  try {
    testResult.value = await API.products.getAll();
  } catch (error) {
    testResult.value = error;
  }
};

const testGetSales = async () => {
  try {
    testResult.value = await API.sales.getAll();
  } catch (error) {
    testResult.value = error;
  }
};

const testGetSuppliers = async () => {
  try {
    testResult.value = await API.suppliers.getAll();
  } catch (error) {
    testResult.value = error;
  }
};

const testGetStats = async () => {
  try {
    const [products, sales, suppliers] = await Promise.all([
      API.products.getStats(),
      API.sales.getStats(),
      API.suppliers.getStats()
    ]);
    
    testResult.value = {
      products: products.data,
      sales: sales.data,
      suppliers: suppliers.data
    };
  } catch (error) {
    testResult.value = error;
  }
};
</script>

<style scoped>
.api-docs {
  padding: 32px;
  background: #f9fafb;
  min-height: 100vh;
}

.docs-header {
  margin-bottom: 32px;
  text-align: center;
}

.docs-title {
  font-size: 42px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 12px 0;
}

.docs-subtitle {
  font-size: 18px;
  color: #666;
  margin: 0 0 16px 0;
}

.api-status {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
}

.status-badge {
  background: #dcfce7;
  color: #166534;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.delay-badge {
  background: #dbeafe;
  color: #1e40af;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.info-card, .test-card, .console-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.info-card h2, .test-card h2, .console-card h2 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.info-item {
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
}

.info-item strong {
  display: block;
  color: #666;
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.info-item code {
  background: #1a1a1a;
  color: #10b981;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 13px;
}

.test-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.btn-test {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-test:hover {
  border-color: #3b82f6;
  background: #eff6ff;
}

.test-result {
  margin-top: 24px;
  background: #1a1a1a;
  border-radius: 8px;
  padding: 16px;
  color: #10b981;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  max-height: 400px;
  overflow: auto;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.result-header h3 {
  color: white;
  margin: 0;
  font-size: 16px;
}

.btn-close-result {
  background: #ef4444;
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
}

.test-result pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.endpoints-section {
  margin-top: 32px;
}

.endpoints-section > h2 {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 24px 0;
}

.endpoint-group {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.endpoint-group h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 20px 0;
}

.endpoint-card {
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  border-left: 4px solid #e5e7eb;
}

.endpoint-card.special {
  border-left-color: #8b5cf6;
  background: #faf5ff;
}

.endpoint-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.endpoint-header code {
  background: #1a1a1a;
  color: #10b981;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
}

.method-badge {
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.method-badge.get {
  background: #dcfce7;
  color: #166534;
}

.method-badge.post {
  background: #dbeafe;
  color: #1e40af;
}

.method-badge.put {
  background: #fef3c7;
  color: #92400e;
}

.method-badge.delete {
  background: #fee2e2;
  color: #991b1b;
}

.endpoint-card p {
  color: #666;
  margin: 0 0 12px 0;
  font-size: 14px;
}

.code-example {
  background: #1a1a1a;
  border-radius: 6px;
  padding: 12px;
  margin-top: 8px;
}

.code-example strong {
  color: #9ca3af;
  font-size: 12px;
  display: block;
  margin-bottom: 8px;
}

.code-example pre {
  margin: 0;
  color: #10b981;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.console-examples {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.console-example {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.console-example code {
  background: #1a1a1a;
  color: #10b981;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
}

.console-example span {
  color: #666;
  font-size: 14px;
}

@media (max-width: 768px) {
  .api-docs {
    padding: 16px;
  }
  
  .docs-title {
    font-size: 32px;
  }
  
  .test-buttons {
    flex-direction: column;
  }
  
  .btn-test {
    width: 100%;
  }
  
  .console-example {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
