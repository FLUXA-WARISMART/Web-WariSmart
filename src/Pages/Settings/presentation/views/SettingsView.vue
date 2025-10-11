<template>
  <div class="settings-view">
    <div class="settings-header">
      <div>
        <h1 class="page-title">{{ $t('settings.title') }}</h1>
        <p class="page-subtitle">{{ $t('settings.subtitle') }}</p>
      </div>
    </div>

    <!-- Settings Grid -->
    <div class="settings-grid">
      <!-- Business Information -->
      <div class="settings-card">
        <div class="card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <h3 class="card-title">Información del Negocio</h3>
        </div>

        <div class="form-group">
          <label>Nombre del Negocio</label>
          <input type="text" v-model="businessInfo.nombre" class="form-input" />
        </div>

        <div class="form-group">
          <label>Dirección</label>
          <input type="text" v-model="businessInfo.direccion" class="form-input" />
        </div>

        <div class="form-group">
          <label>Teléfono</label>
          <input type="tel" v-model="businessInfo.telefono" class="form-input" />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="businessInfo.email" class="form-input" />
        </div>
      </div>

      <!-- Inventory Settings -->
      <div class="settings-card">
        <div class="card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          </svg>
          <h3 class="card-title">Inventario</h3>
        </div>

        <div class="toggle-group">
          <div class="toggle-item">
            <div>
              <div class="toggle-label">Alertas de Stock Bajo</div>
              <div class="toggle-description">Recibir notificaciones cuando el stock sea bajo</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="inventorySettings.alertasStockBajo" />
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>Cantidad Mínima de Alerta</label>
          <input type="number" v-model="inventorySettings.cantidadMinimaAlerta" class="form-input" />
        </div>

        <div class="toggle-group">
          <div class="toggle-item">
            <div>
              <div class="toggle-label">Códigos de Barras</div>
              <div class="toggle-description">Generar códigos automáticamente</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="inventorySettings.codigosBarras" />
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>Método de Valoración</label>
          <select v-model="inventorySettings.metodoValoracion" class="form-select">
            <option>PEPS (Primero en Entrar, Primero en Salir)</option>
            <option>UEPS (Último en Entrar, Primero en Salir)</option>
            <option>Promedio Ponderado</option>
          </select>
        </div>
      </div>

      <!-- Sales Settings -->
      <div class="settings-card">
        <div class="card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          <h3 class="card-title">Ventas</h3>
        </div>

        <div class="form-group">
          <label>Moneda</label>
          <select v-model="salesSettings.moneda" class="form-select">
            <option>MXN - Peso Mexicano</option>
            <option>USD - Dólar Americano</option>
            <option>EUR - Euro</option>
          </select>
        </div>

        <div class="form-group">
          <label>IVA (%)</label>
          <input type="number" v-model="salesSettings.iva" class="form-input" />
        </div>

        <div class="toggle-group">
          <div class="toggle-item">
            <div>
              <div class="toggle-label">Descuentos Automáticos</div>
              <div class="toggle-description">Aplicar descuentos por volumen</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="salesSettings.descuentosAutomaticos" />
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>Numeración de Facturas</label>
          <input type="text" v-model="salesSettings.numeracionFacturas" class="form-input" />
        </div>
      </div>

      <!-- Users and Permissions -->
      <div class="settings-card">
        <div class="card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <h3 class="card-title">Usuarios y Permisos</h3>
        </div>

        <div class="toggle-group">
          <div class="toggle-item">
            <div>
              <div class="toggle-label">Autenticación de Dos Factores</div>
              <div class="toggle-description">Mayor seguridad en el acceso</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="usersSettings.autenticacionDosFact" />
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>Tiempo de Sesión (minutos)</label>
          <input type="number" v-model="usersSettings.tiempoSesion" class="form-input" />
        </div>

        <div class="toggle-group">
          <div class="toggle-item">
            <div>
              <div class="toggle-label">Registro de Actividades</div>
              <div class="toggle-description">Guardar log de acciones de usuarios</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="usersSettings.registroActividades" />
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <button class="add-user-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Agregar Usuario
        </button>
      </div>

      <!-- Reports Settings -->
      <div class="settings-card">
        <div class="card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <h3 class="card-title">Reportes</h3>
        </div>

        <div class="toggle-group">
          <div class="toggle-item">
            <div>
              <div class="toggle-label">Reportes Automáticos</div>
              <div class="toggle-description">Envío diario por email</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="reportsSettings.reportesAutomaticos" />
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>Frecuencia de Envío</label>
          <select v-model="reportsSettings.frecuenciaEnvio" class="form-select">
            <option>Diario</option>
            <option>Semanal</option>
            <option>Mensual</option>
          </select>
        </div>

        <div class="form-group">
          <label>Formato de Exportación</label>
          <select v-model="reportsSettings.formatoExportacion" class="form-select">
            <option>PDF</option>
            <option>Excel</option>
            <option>CSV</option>
          </select>
        </div>

        <div class="toggle-group">
          <div class="toggle-item">
            <div>
              <div class="toggle-label">Análisis Avanzado</div>
              <div class="toggle-description">Gráficos y tendencias detalladas</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="reportsSettings.analisisAvanzado" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- System Settings -->
      <div class="settings-card">
        <div class="card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
          </svg>
          <h3 class="card-title">Sistema</h3>
        </div>

        <div class="form-group">
          <label>Zona Horaria</label>
          <select v-model="systemSettings.zonaHoraria" class="form-select">
            <option>GMT-6 (México Central)</option>
            <option>GMT-5 (México Este)</option>
            <option>GMT-7 (México Oeste)</option>
          </select>
        </div>

        <div class="form-group">
          <label>Idioma</label>
          <select v-model="systemSettings.idioma" class="form-select">
            <option>Español</option>
            <option>English</option>
            <option>Português</option>
          </select>
        </div>

        <div class="toggle-group">
          <div class="toggle-item">
            <div>
              <div class="toggle-label">Respaldo Automático</div>
              <div class="toggle-description">Copia de seguridad diaria</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="systemSettings.respaldoAutomatico" />
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <button class="backup-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Descargar Respaldo
        </button>
      </div>
    </div>

    <!-- Notifications Section -->
    <div class="notifications-section">
      <div class="section-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <h3 class="section-title">Notificaciones</h3>
      </div>

      <div class="notifications-grid">
        <div class="notification-item">
          <div>
            <div class="notification-label">Ventas Realizadas</div>
            <div class="notification-description">Notificar cuando se complete una venta</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="notifications.ventasRealizadas" />
            <span class="slider"></span>
          </label>
        </div>

        <div class="notification-item">
          <div>
            <div class="notification-label">Productos Agotados</div>
            <div class="notification-description">Alerta cuando stock llegue a cero</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="notifications.productosAgotados" />
            <span class="slider"></span>
          </label>
        </div>

        <div class="notification-item">
          <div>
            <div class="notification-label">Nuevos Proveedores</div>
            <div class="notification-description">Cuando se registre un nuevo proveedor</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="notifications.nuevosProveedores" />
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <button class="btn-cancel">Cancelar</button>
      <button class="btn-save">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
          <polyline points="17 21 17 13 7 13 7 21"/>
          <polyline points="7 3 7 8 15 8"/>
        </svg>
        Guardar Configuración
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const businessInfo = ref({
  nombre: 'Mi Tienda',
  direccion: 'Calle Principal #123, Centro',
  telefono: '+52 555 123 4567',
  email: 'contacto@mitienda.com'
});

const inventorySettings = ref({
  alertasStockBajo: true,
  cantidadMinimaAlerta: 10,
  codigosBarras: true,
  metodoValoracion: 'PEPS (Primero en Entrar, Primero en Salir)'
});

const salesSettings = ref({
  moneda: 'MXN - Peso Mexicano',
  iva: 16,
  descuentosAutomaticos: false,
  numeracionFacturas: 'FAC-'
});

const usersSettings = ref({
  autenticacionDosFact: true,
  tiempoSesion: 480,
  registroActividades: true
});

const reportsSettings = ref({
  reportesAutomaticos: true,
  frecuenciaEnvio: 'Diario',
  formatoExportacion: 'PDF',
  analisisAvanzado: false
});

const systemSettings = ref({
  zonaHoraria: 'GMT-6 (México Central)',
  idioma: 'Español',
  respaldoAutomatico: true
});

const notifications = ref({
  ventasRealizadas: true,
  productosAgotados: true,
  nuevosProveedores: false
});
</script>

<style scoped>
.settings-view {
  padding: 32px;
  background: #f9fafb;
  min-height: 100vh;
}

.settings-header {
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

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}

.settings-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.card-header svg {
  width: 24px;
  height: 24px;
  color: #3b82f6;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.form-input,
.form-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #1a1a1a;
  background: white;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #3b82f6;
}

.toggle-group {
  margin-bottom: 20px;
}

.toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.toggle-label {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.toggle-description {
  font-size: 12px;
  color: #666;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 26px;
  flex-shrink: 0;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  transition: .4s;
  border-radius: 26px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #3b82f6;
}

input:checked + .slider:before {
  transform: translateX(22px);
}

.add-user-button,
.backup-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background: white;
  color: #666;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 12px;
}

.add-user-button:hover,
.backup-button:hover {
  background: #f9fafb;
}

.add-user-button svg,
.backup-button svg {
  width: 18px;
  height: 18px;
}

.backup-button {
  color: #ef4444;
  border-color: #fecaca;
}

.backup-button:hover {
  background: #fef2f2;
}

.notifications-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.section-header svg {
  width: 24px;
  height: 24px;
  color: #3b82f6;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.notifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
}

.notification-label {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.notification-description {
  font-size: 12px;
  color: #666;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-cancel,
.btn-save {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-cancel {
  background: white;
  color: #666;
  border: 1px solid #e5e7eb;
}

.btn-cancel:hover {
  background: #f9fafb;
}

.btn-save {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #3b82f6;
  color: white;
}

.btn-save:hover {
  background: #2563eb;
}

.btn-save svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 1200px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
  
  .notifications-grid {
    grid-template-columns: 1fr;
  }
}
</style>
