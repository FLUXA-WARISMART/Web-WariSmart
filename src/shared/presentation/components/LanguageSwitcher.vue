<template>
  <div class="language-switcher">
    <button 
      :class="['lang-button', { active: currentLocale === 'es' }]"
      @click="changeLanguage('es')"
      title="Español"
    >
      ES
    </button>
    <button 
      :class="['lang-button', { active: currentLocale === 'en' }]"
      @click="changeLanguage('en')"
      title="English"
    >
      EN
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const currentLocale = computed(() => locale.value);

const changeLanguage = (lang) => {
  locale.value = lang;
  localStorage.setItem('warismart_language', lang);
  document.documentElement.lang = lang;
};
</script>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 4px;
}

.lang-button {
  padding: 6px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 40px;
}

.lang-button:hover {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.lang-button.active {
  background: white;
  color: #3b82f6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
