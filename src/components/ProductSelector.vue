<template>
  <div class="p-6 max-w-5xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <!-- Columna izquierda: Imagen -->
      <div>
        <img 
          v-if="imagenSeleccionada"
          :src="`/images/productos/${props.rutaUrl}/${imagenSeleccionada.archivo}`" 
          :alt="imagenSeleccionada.titulo" 
          class="w-full rounded-xl shadow-md object-cover" 
        />
        <img 
          v-else
          :src="`/images/productos/${props.rutaUrl}/${props.image}`"
          alt="Imagen de diseño" 
          class="w-full rounded-xl shadow-md object-cover" 
        />

        <!-- Select debajo de la imagen -->
        <div class="mt-4">
          <label for="modeloSelect" class="block text-sm font-medium text-gray-700 mb-1">
            Selecciona un modelo
          </label>
          <select
            id="modeloSelect" 
            v-model="archivoSeleccionado"
            class="border p-2 rounded w-full"
          >
            <option value="" disabled>Seleccione una opción</option>
            <option 
              v-for="modelo in modelos" 
              :key="modelo.modle" 
              :value="modelo.modle"
            >
              {{ modelo.titulo }}
            </option>
          </select>
        </div>
      </div>

      <!-- Columna derecha: Info del producto -->
      <div>
        <h1 class="text-3xl font-bold mb-4">{{ props.titulo }}</h1>
        
        <!-- Texto del slot -->
        <div class="prose mb-6">
          <slot></slot>
        </div>

        <!-- Descripción -->
        <div v-if="imagenSeleccionada?.descripcion" class="mb-4">
          <h2 class="text-xl font-semibold mb-1">Descripción</h2>
          <p class="text-gray-700">{{ imagenSeleccionada.descripcion }}</p>
        </div>

        <!-- Detalles -->
        <div v-if="imagenSeleccionada?.detalles" class="mb-4">
          <h2 class="text-xl font-semibold mb-1">Detalles</h2>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li 
              v-for="(detalle, index) in imagenSeleccionada.detalles.split('-')" 
              :key="index"
            >
              {{ detalle.trim() }}
            </li>
          </ul>
        </div>

        <!-- Precio -->
        <div v-if="imagenSeleccionada?.precio" class="mb-6">
          <h2 class="text-xl font-semibold">
            Precio: 
            <span class="text-teal-700 text-2xl font-bold">
              {{ imagenSeleccionada.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) }}
            </span>
          </h2>
        </div>

        <!-- Botón WhatsApp -->
        <button 
          v-if="imagenSeleccionada"
          @click="sendToWhatsApp"
          class="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-lg w-full md:w-auto transition"
        >
          📩 Consultar por WhatsApp
        </button>
      </div>
    </div>
</div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

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
    modle: 'termo-tapa-acrilica',
    precio: 40000, 
    descripcion: 'Hecha en acero inoxidable de alta calidad, ideal para mantenerte hidratado durante tus entrenamientos en el gimnasio, clases de yoga matutinas... y seguir brillando con estilo único en cada actividad.', 
    detalles: 'Resiste bebidas frías y/o calientes. No apto para usar en el congelador - Su tapa plástica no solo asegura un cierre hermético, sino que también añade un toque de elegancia y modernidad a tu termo. - Tamaño: Alto: 25,5cm x diámetro: 7cm  - Capacidad: 750 ml' 
  },
  { 
    titulo: 'Termo con pitillo', 
    archivo: 'termo-pitillo-ajustable.webp',
    modle: 'termo-pitillo-ajustable',
    precio: 41000,
    descripcion: 'Hecho en aluminio de alta calidad, ideal para mantener tus bebidas favoritas a la temperatura perfecta durante tus actividades diarias, entrenamientos matutinos... y seguir conquistando cada momento con energía y estilo.' ,
    detalles: 'Resiste bebidas frías, conservándolas frescas. No apto para usar en el congelador - Tapa y pitillo plásticos - Su pitillo se abre y cierra fácilmente - Tiene un sistema de agarre muy práctico que te permite llevarlo contigo de manera cómoda - Tamaño: Alto: 24 cm x diámetro: 7cm - Capacidad: 600 ml'
  },
  { 
    titulo: 'Termo con gancho', 
    archivo: 'termo-con-gancho.webp',
    modle: 'termo-con-gancho',
    precio: 30000,
    descripcion: 'Hecho en material premium (aluminio) que conserva la temperatura perfecta, porque los mejores momentos se viven mejor hidratado y con estilo.' ,
    detalles: 'Resiste bebidas calientes y/o frías. No apto para usar en el congelador - Con gancho para facilitar su transporte - Tapón con goma y de rosca - Tamaño: Alto: 21cm x diámetro: 7cm - Capacidad: 600 ml'
  },
  { 
    titulo: 'Mug tintico', 
    archivo: 'mug-tintico.webp',
    modle: 'mug-tintico',
    precio: 20000,
    descripcion: 'Hecho en cerámica de alta calidad. Ideal para "tintear" con chismecito incluido, esas tardes de café con amigos... y seguir disfrutando cada sorbo con la paciencia y sabiduría que solo una buena conversación puede dar. ' ,
    detalles: 'Resiste bebidas calientes y/o frías. Apto para microondas - Tamaño: Alto: 5, 2 cm x diámetro: 8 cm - Capacidad: 6 onzas'
  },
  { 
    titulo: 'Mug peltre', 
    archivo: 'mug-peltre.webp',
    modle: 'mug-peltre',
    precio: 38000,
    descripcion: 'Hecho en acero esmaltado con acabado plateado, ideal para disfrutar tu café matutino con estilo, esas tardes de lectura relajante... y seguir apreciando cada momento con la elegancia clásica que nunca pasa de moda. Con un buen cuidado tendrás mug para rato, y si no... ¡los golpecitos le darán personalidad única!',
    detalles:'Resiste bebidas frías y/o calientes. No apto para microondas y lavavajillas - Lavar antes del primer uso - Evitar esponjas abrasivas para preservar la impresión sublimada - Tamaño: Alto: 8 cm x 8 cm de diámetro - Capacidad: 11 onzas'
  },
  { 
    titulo: 'Termo botella blanca', 
    archivo: 'termo-botella-blanca.webp',
    modle: 'termo-botella-blanca',
    precio: 42000,
    descripcion: 'Hecha en acero inoxidable de doble pared, ideal para mantenerte hidratado durante largas jornadas de trabajo, sesiones de estudio nocturnas... y seguir conquistando cada desafío. Perfecto para la oficina, universidad, hogar o llevar en tu bolso favorito.' ,
    detalles: 'Doble pared en acero Inoxidable, con aislamiento térmico que mantiene la bebida fría entre 8-10 h aprox o caliente 3-4 h aprox (puede variar dependiendo condiciones climáticas) - Tapa rosca con interior plástico - Tamaño: Alto: 25 cm x diámetro: 5.5 cm - Capacidad: 500 ml'
  },
  { 
    titulo: 'Termo para carro', 
    archivo: 'termo-para-carro.webp',
    modle: 'termo-para-carro',
    precio: 48000,
    descripcion: 'Hecho en acero inoxidable de alta calidad, ideal para disfrutar tu café matutino camino al trabajo, esos viajes largos por carretera... y seguir conquistando cada kilómetro con la energía perfecta.',
    detalles: 'Resiste bebidas frías y/o calientes. No apto para usar en el congelador - Tapa plástica a presión - Con base plástica, ideal para usar y llevar en el carro (portavasos) - Tamaño: Alto: 15 cm x diámetro: 8,5 cm - Capacidad: 450 ml'
  },
  { 
    titulo: 'Mug blanco 11 onzas', 
    archivo: 'mug-blanco-11-onzas.webp',
    modle: 'mug-blanco-11-onzas',
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

// 👉 Cuando cambie el select, actualizamos la imagen y la URL
watch(archivoSeleccionado, (nuevoArchivo) => {
  console.log("Archivo seleccionado:", nuevoArchivo)
  const modelo = modelos.find(m => m.modle === nuevoArchivo)
  
  console.log("Archivo seleccionado:", modelo)
  if (modelo) {
    imagenSeleccionada.value = modelo

    // Actualizar parámetro en la URL sin recargar la página
    const url = new URL(window.location.href)
    url.searchParams.set("modelo", nuevoArchivo)
    window.history.replaceState({}, "", url)
  }
})

// 👉 Leer desde la URL si ya viene ?modelo=...
onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const modle = params.get("modelo")
  if (modle) {
    const modelo = modelos.find(m => m.modle === modle)
    console.log("Modelo desde URL:", modelo)
    if (modelo) {
      archivoSeleccionado.value = modelo.modle
      imagenSeleccionada.value = modelo
    }
  }
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