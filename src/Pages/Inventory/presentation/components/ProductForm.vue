<template>
  <div class="product-form-container">
    <h3>{{ editando ? 'Editar Producto' : 'Nuevo Producto' }}</h3>
    
    <form @submit.prevent="guardarProducto" class="form-grid">
      <!-- Código -->
      <div class="form-group">
        <label for="codigo">Código *</label>
        <input 
          id="codigo"
          v-model="producto.codigo"
          type="text" 
          required
          class="form-input"
          :disabled="editando"
        >
      </div>
      
      <!-- Nombre -->
      <div class="form-group">
        <label for="nombre">Producto *</label>
        <input 
          id="nombre"
          v-model="producto.nombre" 
          type="text" 
          required
          class="form-input"
        >
      </div>
      
      <!-- Categoría -->
      <div class="form-group">
        <label for="categoria">Categoría *</label>
        <select 
          id="categoria" 
          v-model="producto.categoria" 
          required
          class="form-input"
        >
          <option value="">Seleccionar categoría</option>
          <option v-for="cat in categorias" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
      
      <!-- Stock Actual -->
      <div class="form-group">
        <label for="stockActual">Stock Actual *</label>
        <input 
          id="stockActual"
          v-model.number="producto.stockActual" 
          type="number" 
          min="0"
          required
          class="form-input"
        >
      </div>
      
      <!-- Stock Mínimo -->
      <div class="form-group">
        <label for="stockMinimo">Stock Mínimo *</label>
        <input 
          id="stockMinimo"
          v-model.number="producto.stockMinimo" 
          type="number" 
          min="0"
          required
          class="form-input"
        >
      </div>
      
      <!-- Ubicación -->
      <div class="form-group">
        <label for="ubicacion">Ubicación *</label>
        <input 
          id="ubicacion"
          v-model="producto.ubicacion" 
          type="text" 
          required
          class="form-input"
        >
      </div>
      
      <!-- Precio -->
      <div class="form-group">
        <label for="precio">Precio *</label>
        <div class="input-with-symbol">
          <span class="currency-symbol">S/.</span>
          <input 
            id="precio"
            v-model.number="producto.precio" 
            type="number" 
            step="0.01"
            min="0"
            required
            class="form-input"
          >
        </div>
      </div>
      
      <!-- Estado -->
      <div class="form-group">
        <label for="estado">Estado *</label>
        <select 
          id="estado" 
          v-model="producto.estado" 
          required
          class="form-input"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>
      
      <!-- Descripción -->
      <div class="form-group full-width">
        <label for="descripcion">Descripción</label>
        <textarea 
          id="descripcion"
          v-model="producto.descripcion" 
          class="form-input"
          rows="3"
        ></textarea>
      </div>
      
      <!-- Botones -->
      <div class="form-actions full-width">
        <button type="button" @click="cancelar" class="btn btn-secondary">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primary">
          {{ editando ? 'Actualizar' : 'Guardar' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProductForm',
  props: {
    initialProduct: {
      type: Object,
      default: () => ({
        codigo: '',
        nombre: '',
        categoria: '',
        stockActual: 0,
        stockMinimo: 0,
        ubicacion: '',
        precio: 0,
        estado: 'activo',
        descripcion: ''
      })
    },
    editando: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      producto: { ...this.initialProduct },
      categorias: [
        'Electrónica',
        'Ropa',
        'Alimentos',
        'Bebidas',
        'Limpieza',
        'Oficina',
        'Hogar',
        'Tecnología',
        'Salud',
        'Belleza',
        'Deportes',
        'Juguetes',
        'Mascotas',
        'Otros'
      ]
    };
  },
  watch: {
    initialProduct: {
      handler(newVal) {
        this.producto = { ...newVal };
      },
      deep: true
    }
  },
  methods: {
    guardarProducto() {
      // Validar que el stock actual no sea menor que 0
      if (this.producto.stockActual < 0) {
        alert('El stock actual no puede ser negativo');
        return;
      }
      
      // Validar que el stock mínimo no sea negativo
      if (this.producto.stockMinimo < 0) {
        alert('El stock mínimo no puede ser negativo');
        return;
      }
      
      // Validar que el precio no sea negativo
      if (this.producto.precio < 0) {
        alert('El precio no puede ser negativo');
        return;
      }
      
      // Emitir el evento con el producto
      this.$emit('guardar', { ...this.producto });
    },
    cancelar() {
      this.$emit('cancelar');
    }
  },
  created() {
    // Generar un código automático si no existe
    if (!this.editando && !this.producto.codigo) {
      // Generar un código único basado en la fecha y un número aleatorio
      const timestamp = new Date().getTime().toString().slice(-6);
      const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      this.producto.codigo = `PROD-${timestamp}${randomNum}`;
    }
  }
};
</script>

<style scoped>
.product-form-container {
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

h3 {
  margin-top: 0;
  margin-bottom: 24px;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  align-items: start;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #4a5568;
  font-size: 0.875rem;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.9375rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: #fff;
}

.form-input:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.form-input[type="number"] {
  -moz-appearance: textfield;
}

.form-input[type="number"]::-webkit-outer-spin-button,
.form-input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

select.form-input {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 36px;
}

textarea.form-input {
  min-height: 100px;
  resize: vertical;
}

.input-with-symbol {
  position: relative;
}

.currency-symbol {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
  font-weight: 500;
}

.input-with-symbol .form-input {
  padding-left: 40px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #edf2f7;
}

.btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.btn-primary {
  background-color: #4299e1;
  color: white;
}

.btn-primary:hover {
  background-color: #3182ce;
}

.btn-secondary {
  background-color: #edf2f7;
  color: #4a5568;
  border-color: #e2e8f0;
}

.btn-secondary:hover {
  background-color: #e2e8f0;
}

.full-width {
  grid-column: 1 / -1;
}

/* Responsive */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
