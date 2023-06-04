<template>
  <div>
    <v-row class="mb-0 pb-0" justify="center">
      <v-col cols="12" sm="10" md="10" lg="8" xl="5" class="mb-0 pb-0">
        <h2 style="color: #ef9a71">
          <strong> HISTORIAL DEL PACIENTE </strong>
        </h2>
        <p class="mb-8">Historial de su mascota</p>
      </v-col>
    </v-row>
    <v-row class="mt-0 pb-0" justify="center">
      <v-col cols="12" sm="10" md="10" lg="8" xl="5" class="mt-0 pt-0">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Fecha</th>
                <th class="text-left">Hora</th>
                <th class="text-left">Motivo</th>
                <th class="text-left">Médico</th>
                <th class="text-left">Tratamiento</th>
                <th class="text-left">Diagnóstico</th>
                <th class="text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in listaHistorial" :key="item.name">
                <td class="text-left">{{ item.fecha_cita }}</td>
                <td class="text-left">{{ item.hora }}</td>
                <td class="text-left">{{ item.motivo }}</td>
                <td class="text-left">{{ item.id_medico.nombre_medico }}</td>
                <td class="text-left">{{ item.tratamiento }}</td>
                <td class="text-left">{{ item.diagnostico }}</td>
                <td class="text-left">
                  <v-chip
                    v-if="item.tratamiento == null && item.diagnostico == null"
                    color="#ef9a71"
                    small
                    dark
                  >
                    pendiente
                  </v-chip>
                  <v-chip v-else color="#6b6a6a" small dark> Finalizado </v-chip>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

  <v-overlay :value="loadingTable">
      <v-progress-circular
        color="#310273"
        indeterminate
        size="80"
      ></v-progress-circular>
    </v-overlay>

  </div>
</template>

<script>
export default {
  data() {
    return {
      listaHistorial: [],
      cc: null,
      loadingTable: false
    };
  },
  methods: {
    listarHistorialPaciente() {
      this.loadingTable = true;
      fetch(process.env.VUE_APP_API_URL + "cita/"+this.cc)
        .then((resp) => resp.json())
        .then((data) => {
          this.listaHistorial = data;
          this.loadingTable = false;
        })
        .catch((error) => {
          this.loadingTable = false;
          console.log(error);
        });
    },
  },
  mounted() {
    this.listarHistorialPaciente();
  },
  created() {
    this.cc = localStorage.getItem('cedula');
  }
};
</script>

<style scoped>
.v-event-draggable {
  padding-left: 6px;
}

.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}

.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;
}

.v-event-drag-bottom::after {
  display: none;
  position: absolute;
  left: 50%;
  height: 4px;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  width: 16px;
  margin-left: -8px;
  opacity: 0.8;
  content: "";
}

.v-event-drag-bottom:hover::after {
  display: block;
}
</style>
