<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="10" lg="12" xl="5">
        <h2 style="color: #eff8f6">
          <strong> RESERVAR Y BUSCAR PARQUEADEROS</strong>
        </h2>
        <p class="mb-12">
          Busca en la parte derecha un parqueadero o búscalo en el espacio especificado, puedes darle clic encima de la tarjeta y el mapa te ubicará en la dirección del parqueadero.
        </p>

        <v-row>
          
            <AddGoogleMap />
            
        </v-row>
      </v-col>
    </v-row>

     <v-overlay :value="loadingTable">
      <v-progress-circular color="#310273" indeterminate size="150"></v-progress-circular>
    </v-overlay>


  </div>
</template>
<script>
import AddGoogleMap from "../../components/AddGoogleMap";
import alert from "@/mixins/alert";
export default {
  components: {
    AddGoogleMap
  },
  mixins: [alert],
  data() {
      return {
          form: {
              busqueda: "",
              idReserva: "",
              id_parqueadero: "",
              cedulaCli: "",
              fechaHoraIngreso: "",
              fechaHoraSalida: "",
              fechaReserva: "",
              costo: "",
          },
          headers: [
            { text: 'Id reserva', value: 'idReserva' },
            { text: 'Id parqueadero', value: 'id_parqueadero' },
            { text: 'Cédula del cliente', value: 'cedulaCli' },
            { text: 'Fecha hora de ingreso', value: 'fechaHoraIngreso' },
            { text: 'Fecha hora de salida', value: 'fechaHoraSalida' },
            { text: 'Fecha reserva', value: 'fechaReserva' },
            { text: 'Costo', value: 'costo' },
            { text: '', value: '' } // Celda vacía para el botón
          ],
          loading: false,
          loadingTable: false,
          cobertura: "",          
          };
  },
  methods: {
    listarReservas() {
      this.loadingTable = true;
      fetch(process.env.VUE_APP_API_URL + "reservas")
        .then((resp) => resp.json())
        .then((data) => {
          this.loadingTable = false;
          this.listarReservas = data;
        })
        .catch((error) => {
          this.loadingTable = false;
          console.log(error);
        });
    },
    guardar() {
      if (this.$refs.form.validate()) {
        var init = {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(this.form),
          headers: {
            "Content-Type": "application/json",
          },
        };
        this.loading = true;
        fetch(process.env.VUE_APP_API_URL + "reservas", init)
          .then((response) => response.text())
          .then((text) => {
            this.loading = false;
            this.alert(text, "Muy bien", "success");
            this.$refs.form.reset();
            this.listarReservas();
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
            this.alert(
              "Error al registrar el reservas",
              "Ooop.. Error",
              "error"
            );
          });
      }
    },
    cerrar(i) {
      setTimeout(() => {
        (this.form.id = null), (this.form.idReserva = "");
        this.form.id_parqueadero = "";
        this.form.cedulaCli = "";
        this.form.fechaHoraIngreso = "";
        this.form.fechaHoraSalida = "";
        this.form.fechaReserva = "";
        this.form.costo = "";
        this.listarReservas[i].cerrar = false;
        this.$refs.form.resetValidation();
      }, 100);
    },
    info(data, i) {
      console.log(data);
      for (let j = 0; j < this.listarReservas.length; j++) {
        this.listarReservas[j].cerrar = false;
      }
      this.form.id = data.id;
      this.form.idReserva = data.idReserva;
      this.form.id_parqueadero = data.id_parqueadero;
      this.form.cedulaCli = data.cedulaCli;
      this.form.fechaHoraIngreso = data.fechaHoraIngreso;
      this.form.fechaHoraSalida = data.fechaHoraSalida;
      this.form.fechaReserva = data.fechaReserva;
      this.form.costo = data.costo;
      this.listarReservas[i].cerrar = true;
    },
    
  },
  mounted() {
    this.listarReservas();
  },
  
};
</script>
<style scoped>
.card-sedes {
  height: 235px;
  border: 1px solid #ddd;
  background: #f1f1f1;
  overflow-y: scroll;
  border-radius: 15px;
}

.divider-color {
  border-color: #FF7171;
}
</style>
