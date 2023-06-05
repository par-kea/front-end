<template>
  <div class="container">
    <div class="map-column">
      <!-- <label>
        <gmap-autocomplete
          :options="autocompleteOptions"
          @place_changed="initMarker"
          style="color: white;"
          DARK
        ></gmap-autocomplete>
        <br />

        <div class="button-container">
          <v-btn
            :loading="loading"
            class="mt-0"
            block
            rounded
            dark
            @click="addLocationMarker"
            color="#B01A1A"
          >
            <strong> BUSCA AQUÍ</strong>
          </v-btn>
        </div>
      </label> -->

      <!-- <gmap-map
        :zoom="mapZoom"
        :center="center"
        :options="mapOptions"
        style="width: 100%; height: 100%;"
      >
        <gmap-marker
          :key="index"
          v-for="(m, index) in locationMarkers"
          :position="m.position"
          @click="centerMap(m.position)"
        ></gmap-marker>
      </gmap-map> -->
    </div>
    <div class="card-column">
      <h3>Parqueaderos</h3>
      <div class="text-field-container">
        <v-text-field
          v-model="filtroCiudad"
          label="Filtrar por ciudad, calle o nombre"
          rounded
          outlined
          dense
          dark
        ></v-text-field>
      </div>

      <div
        v-for="(m, index) in filteredMarkers"
        :key="index"
        class="card"
        @click="moveToCity(m.position)"
      >
        <div class="card-header">
          <h4 class="card-title">{{ m.name }}</h4>
        </div>
        <div class="card-body">
          <p class="card-text">Ciudad: {{ m.ciudad }}</p>
          <p class="card-text">Dirección: {{ m.direccion }}</p>
        </div>
        <div class="card-footer">
          <template>
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <button class="reserve-button" v-on="on">Reservar</button>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">User Profile</span>
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    class="form-field"
                    label="Placa del carro"
                    v-model="placaCarro"
                    v-mask="'VVV-###'"
                    :rules="[
                      (v) => /^[A-Za-z]{3}-[0-9]{3}$/.test(v) || 'Formato incorrecto. El formato debe ser: XYZ-###, verifica que si tengas solo letras en los primeros 3 digitos y solo numeros en los ultimos 3 digitos'
                    ]"
                  ></v-text-field><br><br><br>

                  <v-text-field
                    class="form-field"
                    label="Fecha completa con hora de entrada en formato: ##/##/#### ##:##"
                    v-model="fechaEntrada"
                    v-mask="'##/##/#### ##:##'"
                    hint="Ingrese aquí la fecha que quieres que comience tu reserva."
                    :rules="[
                      (v) => /^(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2})$/.test(v) || 'Formato incorrecto. El formato debe ser el siguiente: ##/##/#### ##:##',
                      (v) => validarFecha(v) || 'Fecha inválida. Recuerda que la fecha debe ser posterior a la fecha actual.',
                      (v) => validarHora(v) || 'La hora debe ser posterior a la hora actual.',
                      (v) => /^([0-2]\d|3[0-1])\/([0-1]\d|1[0-2])\/\d{4} \d{2}:\d{2}$/.test(v) || 'Día inválido. El día debe estar entre 01 y 31.',
                      (v) => /^([0-2]\d|3[0-1])\/([0]\d|1[0-2])\/\d{4} \d{2}:\d{2}$/.test(v) || 'Mes inválido. El mes debe estar entre 01 y 12.',
                      (v) => /^(?:[0-2]\d|3[0-1])\/(?:[0]\d|1[0-2])\/\d{4} (?:[01]\d|2[0-4]):(?:[0-5]\d|60)$/.test(v) || 'Hora inválida. La hora debe estar entre 00 y 24.',
                      (v) => /^([0-2]\d|3[0-1])\/([0]\d|1[0-2])\/\d{4} \d{2}:(?:[0-5]\d|60)$/.test(v) || 'Minuto inválido. El minuto debe estar entre 00 y 60.',
                      (v) => {
                        if (!fechaSalida) return true; // Espera hasta que se ingrese la fecha de salida
                        return esFechaEntradaMenorSalida(v, fechaSalida) || 'La fecha y hora de entrada deben ser menores a la fecha y hora de salida.';
                      }
                    ]"
                  ></v-text-field><br><br><br>

                  <v-text-field
                    class="form-field"
                    label="Fecha completa con hora de salida en formato: ##/##/#### ##:##"
                    v-model="fechaSalida"
                    v-mask="'##/##/#### ##:##'"
                    hint="Ingrese aquí la fecha que quieres que termine tu reserva."
                    :rules="[
                      (v) => /^(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2})$/.test(v) || 'Formato incorrecto. El formato debe ser el siguiente: ##/##/#### ##:##',
                      (v) => validarFecha(v) || 'Fecha inválida. Recuerda que la fecha debe ser posterior a la fecha actual.',
                      (v) => validarHora(v) || 'La hora debe ser posterior a la hora actual.',
                      (v) => /^([0-2]\d|3[0-1])\/([0-1]\d|1[0-2])\/\d{4} \d{2}:\d{2}$/.test(v) || 'Día inválido. El día debe estar entre 01 y 31.',
                      (v) => /^([0-2]\d|3[0-1])\/([0]\d|1[0-2])\/\d{4} \d{2}:\d{2}$/.test(v) || 'Mes inválido. El mes debe estar entre 01 y 12.',
                      (v) => /^(?:[0-2]\d|3[0-1])\/(?:[0]\d|1[0-2])\/\d{4} (?:[01]\d|2[0-4]):(?:[0-5]\d|60)$/.test(v) || 'Hora inválida. La hora debe estar entre 00 y 24.',
                      (v) => {
                        if (!fechaEntrada) return true; // Espera hasta que se ingrese la fecha de entrada
                        return esFechaSalidaMayorEntrada(v, fechaEntrada) || 'La fecha y hora de salida deben ser mayores a la fecha y hora de entrada.';
                      }
                    ]"
                  ></v-text-field><br><br><br>
                  <v-btn @click="calcularPrecio" color="primary">Calcular Precio</v-btn><br><br><br>

                  <v-text-field
  class="form-field"
  label="Precio de la reserva"
  :value="precioReserva"
  readonly
></v-text-field>

                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <button class="reserve-button" @click="dialog = false">Close</button>
                  <span class="button-margin"></span> <!-- Agregar espacio/margen -->
                  <button class="reserve-button" @click="dialog = false">Save</button>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTheMask from 'vue-the-mask';
export default {
  name: "AddGoogleMap",
  data() {
    return {
      fechaEntrada: '',
      fechaSalida: '',
      precioReserva: '',
      dialog: false,
      center: {
        lat: 4.570868,
        lng: -74.297332,
      },
      locationMarkers: [
        {
          name: "Ubicación en Medellín",
          ciudad: "Medellín",
          direccion: "La Candelaria, Medellín, La Candelaria, Medellín, Antioquia",
          position: { lat: 6.244203, lng: -75.581211 },
        },
        {
          name: "Ubicación en Bogotá",
          ciudad: "Bogotá",
          direccion: "Avenida 19, Usaquén, Bogotá, Cundinamarca",
          position: { lat: 4.648625, lng: -74.101620 },
        },
        {
          name: "Ubicación en Barranquilla",
          ciudad: "Barranquilla",
          direccion: "Cra. 15 #28-2 a 28-92, Santa Elena, Barranquilla, Atlántico",
          position: { lat: 10.987848, lng: -74.788981 },
        },
      ],
      locPlaces: [],
      existingPlace: null,
      mapOptions: {
        restriction: {
          latLngBounds: {
            north: 13.723432,
            south: -4.227064,
            east: -66.934570,
            west: -81.734493,
          },
          strictBounds: true,
        },
      },
      autocompleteOptions: {
        componentRestrictions: { country: "CO" },
      },
      filtroCiudad: "",
      mapZoom: 0,
    };
  },
  created() {
    const ahora = new Date();
    const hora = ahora.getHours();
    const minutos = ahora.getMinutes();
    this.horaActual = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
  },

  computed: {
    filteredMarkers() {
      if (this.filtroCiudad.trim() === "") {
        return this.locationMarkers;
      } else {
        const filtro = this.filtroCiudad.trim().toLowerCase();
        return this.locationMarkers.filter((marker) => {
          const ciudad = marker.ciudad.toLowerCase();
          const direccion = marker.direccion.toLowerCase();
          const nombre = marker.name.toLowerCase();
          return (
            ciudad.includes(filtro) ||
            direccion.includes(filtro) ||
            nombre.includes(filtro)
          );
        });
      }
    },
  },

  mounted() {
    this.locateGeoLocation();
  },

  methods: {
    guardar() {
      // Convertir la fecha al formato datetime adecuado antes de enviarla al backend
      const fechaDateTime = new Date(this.fechaEntrada);

      // Aquí envías `fechaDateTime` al backend y lo guardas
      // ...
    },
    initMarker(loc) {
      this.existingPlace = loc;
    },
    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          name: this.existingPlace.name,
          ciudad: this.existingPlace.ciudad,
          direccion: this.existingPlace.direccion,
          position: {
            lat: this.existingPlace.geometry.location.lat(),
            lng: this.existingPlace.geometry.location.lng(),
          },
        };
        this.locPlaces.push(this.existingPlace);
        this.center = marker.position;
        this.mapZoom = 14;
        this.existingPlace = null;
      }
    },
    locateGeoLocation: function () {
      navigator.geolocation.getCurrentPosition((res) => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude,
        };
        this.mapZoom = 0;
      });
    },
    moveToCity(position) {
      this.center = position;
      this.mapZoom = 18;
    },
    centerMap(position) {
      this.center = position;
      this.mapZoom = 14;
    },
    validarFecha(fecha) {
      const ahora = new Date();
      const diaActual = ahora.getDate();
      const mesActual = ahora.getMonth() + 1; 
      const anioActual = ahora.getFullYear();
      const horaActual = ahora.getHours();
      const minutoActual = ahora.getMinutes();

      const dia = parseInt(fecha.substr(0, 2), 10);
      const mes = parseInt(fecha.substr(3, 2), 10);
      const anio = parseInt(fecha.substr(6, 4), 10);
      const hora = parseInt(fecha.substr(11, 2), 10);
      const minuto = parseInt(fecha.substr(14, 2), 10);

      if (anio > anioActual) {
        return true;
      } else if (anio === anioActual && mes > mesActual) {
        return true;
      } else if (anio === anioActual && mes === mesActual && dia >= diaActual) {
        return true;
      } else if (
        anio === anioActual &&
        mes === mesActual &&
        dia === diaActual &&
        (
          (hora > horaActual) ||
          (hora === horaActual && (minuto > minutoActual))
        )
      ) {
        return true;
      }

      return false;
    },
    validarHora(fecha) {
  const ahora = new Date();
  const horaActual = ahora.getHours();
  const minutoActual = ahora.getMinutes();

  const hora = parseInt(fecha.substr(11, 2), 10);
  const minuto = parseInt(fecha.substr(14, 2), 10);

  if (hora > horaActual || (hora === horaActual && minuto > minutoActual)) {
    return true;
  }

  return false;
},
esFechaEntradaMenorSalida(fechaEntrada, fechaSalida) {
    const fechaEntradaTimestamp = Date.parse(fechaEntrada);
    const fechaSalidaTimestamp = Date.parse(fechaSalida);
    return fechaEntradaTimestamp < fechaSalidaTimestamp;
  },

  esFechaSalidaMayorEntrada(fechaSalida, fechaEntrada) {
    const fechaSalidaTimestamp = Date.parse(fechaSalida);
    const fechaEntradaTimestamp = Date.parse(fechaEntrada);
    return fechaSalidaTimestamp > fechaEntradaTimestamp;
  },
  calcularPrecio() {
    const diffMinutes = Math.abs(new Date(this.fechaSalida) - new Date(this.fechaEntrada)) / 60000;
    this.precioReserva = (diffMinutes * 120 + 10000).toFixed(2);
  }
  },
  directives: {
    mask: VueTheMask.directive
  },
  
};
</script>

  <style scoped>
  .container {
    display: flex;
    height: 1000px;
    justify-content: flex-start;
  }
  
  .map-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
  
  .card-column {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
  }
  
  .card {
    background-color: #f0f0f0;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  
  .card-header {
    background-color: #ccc;
    padding: 10px;
    border-radius: 5px 5px 0 0;
  }
  
  .card-body {
    padding: 10px;
  }
  
  .card-title {
    color: #000;
  }
  
  .card-text {
    color: #000;
  }
  
  .card-footer {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 0 0 5px 5px;
    text-align: right;
  }
  
  .reserve-button {
    background-color: #b01a1a;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .button-container {
    width: 100px;
    margin-left: 230px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 13px;
    margin-bottom: 3px;
  }
  
  .text-field-container {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .gm-control-active {
    box-shadow: none !important;
  }
  
  .gm-style .gm-style-iw-c {
    padding: 0 !important;
  }
  
  .gm-style .gm-style-iw-t::after,
  .gm-style .gm-style-iw-t::before {
    display: none !important;
  }
  
  .gm-style .gm-style-iw-d {
    overflow: auto !important;
    padding: 10px !important;
  }
  
  .gm-style .gm-style-iw-d::after,
  .gm-style .gm-style-iw-d::before {
    display: none !important;
  }
  
  .gm-style .gm-style-iw-t {
    background-color: #fff !important;
    border-radius: 5px !important;
    padding: 10px !important;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3) !important;
    overflow: visible !important;
  }
  
  .gm-style .gm-style-iw-c button {
    display: none !important;
  }
  
  .gm-fullscreen-control {
    display: none !important;
  }
  .form-field {
  height: 1px;
}
.button-margin {
    margin-right: 10px; /* Ajusta el valor según sea necesario */
  }
  </style>
  