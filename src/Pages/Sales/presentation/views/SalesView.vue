<template>
  <div class="sales-view">
    <!-- Modal de Nueva Venta -->
    <div v-if="showSaleModal" class="modal-overlay" @click.self="closeSaleModal">
      <div class="modal-content sale-modal">
        <div class="modal-header">
          <h3>{{ $t('sales.newSale') }}</h3>
          <button class="close-button" @click="closeSaleModal">&times;</button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="saveSale" class="sale-form">
            <div class="form-row">
              <div class="form-group">
                <label>{{ $t('sales.customer') }} *</label>
                <input v-model="newSale.cliente" type="text" required placeholder="Nombre del cliente" class="form-control">
              </div>
              <div class="form-group">
                <label>DNI/RUC</label>
                <input v-model="newSale.dni" type="text" placeholder="Documento del cliente" class="form-control">
              </div>
            </div>

            <div class="form-group">
              <label>Seleccionar Productos *</label>
              <select v-model="selectedProductId" @change="addProductToSale" class="form-control">
                <option value="">-- Seleccionar producto --</option>
                <option v-for="product in availableProducts" :key="product.id" :value="product.id">
                  {{ product.nombre }} - S/{{ product.precioVenta }} (Stock: {{ product.stock }})
                </option>
              </select>
            </div>

            <div v-if="newSale.productos.length > 0" class="products-list">
              <h4>Productos en la venta:</h4>
              <div v-for="(item, index) in newSale.productos" :key="index" class="product-item">
                <div class="product-info">
                  <strong>{{ item.nombre }}</strong>
                  <span>S/{{ item.precio }}</span>
                </div>
                <div class="product-quantity">
                  <button type="button" @click="decreaseQuantity(index)" class="qty-btn">-</button>
                  <input v-model.number="item.cantidad" type="number" min="1" :max="item.stockDisponible" class="qty-input">
                  <button type="button" @click="increaseQuantity(index)" class="qty-btn">+</button>
                </div>
                <div class="product-subtotal">
                  S/{{ (item.precio * item.cantidad).toFixed(2) }}
                </div>
                <button type="button" @click="removeProduct(index)" class="btn-remove-product">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>{{ $t('sales.paymentMethod') }} *</label>
                <select v-model="newSale.metodoPago" required class="form-control">
                  <option value="Efectivo">{{ $t('sales.cash') }}</option>
                  <option value="Tarjeta">{{ $t('sales.card') }}</option>
                  <option value="Yape">Yape</option>
                  <option value="Plin">Plin</option>
                  <option value="Transferencia">{{ $t('sales.transfer') }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>{{ $t('sales.total') }}</label>
                <input :value="'S/' + calculateTotal()" readonly class="form-control total-input">
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="closeSaleModal">{{ $t('inventory.cancel') }}</button>
              <button type="submit" class="btn-primary" :disabled="newSale.productos.length === 0">
                {{ $t('sales.newSale') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="sales-header">
      <div>
        <h1 class="page-title">{{ $t('sales.title') }}</h1>
        <p class="page-subtitle">{{ $t('sales.subtitle') }}</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <SalesStats />

    <!-- Main Content Grid -->
    <div class="content-grid">
      <!-- Sales Table -->
      <div class="main-section">
        <SalesTable />
      </div>

      <!-- Sidebar -->
      <div class="sidebar-section">
        <ElectronicInvoices />
        <PricingDiscounts />
      </div>
    </div>

    <!-- Customer History -->
    <CustomerHistory />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SalesStats from '../components/SalesStats.vue';
import SalesTable from '../components/SalesTable.vue';
import ElectronicInvoices from '../components/ElectronicInvoices.vue';
import PricingDiscounts from '../components/PricingDiscounts.vue';
import CustomerHistory from '../components/CustomerHistory.vue';

const showSaleModal = ref(false);
const availableProducts = ref([]);
const selectedProductId = ref('');

const newSale = ref({
  cliente: '',
  dni: '',
  productos: [],
  metodoPago: 'Efectivo'
});

// Abrir modal de nueva venta
const openSaleModal = () => {
  loadAvailableProducts();
  showSaleModal.value = true;
};

// Cerrar modal
const closeSaleModal = () => {
  showSaleModal.value = false;
  resetForm();
};

// Resetear formulario
const resetForm = () => {
  newSale.value = {
    cliente: '',
    dni: '',
    productos: [],
    metodoPago: 'Efectivo'
  };
  selectedProductId.value = '';
};

// Cargar productos disponibles
const loadAvailableProducts = () => {
  try {
    const products = JSON.parse(localStorage.getItem('inventory_products') || '[]');
    availableProducts.value = products.filter(p => p.stock > 0);
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
};

// Agregar producto a la venta
const addProductToSale = () => {
  if (!selectedProductId.value) return;
  
  const product = availableProducts.value.find(p => p.id == selectedProductId.value);
  if (!product) return;
  
  // Verificar si el producto ya está en la lista
  const existingIndex = newSale.value.productos.findIndex(p => p.id === product.id);
  
  if (existingIndex !== -1) {
    // Si ya existe, aumentar cantidad
    if (newSale.value.productos[existingIndex].cantidad < product.stock) {
      newSale.value.productos[existingIndex].cantidad++;
    } else {
      alert('No hay suficiente stock disponible');
    }
  } else {
    // Agregar nuevo producto
    newSale.value.productos.push({
      id: product.id,
      nombre: product.nombre,
      precio: product.precioVenta,
      cantidad: 1,
      stockDisponible: product.stock
    });
  }
  
  selectedProductId.value = '';
};

// Aumentar cantidad
const increaseQuantity = (index) => {
  const item = newSale.value.productos[index];
  if (item.cantidad < item.stockDisponible) {
    item.cantidad++;
  } else {
    alert('No hay suficiente stock disponible');
  }
};

// Disminuir cantidad
const decreaseQuantity = (index) => {
  const item = newSale.value.productos[index];
  if (item.cantidad > 1) {
    item.cantidad--;
  }
};

// Eliminar producto
const removeProduct = (index) => {
  newSale.value.productos.splice(index, 1);
};

// Calcular total
const calculateTotal = () => {
  return newSale.value.productos.reduce((sum, item) => sum + (item.precio * item.cantidad), 0).toFixed(2);
};

// Guardar venta
const saveSale = () => {
  try {
    // Obtener ventas existentes
    const ventas = JSON.parse(localStorage.getItem('sales') || '[]');
    
    // Generar número de boleta
    const boletaNumber = `B001-${String(ventas.length + 1).padStart(6, '0')}`;
    
    // Crear objeto de venta
    const venta = {
      id: Date.now(),
      boleta: boletaNumber,
      cliente: newSale.value.cliente,
      dni: newSale.value.dni || 'Sin documento',
      productos: newSale.value.productos,
      productosTexto: newSale.value.productos.map(p => `${p.cantidad}x ${p.nombre}`).join(', '),
      cantidadProductos: newSale.value.productos.reduce((sum, p) => sum + p.cantidad, 0),
      total: parseFloat(calculateTotal()),
      metodoPago: newSale.value.metodoPago,
      fecha: new Date().toISOString(),
      fechaTexto: new Date().toLocaleDateString('es-PE'),
      hora: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
      estado: 'Completada'
    };
    
    // Agregar venta
    ventas.unshift(venta);
    localStorage.setItem('sales', JSON.stringify(ventas));
    
    // Actualizar stock de productos
    updateProductStock(newSale.value.productos);
    
    // Agregar al historial del cliente
    addToCustomerHistory(venta);
    
    // Disparar evento de actualización
    window.dispatchEvent(new CustomEvent('sales-updated'));
    
    alert(`Venta registrada exitosamente\nBoleta: ${boletaNumber}`);
    closeSaleModal();
  } catch (error) {
    console.error('Error al guardar venta:', error);
    alert('Error al registrar la venta');
  }
};

// Actualizar stock de productos
const updateProductStock = (productosVendidos) => {
  try {
    const products = JSON.parse(localStorage.getItem('inventory_products') || '[]');
    
    productosVendidos.forEach(vendido => {
      const product = products.find(p => p.id === vendido.id);
      if (product) {
        product.stock -= vendido.cantidad;
      }
    });
    
    localStorage.setItem('inventory_products', JSON.stringify(products));
    window.dispatchEvent(new CustomEvent('product-updated'));
  } catch (error) {
    console.error('Error al actualizar stock:', error);
  }
};

// Agregar al historial del cliente
const addToCustomerHistory = (venta) => {
  try {
    const history = JSON.parse(localStorage.getItem('customer_history') || '[]');
    
    const customerRecord = {
      id: Date.now(),
      cliente: venta.cliente,
      dni: venta.dni,
      boleta: venta.boleta,
      total: venta.total,
      productos: venta.productosTexto,
      fecha: venta.fechaTexto,
      hora: venta.hora
    };
    
    history.unshift(customerRecord);
    if (history.length > 50) history.pop();
    
    localStorage.setItem('customer_history', JSON.stringify(history));
    window.dispatchEvent(new CustomEvent('customer-history-updated'));
  } catch (error) {
    console.error('Error al agregar al historial:', error);
  }
};

// Exponer función para que SalesTable pueda abrir el modal
defineExpose({
  openSaleModal
});

onMounted(() => {
  // Inicializar localStorage si no existe
  if (!localStorage.getItem('sales')) {
    localStorage.setItem('sales', JSON.stringify([]));
  }
  if (!localStorage.getItem('customer_history')) {
    localStorage.setItem('customer_history', JSON.stringify([]));
  }
});
</script>

<style scoped>
.sales-view {
  padding: 32px;
  background: #f9fafb;
  min-height: 100vh;
}

.sales-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 24px;
  margin-bottom: 24px;
}

.main-section {
  min-width: 0;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.sale-modal {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #6b7280;
  line-height: 1;
}

.modal-body {
  padding: 24px;
}

.sale-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.form-control {
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.total-input {
  font-weight: 700;
  font-size: 18px;
  color: #10b981;
  background: #f0fdf4;
}

.products-list {
  background: #f9fafb;
  padding: 16px;
  border-radius: 8px;
}

.products-list h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.product-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-info strong {
  font-size: 14px;
  color: #1f2937;
}

.product-info span {
  font-size: 13px;
  color: #6b7280;
}

.product-quantity {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.qty-btn:hover {
  background: #f9fafb;
  border-color: #3b82f6;
}

.qty-input {
  width: 50px;
  text-align: center;
  padding: 4px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
}

.product-subtotal {
  font-weight: 600;
  color: #10b981;
  min-width: 80px;
  text-align: right;
}

.btn-remove-product {
  background: #fee2e2;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-remove-product:hover {
  background: #fecaca;
}

.btn-remove-product svg {
  width: 16px;
  height: 16px;
  stroke: #ef4444;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.btn-primary, .btn-secondary {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: white;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.btn-secondary:hover {
  background: #f9fafb;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .product-item {
    flex-wrap: wrap;
  }
}
</style>
