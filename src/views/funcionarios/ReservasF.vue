<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="10" lg="12" xl="5">
        <h2 style="color: #eff8f6">
          <strong> REGISTRAR O MODIFICAR RESERVAS </strong>
        </h2>
        <p class="mb-12">
          Selecciona una de las reservas en la lista para ver su información
        </p>

        <v-text-field
                v-model="form.busqueda"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Busca aqui por cualquier información de la reserva *"
                hint="Ingrese aquí cualquier información que esta asociada a la reserva"
              >
        </v-text-field>
        <v-row>
          <v-col cols="12" sm="6" md="6" lg="9" xl="6" class="pt-0">
            <v-alert v-if="listarReservas.length == 0" dense type="info" color="#E32222" prominent border="left">
              No se encontraron datos registrados
            </v-alert>
            <v-data-table
              v-else
              :items="listarReservas"
              :headers="headers"
              color="#FF7171"
              dense
            >
              <template #item="{ item, index }">
                <tr @click="info(item, index)">
                  <td>{{ item.idReserva }}</td>
                  <td>{{ item.id_parqueadero }}</td>
                  <td>{{ item.cedulaCli }}</td>
                  <td>{{ item.fechaHoraIngreso }}</td>
                  <td>{{ item.fechaHoraSalida }}</td>
                  <td>{{ item.fechaReserva }}</td>
                  <td>{{ item.costo }}</td>
                  <td>
                    <v-btn v-if="item.cerrar" @click="cerrar(index)" fab x-small icon>
                      <v-icon>mdi-close-circle-outline</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>

          </v-col>
          <v-col cols="12" sm="6" md="6" lg="3" xl="6" class="pt-0">
            <v-form ref="form">
              <v-text-field
                v-model="form.idReserva"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Id de la reserva *"
                hint="Ingrese aquí el id de la reserva"
                :rules="[(v) => !!v || 'Este campo es requerido']"
              >
              </v-text-field>
              
              <v-text-field
                v-model="form.id_parqueadero"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Id del parqueadero *"
                hint="Ingrese aquí el id del parqueaderos"
                :rules="[(v) => !!v || 'Este campo es requerido']"
              >
              </v-text-field>
              <v-text-field
                v-model="form.cedulaCli"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Cédula del cliente *"
                hint="Ingrese aquí la cédula cliente" 
                :rules="[(v) => !!v || 'Este campo es requerido']"
              >
              </v-text-field>
              <v-menu
                v-model="menuHoraIngreso"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="form.fechaHoraIngreso"
                    color="#eff8f6"
                    rounded
                    outlined
                    dense
                    dark
                    label="Hora de ingreso *"
                    hint="Ingrese aquí la hora de ingreso al parqueadero"
                    :rules="[(v) => !!v || 'Este campo es requerido']"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="form.fechaHoraIngreso"
                  format="24hr"
                  @input="menuHoraIngreso = false"
                ></v-time-picker>
              </v-menu>

              <v-menu
                v-model="menuHora"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="form.fechaHoraSalida"
                    color="#eff8f6"
                    rounded
                    outlined
                    dense
                    dark
                    label="Hora de salida *"
                    hint="Ingrese aquí la hora de salida del parqueadero"
                    :rules="[(v) => !!v || 'Este campo es requerido']"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="form.fechaHoraSalida"
                  format="24hr"
                  @input="menuHora = false"
                ></v-time-picker>
              </v-menu>
              
              <v-menu
                v-model="menuFecha"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="form.fechaReserva"
                    color="#eff8f6"
                    rounded
                    outlined
                    dense
                    dark
                    label="Fecha de reserva al parqueadero *"
                    hint="Ingrese aquí el número de parqueaderos"
                    :rules="[(v) => !!v || 'Este campo es requerido']"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.fechaReserva"
                  @input="menuFecha = false"
                ></v-date-picker>
              </v-menu>
              <v-text-field
                v-model="form.costo"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Costo de la reserva*"
                hint="Ingrese aquí el costo total de la reserva"
                :rules="[(v) => !!v || 'Este campo es requerido']"
              >
              </v-text-field>
              
            </v-form>

            <v-btn
              :loading="loading"
              @click="guardar()"
              class="mt-0"
              block
              rounded
              dark
              color="#B01A1A"
            >
              <strong> REGISTRAR o Modificar</strong>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

     <v-overlay :value="loadingTable">
      <v-progress-circular color="#310273" indeterminate size="150"></v-progress-circular>
    </v-overlay>


  </div>
</template>
<script>
import alert from "@/mixins/alert";
export default {
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
          listarReservas: [
              { idReserva: '1',id_parqueadero: "65", cedulaCli: "1001212873974", fechaHoraIngreso: "11:00", fechaHoraSalida: "12:00", fechaReserva: "2023-05-15", costo: "20000",  cerrar: false },
              { idReserva: 'Sede 2', cerrar: false },
              { idReserva: 'Sede 3', cerrar: true },
              // Agrega más datos por defecto según sea necesario
          ],
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
