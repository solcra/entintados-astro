<template>
  <button @click="sendToWhatsApp" class="whatsapp-btn">
    📩 Consultar por WhatsApp
  </button>
</template>

<script setup>
const { phoneNumber, productTitle } = defineProps({
  phoneNumber: { type: String, required: true },
  productTitle: { type: String, required: true }
});

function sendToWhatsApp() {
  if (typeof window === "undefined") return; // Evita errores en SSR

  const currentUrl = window.location.href;
  const message = `Hola, estoy interesado en el producto: *${productTitle}* \n\nAquí está el enlace: ${currentUrl}`;
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(url, "_blank");
}
</script>

<style scoped>
.whatsapp-btn {
  background-color: #25D366;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-family: inherit;
  transition: background 0.2s ease;
}
.whatsapp-btn:hover {
  background-color: #1ebe5d;
}
</style>