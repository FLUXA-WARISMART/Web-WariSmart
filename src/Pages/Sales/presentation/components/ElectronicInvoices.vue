<template>
  <div class="invoices-card">
    <h4 class="card-title">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
      Boletas Electrónicas
    </h4>

    <div class="invoice-info">
      <div class="last-invoice">
        <div class="invoice-label">Última boleta</div>
        <div class="invoice-number">#B001-245</div>
      </div>
      <button class="download-button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </button>
    </div>

    <button class="emit-button">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      Emitir Boleta
    </button>

    <button class="config-button">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
      </svg>
      Configurar SUNAT
    </button>
  </div>
</template>

<style scoped>
.invoices-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 20px 0;
}

.card-title svg {
  width: 20px;
  height: 20px;
  color: #3b82f6;
}

.invoice-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 16px;
}

.invoice-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.invoice-number {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}

.download-button {
  width: 36px;
  height: 36px;
  border: none;
  background: #3b82f6;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.download-button:hover {
  background: #2563eb;
}

.download-button svg {
  width: 18px;
  height: 18px;
}

.emit-button,
.config-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 12px;
}

.emit-button {
  background: #3b82f6;
  color: white;
}

.emit-button:hover {
  background: #2563eb;
}

.config-button {
  background: white;
  color: #666;
  border: 1px solid #e5e7eb;
}

.config-button:hover {
  background: #f9fafb;
}

.emit-button svg,
.config-button svg {
  width: 18px;
  height: 18px;
}
</style>
