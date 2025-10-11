<template>
  <div class="suppliers-view">
    <!-- Modal de Nuevo Proveedor -->
    <div v-if="showSupplierModal" class="modal-overlay" @click.self="closeSupplierModal">
      <div class="modal-content supplier-modal">
        <div class="modal-header">
          <h3>{{ editingSupplier ? $t('suppliers.editSupplier') : $t('suppliers.newSupplier') }}</h3>
          <button class="close-button" @click="closeSupplierModal">&times;</button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="saveSupplier" class="supplier-form">
            <div class="form-row">
              <div class="form-group">
                <label>Nombre del Proveedor *</label>
                <input v-model="newSupplier.nombre" type="text" required placeholder="Ej: Distribuidora San Miguel" class="form-control">
              </div>
              <div class="form-group">
                <label>RUC *</label>
                <input v-model="newSupplier.ruc" type="text" required placeholder="20123456789" class="form-control" maxlength="11">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Categoría *</label>
                <select v-model="newSupplier.categoria" required class="form-control">
                  <option value="">Seleccionar categoría</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Limpieza">Limpieza</option>
                  <option value="Electrónicos">Electrónicos</option>
                  <option value="Ropa">Ropa</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>
              <div class="form-group">
                <label>Descuento (%)</label>
                <input v-model.number="newSupplier.descuento" type="number" min="0" max="100" placeholder="0" class="form-control">
              </div>
            </div>

            <div class="form-section-title">Información de Contacto</div>

            <div class="form-row">
              <div class="form-group">
                <label>Nombre del Contacto *</label>
                <input v-model="newSupplier.contactoNombre" type="text" required placeholder="Ej: Carlos Mendoza" class="form-control">
              </div>
              <div class="form-group">
                <label>Email *</label>
                <input v-model="newSupplier.contactoEmail" type="email" required placeholder="contacto@empresa.com" class="form-control">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Teléfono *</label>
                <input v-model="newSupplier.telefono" type="tel" required placeholder="999 999 999" class="form-control">
              </div>
              <div class="form-group">
                <label>Dirección</label>
                <input v-model="newSupplier.direccion" type="text" placeholder="Dirección del proveedor" class="form-control">
              </div>
            </div>

            <div class="form-group">
              <label>Notas</label>
              <textarea v-model="newSupplier.notas" placeholder="Información adicional sobre el proveedor..." class="form-control" rows="3"></textarea>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="closeSupplierModal">Cancelar</button>
              <button type="submit" class="btn-primary">
                {{ editingSupplier ? 'Actualizar' : 'Registrar' }} Proveedor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="suppliers-header">
      <div>
        <h1 class="page-title">Proveedores</h1>
        <p class="page-subtitle">Gestiona tus proveedores, negocia precios y controla órdenes de compra desde una sola plataforma</p>
      </div>
      <div class="header-actions">
        <button class="btn-export" @click="exportSuppliers">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Exportar
        </button>
        <button class="btn-new" @click="openNewSupplierModal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nuevo Proveedor
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <SuppliersStats />

    <!-- Suppliers Table -->
    <SuppliersTable />

    <!-- Quick Actions -->
    <QuickActionsSuppliers />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SuppliersStats from '../components/SuppliersStats.vue';
import SuppliersTable from '../components/SuppliersTable.vue';
import QuickActionsSuppliers from '../components/QuickActionsSuppliers.vue';

const showSupplierModal = ref(false);
const editingSupplier = ref(null);

const newSupplier = ref({
  nombre: '',
  ruc: '',
  categoria: '',
  descuento: 0,
  contactoNombre: '',
  contactoEmail: '',
  telefono: '',
  direccion: '',
  notas: ''
});

// Abrir modal de nuevo proveedor
const openNewSupplierModal = () => {
  editingSupplier.value = null;
  resetForm();
  showSupplierModal.value = true;
};

// Cerrar modal
const closeSupplierModal = () => {
  showSupplierModal.value = false;
  resetForm();
};

// Resetear formulario
const resetForm = () => {
  newSupplier.value = {
    nombre: '',
    ruc: '',
    categoria: '',
    descuento: 0,
    contactoNombre: '',
    contactoEmail: '',
    telefono: '',
    direccion: '',
    notas: ''
  };
};

// Guardar proveedor
const saveSupplier = () => {
  try {
    const suppliers = JSON.parse(localStorage.getItem('suppliers') || '[]');
    
    if (editingSupplier.value) {
      // Editar proveedor existente
      const index = suppliers.findIndex(s => s.id === editingSupplier.value.id);
      if (index !== -1) {
        suppliers[index] = {
          ...suppliers[index],
          nombre: newSupplier.value.nombre,
          ruc: newSupplier.value.ruc,
          categoria: newSupplier.value.categoria,
          descuento: newSupplier.value.descuento,
          contacto: {
            nombre: newSupplier.value.contactoNombre,
            email: newSupplier.value.contactoEmail,
            telefono: newSupplier.value.telefono
          },
          direccion: newSupplier.value.direccion,
          notas: newSupplier.value.notas,
          fechaActualizacion: new Date().toISOString()
        };
      }
    } else {
      // Crear nuevo proveedor
      const idCode = `PRV${String(suppliers.length + 1).padStart(3, '0')}`;
      
      const supplier = {
        id: Date.now(),
        idCode: idCode,
        nombre: newSupplier.value.nombre,
        ruc: newSupplier.value.ruc,
        categoria: newSupplier.value.categoria,
        descuento: newSupplier.value.descuento,
        contacto: {
          nombre: newSupplier.value.contactoNombre,
          email: newSupplier.value.contactoEmail,
          telefono: newSupplier.value.telefono
        },
        direccion: newSupplier.value.direccion,
        notas: newSupplier.value.notas,
        ordenes: 0,
        estado: 'Activo',
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
      };
      
      suppliers.unshift(supplier);
    }
    
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
    
    // Disparar evento para actualizar el dashboard y otras vistas
    window.dispatchEvent(new CustomEvent('supplier-updated'));
    window.dispatchEvent(new CustomEvent('suppliers-updated'));
    
    alert(editingSupplier.value ? 'Proveedor actualizado exitosamente' : 'Proveedor registrado exitosamente');
    closeSupplierModal();
  } catch (error) {
    console.error('Error al guardar proveedor:', error);
    alert('Error al guardar el proveedor');
  }
};

// Exportar proveedores
const exportSuppliers = () => {
  try {
    const suppliers = JSON.parse(localStorage.getItem('suppliers') || '[]');
    const dataStr = JSON.stringify(suppliers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `proveedores_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al exportar:', error);
    alert('Error al exportar los datos');
  }
};

// Exponer función para que SuppliersTable pueda abrir el modal
defineExpose({
  openNewSupplierModal,
  editSupplier: (supplier) => {
    editingSupplier.value = supplier;
    newSupplier.value = {
      nombre: supplier.nombre,
      ruc: supplier.ruc,
      categoria: supplier.categoria,
      descuento: supplier.descuento,
      contactoNombre: supplier.contacto.nombre,
      contactoEmail: supplier.contacto.email,
      telefono: supplier.contacto.telefono,
      direccion: supplier.direccion || '',
      notas: supplier.notas || ''
    };
    showSupplierModal.value = true;
  }
});

onMounted(() => {
  // Inicializar localStorage si no existe
  if (!localStorage.getItem('suppliers')) {
    localStorage.setItem('suppliers', JSON.stringify([]));
  }
});
</script>

<style scoped>
.suppliers-view {
  padding: 32px;
  background: #f9fafb;
  min-height: 100vh;
}

.suppliers-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
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

.header-actions {
  display: flex;
  gap: 12px;
}

.btn-export,
.btn-new {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-export {
  background: white;
  color: #666;
  border: 1px solid #e5e7eb;
}

.btn-export:hover {
  background: #f9fafb;
}

.btn-new {
  background: #3b82f6;
  color: white;
}

.btn-new:hover {
  background: #2563eb;
}

.btn-export svg,
.btn-new svg {
  width: 18px;
  height: 18px;
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

.supplier-modal {
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

.supplier-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-section-title {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-top: 8px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e5e7eb;
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

textarea.form-control {
  resize: vertical;
  font-family: inherit;
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

.btn-primary:hover {
  background: #2563eb;
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
}
</style>
