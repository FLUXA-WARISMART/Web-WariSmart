<template>
  <div class="local-storage-container">
    <div class="header">
      <div class="logos">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" alt="Vue" class="logo">
        <img src="https://vitejs.dev/logo.svg" alt="Vite" class="logo">
      </div>
      <h1>Local Storage | Fake API</h1>
      <p class="subtitle">Sistema de almacenamiento local para desarrollo</p>
    </div>

    <!-- Contador de ejemplo -->
    <div class="counter-section">
      <h2>Estamos en Local Storage!!!</h2>
      <div class="counter">
        <button @click="decrementar" class="btn-counter">-1</button>
        <span class="counter-value">{{ contador }}</span>
        <button @click="incrementar" class="btn-counter">+1</button>
        <button @click="borrarContador" class="btn-delete">Borrar</button>
      </div>
    </div>

    <!-- Visualizador de LocalStorage -->
    <div class="storage-viewer">
      <h3>📦 Contenido del LocalStorage</h3>
      <div class="storage-info">
        <p><strong>Origin:</strong> {{ origin }}</p>
        <p><strong>Total Items:</strong> {{ storageLength }}</p>
      </div>
      <div class="storage-table">
        <table v-if="storageItems.length > 0">
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in storageItems" :key="item.key">
              <td><strong>{{ item.key }}</strong></td>
              <td class="value-cell">{{ formatValue(item.value) }}</td>
              <td>
                <button @click="eliminarItem(item.key)" class="btn-delete-small">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-state">
          <p>No hay datos en LocalStorage</p>
        </div>
      </div>
      <button @click="limpiarTodo" class="btn-clear-all">🗑️ Storage.clear()</button>
    </div>

    <!-- CRUD de Productos (Fake API) -->
    <div class="crud-section">
      <h3>🛍️ Gestión de Productos (Fake API)</h3>
      
      <!-- Formulario -->
      <div class="form-container">
        <input 
          v-model="nuevoProducto.nombre" 
          type="text" 
          placeholder="Nombre del producto"
          class="form-input"
        />
        <input 
          v-model="nuevoProducto.precio" 
          type="number" 
          placeholder="Precio"
          class="form-input"
        />
        <input 
          v-model="nuevoProducto.stock" 
          type="number" 
          placeholder="Stock"
          class="form-input"
        />
        <select v-model="nuevoProducto.categoria" class="form-input">
          <option value="">Seleccionar categoría</option>
          <option value="Electrónica">Electrónica</option>
          <option value="Ropa">Ropa</option>
          <option value="Alimentos">Alimentos</option>
          <option value="Hogar">Hogar</option>
        </select>
        <button 
          @click="editandoId ? actualizarProducto() : agregarProducto()" 
          class="btn-add"
        >
          {{ editandoId ? '✏️ Actualizar' : '➕ Agregar' }}
        </button>
        <button 
          v-if="editandoId" 
          @click="cancelarEdicion" 
          class="btn-cancel"
        >
          ❌ Cancelar
        </button>
      </div>

      <!-- Tabla de Productos -->
      <div class="products-table">
        <table v-if="productos.length > 0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="producto in productos" :key="producto.id">
              <td>{{ producto.id }}</td>
              <td>{{ producto.nombre }}</td>
              <td>${{ producto.precio.toFixed(2) }}</td>
              <td>
                <span :class="['stock-badge', getStockClass(producto.stock)]">
                  {{ producto.stock }}
                </span>
              </td>
              <td>{{ producto.categoria }}</td>
              <td>
                <button @click="editarProducto(producto)" class="btn-edit">✏️</button>
                <button @click="eliminarProducto(producto.id)" class="btn-delete-small">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-state">
          <p>No hay productos registrados</p>
          <p class="hint">Usa el formulario para agregar productos</p>
        </div>
      </div>
    </div>

    <!-- Información sobre LocalStorage -->
    <div class="info-section">
      <h4>ℹ️ Información sobre LocalStorage</h4>
      <div class="info-grid">
        <div class="info-card">
          <h5>✅ Ventajas</h5>
          <ul>
            <li>Persiste entre sesiones del navegador</li>
            <li>Funciona perfectamente en Firebase Hosting</li>
            <li>No requiere servidor backend</li>
            <li>Capacidad: ~5-10MB</li>
            <li>API simple y sincrónica</li>
          </ul>
        </div>
        <div class="info-card">
          <h5>⚠️ Limitaciones</h5>
          <ul>
            <li>Los datos son específicos del navegador</li>
            <li>No se comparten entre dispositivos</li>
            <li>Específico del protocolo (http vs https)</li>
            <li>Solo almacena strings</li>
            <li>Accesible desde JavaScript del cliente</li>
          </ul>
        </div>
        <div class="info-card">
          <h5>🔧 Métodos Principales</h5>
          <ul>
            <li><code>localStorage.setItem(key, value)</code></li>
            <li><code>localStorage.getItem(key)</code></li>
            <li><code>localStorage.removeItem(key)</code></li>
            <li><code>localStorage.clear()</code></li>
            <li><code>localStorage.key(index)</code></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Respuesta a la pregunta -->
    <div class="answer-section">
      <h4>🔥 ¿Funcionará en Firebase Hosting?</h4>
      <div class="answer-box">
        <p class="answer-yes">✅ <strong>SÍ, funcionará perfectamente en Firebase Hosting</strong></p>
        <p><strong>Razón:</strong> LocalStorage es una API del navegador que se ejecuta en el lado del cliente. 
        No depende del servidor donde esté alojada la aplicación.</p>
        <p><strong>Cómo funciona:</strong></p>
        <ol>
          <li>Firebase Hosting sirve tu aplicación Vue.js como archivos estáticos</li>
          <li>El navegador del usuario carga y ejecuta el JavaScript</li>
          <li>LocalStorage se ejecuta completamente en el navegador del usuario</li>
          <li>Los datos se guardan en el dispositivo del usuario, no en Firebase</li>
        </ol>
        <p class="note">
          <strong>Nota:</strong> Cada usuario tendrá su propio LocalStorage independiente. 
          Si quieres compartir datos entre usuarios, necesitarás una base de datos real como Firestore.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

// ========== PROPIEDADES DE LOCALSTORAGE ==========
const origin = ref(window.location.origin);
const storageLength = computed(() => window.localStorage.length);

// ========== CONTADOR ==========
const contador = ref(0);

// Storage.setItem() - Almacenar datos
const incrementar = () => {
  contador.value++;
  window.localStorage.setItem('contador', contador.value.toString());
  actualizarVistaStorage();
};

const decrementar = () => {
  contador.value--;
  window.localStorage.setItem('contador', contador.value.toString());
  actualizarVistaStorage();
};

// Storage.removeItem() - Eliminar un item específico
const borrarContador = () => {
  contador.value = 0;
  window.localStorage.removeItem('contador');
  actualizarVistaStorage();
};

// ========== VISUALIZADOR DE LOCALSTORAGE ==========
const storageItems = ref([]);

// Storage.key() y Storage.getItem() - Leer todos los items
const actualizarVistaStorage = () => {
  storageItems.value = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    const value = window.localStorage.getItem(key);
    storageItems.value.push({ key, value });
  }
};

const formatValue = (value) => {
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === 'object' ? JSON.stringify(parsed, null, 2) : value;
  } catch {
    return value;
  }
};

// Storage.removeItem() - Eliminar item específico
const eliminarItem = (key) => {
  window.localStorage.removeItem(key);
  actualizarVistaStorage();
  if (key === 'contador') contador.value = 0;
  if (key === 'productos') productos.value = [];
};

// Storage.clear() - Limpiar todo el storage
const limpiarTodo = () => {
  if (confirm('¿Estás seguro de eliminar todos los datos del LocalStorage?')) {
    window.localStorage.clear();
    contador.value = 0;
    productos.value = [];
    actualizarVistaStorage();
  }
};

// ========== CRUD DE PRODUCTOS (FAKE API) ==========
const productos = ref([]);
const nuevoProducto = ref({
  nombre: '',
  precio: '',
  stock: '',
  categoria: ''
});
const editandoId = ref(null);

// Cargar productos del localStorage usando getItem()
const cargarProductos = () => {
  const productosGuardados = window.localStorage.getItem('productos');
  if (productosGuardados) {
    try {
      productos.value = JSON.parse(productosGuardados);
    } catch (error) {
      console.error('Error al parsear productos:', error);
      productos.value = [];
    }
  }
};

// Guardar productos en localStorage usando setItem()
// Nota: localStorage solo almacena strings, por eso usamos JSON.stringify()
const guardarProductos = () => {
  window.localStorage.setItem('productos', JSON.stringify(productos.value));
  actualizarVistaStorage();
};

// CREATE - Agregar producto
const agregarProducto = () => {
  if (!nuevoProducto.value.nombre || !nuevoProducto.value.precio || !nuevoProducto.value.stock || !nuevoProducto.value.categoria) {
    alert('Por favor completa todos los campos');
    return;
  }

  const producto = {
    id: Date.now(), // Generamos un ID único usando timestamp
    nombre: nuevoProducto.value.nombre,
    precio: parseFloat(nuevoProducto.value.precio),
    stock: parseInt(nuevoProducto.value.stock),
    categoria: nuevoProducto.value.categoria,
    fechaCreacion: new Date().toISOString()
  };

  productos.value.push(producto);
  guardarProductos(); // Persistir en localStorage
  limpiarFormulario();
};

// READ - Los productos se cargan automáticamente al montar el componente

// UPDATE - Editar producto
const editarProducto = (producto) => {
  editandoId.value = producto.id;
  nuevoProducto.value = {
    nombre: producto.nombre,
    precio: producto.precio,
    stock: producto.stock,
    categoria: producto.categoria
  };
};

const actualizarProducto = () => {
  const index = productos.value.findIndex(p => p.id === editandoId.value);
  if (index !== -1) {
    productos.value[index] = {
      ...productos.value[index],
      nombre: nuevoProducto.value.nombre,
      precio: parseFloat(nuevoProducto.value.precio),
      stock: parseInt(nuevoProducto.value.stock),
      categoria: nuevoProducto.value.categoria,
      fechaActualizacion: new Date().toISOString()
    };
    guardarProductos(); // Persistir cambios en localStorage
    cancelarEdicion();
  }
};

// DELETE - Eliminar producto
const eliminarProducto = (id) => {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    productos.value = productos.value.filter(p => p.id !== id);
    guardarProductos(); // Persistir cambios en localStorage
  }
};

const cancelarEdicion = () => {
  editandoId.value = null;
  limpiarFormulario();
};

const limpiarFormulario = () => {
  nuevoProducto.value = {
    nombre: '',
    precio: '',
    stock: '',
    categoria: ''
  };
};

const getStockClass = (stock) => {
  if (stock === 0) return 'out-of-stock';
  if (stock < 10) return 'low-stock';
  return 'in-stock';
};

// ========== INICIALIZACIÓN ==========
onMounted(() => {
  // Cargar contador usando getItem()
  const contadorGuardado = window.localStorage.getItem('contador');
  if (contadorGuardado) {
    contador.value = parseInt(contadorGuardado);
  }

  // Cargar productos
  cargarProductos();

  // Actualizar vista del storage
  actualizarVistaStorage();

  // Log de información (similar a la clase)
  console.log('LocalStorage Origin:', window.location.origin);
  console.log('LocalStorage Length:', window.localStorage.length);
});
</script>

<style scoped>
.local-storage-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #f9fafb;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.logos {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
}

.logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

h1 {
  font-size: 42px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 10px 0;
}

.subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
}

/* Contador */
.counter-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.counter-section h2 {
  font-size: 32px;
  margin: 0 0 30px 0;
  font-weight: 700;
}

.counter {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.counter-value {
  font-size: 56px;
  font-weight: 700;
  min-width: 120px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.btn-counter {
  width: 60px;
  height: 60px;
  font-size: 24px;
  font-weight: 700;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-counter:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.btn-counter:active {
  transform: translateY(0);
}

.btn-delete {
  padding: 12px 24px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-delete:hover {
  background: #dc2626;
  transform: translateY(-2px);
}

/* Storage Viewer */
.storage-viewer {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.storage-viewer h3 {
  font-size: 24px;
  margin: 0 0 20px 0;
  color: #1a1a1a;
}

.storage-info {
  background: #f0f9ff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 4px solid #3b82f6;
}

.storage-info p {
  margin: 5px 0;
  color: #1e3a8a;
  font-size: 14px;
}

.storage-table {
  overflow-x: auto;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

thead {
  background: #f9fafb;
}

th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

td {
  padding: 12px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
}

.value-cell {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #4b5563;
}

.btn-delete-small {
  padding: 6px 12px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-delete-small:hover {
  background: #dc2626;
  transform: scale(1.05);
}

.btn-clear-all {
  width: 100%;
  padding: 12px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-clear-all:hover {
  background: #dc2626;
}

/* CRUD Section */
.crud-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.crud-section h3 {
  font-size: 24px;
  margin: 0 0 20px 0;
  color: #1a1a1a;
}

.form-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.form-input {
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-add {
  padding: 12px 24px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-add:hover {
  background: #059669;
  transform: translateY(-2px);
}

.btn-cancel {
  padding: 12px 24px;
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel:hover {
  background: #4b5563;
}

.btn-edit {
  padding: 6px 12px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
  transition: all 0.2s;
}

.btn-edit:hover {
  background: #2563eb;
  transform: scale(1.05);
}

.products-table {
  overflow-x: auto;
}

.stock-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.stock-badge.in-stock {
  background: #dcfce7;
  color: #16a34a;
}

.stock-badge.low-stock {
  background: #fef3c7;
  color: #ca8a04;
}

.stock-badge.out-of-stock {
  background: #fee2e2;
  color: #dc2626;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #9ca3af;
}

.empty-state p {
  margin: 5px 0;
  font-size: 16px;
}

.hint {
  font-size: 14px !important;
  color: #6b7280 !important;
}

/* Info Section */
.info-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.info-section h4 {
  margin: 0 0 20px 0;
  color: #1a1a1a;
  font-size: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.info-card {
  background: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.info-card h5 {
  margin: 0 0 15px 0;
  color: #1e40af;
  font-size: 16px;
}

.info-card ul {
  margin: 0;
  padding-left: 20px;
}

.info-card li {
  margin-bottom: 8px;
  color: #374151;
  font-size: 14px;
  line-height: 1.6;
}

.info-card code {
  background: #e0e7ff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: #3730a3;
  font-family: 'Courier New', monospace;
}

/* Answer Section */
.answer-section {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
}

.answer-section h4 {
  margin: 0 0 20px 0;
  font-size: 24px;
}

.answer-box {
  background: rgba(255, 255, 255, 0.1);
  padding: 25px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.answer-yes {
  font-size: 20px;
  margin: 0 0 15px 0;
  padding: 15px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}

.answer-box p {
  margin: 10px 0;
  line-height: 1.8;
}

.answer-box ol {
  margin: 15px 0;
  padding-left: 25px;
}

.answer-box li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.note {
  background: rgba(255, 255, 255, 0.15);
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
  border-left: 4px solid rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .form-container {
    grid-template-columns: 1fr;
  }
  
  .counter {
    flex-direction: column;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
