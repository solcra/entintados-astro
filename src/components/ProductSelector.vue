<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-2">{{ props.titulo }}</h1>
        
    <!-- Aquí metes lo que venga de Astro -->
    <div class="prose mb-6">
      <slot></slot>
    </div>
    <!-- Imagen principal -->
    <div class="mb-4">
      <img 
        v-if="imagenSeleccionada"
        :src="`/images/productos/${props.rutaUrl}/${imagenSeleccionada.archivo}`" 
        :alt="imagenSeleccionada.titulo" 
        class="rounded-xl shadow-md w-full" 
      />
      <img 
        v-else
        :src="`/images/productos/${props.rutaUrl}/${props.image}`"
        alt="Imagen de diseño" 
        class="rounded-xl shadow-md w-full" 
      />
    </div>

    <!-- Select -->
    <div class="mb-4">
      <select
        v-model="archivoSeleccionado"
        class="border p-2 rounded w-full"
      >
        <option value="" disabled>Seleccione una opción</option>
        <option 
          v-for="modelo in modelos" 
          :key="modelo.archivo" 
          :value="modelo.archivo"
        >
          {{ modelo.titulo }}
        </option>
      </select>
    </div>

    <!-- Descripción -->
    <div v-if="imagenSeleccionada?.descripcion" class="mb-4">
      <h2 class="text-xl font-semibold">Descripción</h2>
      <p class="text-gray-700">{{ imagenSeleccionada.descripcion }}</p>
    </div>

    <!-- Detalles -->
    <div v-if="imagenSeleccionada?.detalles" class="mb-4">
      <h2 class="text-xl font-semibold">Detalles</h2>
      <ul class="list-disc list-inside text-gray-700">
        <li 
          v-for="(detalle, index) in imagenSeleccionada.detalles.split('-')" 
          :key="index"
        >
          {{ detalle.trim() }}
        </li>
      </ul>
    </div>

    <!-- Precio -->
    <div v-if="imagenSeleccionada?.precio" class="mb-4">
      <h2 class="text-xl font-semibold">Precio: <span class="text-teal-700 text-2xl font-bold">{{ imagenSeleccionada.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) }}</span></h2>
    </div>
    <!-- Botón WhatsApp -->
    <div class="mt-6">
      <button 
        v-if="imagenSeleccionada"
        @click="sendToWhatsApp"
        class="bg-teal-700 hover:bg-teal-680 text-white px-4 py-2 rounded-lg w-full transition"
      >
        📩 Consultar por WhatsApp
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  titulo: String,
  descripcion: String,
  rutaUrl: String,
  image: String
})

const modelos = [
  { 
    titulo: 'Termo tapa acrílica', 
    archivo: 'termo-tapa-acrilica.webp',
    precio: 40000, 
    descripcion: 'Hecha en acero inoxidable de alta calidad, ideal para mantenerte hidratado durante tus entrenamientos en el gimnasio, clases de yoga matutinas... y seguir brillando con estilo único en cada actividad.', 
    detalles: 'Resiste bebidas frías y/o calientes. No apto para usar en el congelador - Su tapa plástica no solo asegura un cierre hermético, sino que también añade un toque de elegancia y modernidad a tu termo. - Tamaño: Alto: 25,5cm x diámetro: 7cm  - Capacidad: 750 ml' 
  },
  { 
    titulo: 'Termo con pitillo', 
    archivo: 'termo-pitillo-ajustable.webp',
    precio: 41000,
    descripcion: 'Hecho en aluminio de alta calidad, ideal para mantener tus bebidas favoritas a la temperatura perfecta durante tus actividades diarias, entrenamientos matutinos... y seguir conquistando cada momento con energía y estilo.' ,
    detalles: 'Resiste bebidas frías, conservándolas frescas. No apto para usar en el congelador - Tapa y pitillo plásticos - Su pitillo se abre y cierra fácilmente - Tiene un sistema de agarre muy práctico que te permite llevarlo contigo de manera cómoda - Tamaño: Alto: 24 cm x diámetro: 7cm - Capacidad: 600 ml'
  },
  { 
    titulo: 'Termo con gancho', 
    archivo: 'termo-con-gancho.webp',
    precio: 30000,
    descripcion: 'Hecho en material premium (aluminio) que conserva la temperatura perfecta, porque los mejores momentos se viven mejor hidratado y con estilo.' ,
    detalles: 'Resiste bebidas calientes y/o frías. No apto para usar en el congelador - Con gancho para facilitar su transporte - Tapón con goma y de rosca - Tamaño: Alto: 21cm x diámetro: 7cm - Capacidad: 600 ml'
  },
  { 
    titulo: 'Mug tintico', 
    archivo: 'mug-tintico.webp',
    precio: 20000,
    descripcion: 'Hecho en cerámica de alta calidad. Ideal para "tintear" con chismecito incluido, esas tardes de café con amigos... y seguir disfrutando cada sorbo con la paciencia y sabiduría que solo una buena conversación puede dar. ' ,
    detalles: 'Resiste bebidas calientes y/o frías. Apto para microondas - Tamaño: Alto: 5, 2 cm x diámetro: 8 cm - Capacidad: 6 onzas'
  },
  { 
    titulo: 'Mug peltre', 
    archivo: 'mug-peltre.webp',
    precio: 38000,
    descripcion: 'Hecho en acero esmaltado con acabado plateado, ideal para disfrutar tu café matutino con estilo, esas tardes de lectura relajante... y seguir apreciando cada momento con la elegancia clásica que nunca pasa de moda. Con un buen cuidado tendrás mug para rato, y si no... ¡los golpecitos le darán personalidad única!',
    detalles:'Resiste bebidas frías y/o calientes. No apto para microondas y lavavajillas - Lavar antes del primer uso - Evitar esponjas abrasivas para preservar la impresión sublimada - Tamaño: Alto: 8 cm x 8 cm de diámetro - Capacidad: 11 onzas'
  },
  { 
    titulo: 'Termo botella blanca', 
    archivo: 'termo-botella-blanca.webp',
    precio: 42000,
    descripcion: 'Hecha en acero inoxidable de doble pared, ideal para mantenerte hidratado durante largas jornadas de trabajo, sesiones de estudio nocturnas... y seguir conquistando cada desafío. Perfecto para la oficina, universidad, hogar o llevar en tu bolso favorito.' ,
    detalles: 'Doble pared en acero Inoxidable, con aislamiento térmico que mantiene la bebida fría entre 8-10 h aprox o caliente 3-4 h aprox (puede variar dependiendo condiciones climáticas) - Tapa rosca con interior plástico - Tamaño: Alto: 25 cm x diámetro: 5.5 cm - Capacidad: 500 ml'
  },
  { 
    titulo: 'Termo para carro', 
    archivo: 'termo-para-carro.webp',
    precio: 48000,
    descripcion: 'Hecho en acero inoxidable de alta calidad, ideal para disfrutar tu café matutino camino al trabajo, esos viajes largos por carretera... y seguir conquistando cada kilómetro con la energía perfecta.',
    detalles: 'Resiste bebidas frías y/o calientes. No apto para usar en el congelador - Tapa plástica a presión - Con base plástica, ideal para usar y llevar en el carro (portavasos) - Tamaño: Alto: 15 cm x diámetro: 8,5 cm - Capacidad: 450 ml'
  },
  { 
    titulo: 'Mug blanco 11 onzas', 
    archivo: 'mug-blanco-11-onzas.webp',
    precio: 22000,
    descripcion: 'Hecho en cerámica, ideal para el café en la oficina, hacer una pausa…y seguir.', 
    detalles: 'Resiste bebidas calientes y/o frías. Apto para microondas - Tamaño: Alto: 9,5 cm X diámetro: 8 cm - Capacidad: 11 onzas'
  },
  // { 
  //   titulo: 'Vaso plástico con tapa', 
  //   archivo: 'mug-blanco-11-onzas.webp',
  //   precio: 18000,
  //   descripcion: 'Hecho en polipropileno libre de BPA, ideal para disfrutar tu café camino a la oficina, esas reuniones express fuera de casa... y seguir contribuyendo al planeta con cada sorbo consciente y sostenible.', 
  //   detalles: 'Resiste bebidas frías y/o calientes. No apto para microondas y lavavajillas - Lavar antes del primer uso - No retiene sabores ni olores, conserva la temperatura ideal - Con banda protectora de silicona para mayor comodidad y seguridad - Libre de BPA y ftalatos - El cierre no es hermético, la tapa brinda protección contra salpicaduras, pero no sella     completamente - Tamaño: Alto: 10.8 cm x 8.5 cm de diámetro - Capacidad: 11 onzas'
  // },
  // { 
  //   titulo: 'Termo bala 350 ml', 
  //   archivo: 'mug-blanco-11-onzas.webp',
  //   precio: 45000,
  //   descripcion: 'Fabricado en acero inoxidable con doble aislamiento, ideal para acompañar tus mañanas productivas, aventuras urbanas... y seguir manteniendo el ritmo perfecto con cada sorbo a la temperatura ideal.', 
  //   detalles: 'Resiste bebidas frías y/o calientes. No apto para microondas, lavavajillas ni para usar en el congelador - Lavar antes del primer uso - Doble pared: Conserva la temperatura de las bebidas (calientes y frías) - Tapa interior con empaque y seguro antiderrames - Tamaño: Alto: 19.5 cm x 6.5 cm de diámetro - Capacidad: 350 ml'
  // }
]

const imagenSeleccionada = ref(null)   // 👈 arranca vacío
const archivoSeleccionado = ref('')

// Cuando cambie el select, actualizamos la imagen
watch(archivoSeleccionado, (nuevoArchivo) => {
  const modelo = modelos.find(m => m.archivo === nuevoArchivo)
  if (modelo) imagenSeleccionada.value = modelo
})

// Número de WhatsApp (cámbialo por el tuyo, con código de país sin "+" ni "00")
const phoneNumber = "573178287981"  

function sendToWhatsApp() {
  if (!imagenSeleccionada.value) return

  const currentUrl = window.location.href
  const message = `Hola, estoy interesado en el producto: *${props.titulo}*  
Estilo de termo o mug: *${imagenSeleccionada.value.titulo}*  
Enlace: ${currentUrl}`

  const encodedMessage = encodeURIComponent(message)
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  window.open(url, "_blank")
}

</script>

<script>
  export default {}
</script>