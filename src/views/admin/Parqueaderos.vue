<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="10" lg="12" xl="5">
        <h2 style="color: #eff8f6">
          <strong> REGISTRAR O MODIFICAR PARQUEADEROS </strong>
        </h2>
        <p class="mb-12">
          Selecciona un parqueadero en la lista para ver su información
        </p>

        <v-text-field
                v-model="form.busqueda"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Busca aqui por cualquier información del parqueadero *"
                hint="Ingrese aquí cualquier información que esta asociada al parqueadero"
              >
        </v-text-field>
        <v-row>
          <v-col cols="12" sm="6" md="6" lg="9" xl="6" class="pt-0">
                    <v-alert v-if="listarParqueadero.length == 0" dense type="info" color="#E32222" prominent border="left">
                        No se encontraron datos registrados
                    </v-alert>
                    <v-data-table
                      v-else
                      :items="listarParqueadero"
                      :headers="headers"
                      color="#FF7171"
                      dense
                    >
                      <template #item="{ item, index }">
                        <tr @click="info(item, index)">
                          <td>{{ item.IdParqueadero }}</td>
                          <td>{{ item.cedulaFun }}</td>
                          <td>{{ item.cobertura }}</td>
                          <td>{{ item.direccion }}</td>
                          <td>{{ item.ciudad }}</td>
                          <td>{{ item.numParqueaderos }}</td>
                          <td>{{ item.numParqueaderosO }}</td>
                          <td>{{ item.horaAtencion }}</td>
                          <td>{{ item.precioMin }}</td>
                          <td>{{ item.fide }}</td>
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
                v-model="form.IdParqueadero"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="ID del parqueadero *"
                hint="Ingrese aquí el ID del parqueadero"
                :rules="[(v) => !!v || 'Este campo es requerido']"
              >
              </v-text-field>

              <v-text-field
                v-model="form.cedulaFun"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Cédula del funcionario encargado *"
                hint="Ingrese aquí la cédula del funcionario encargado del parqueadero" 
                :rules="[(v) => !!v || 'Este campo es requerido']"
              >
              </v-text-field>

              <v-autocomplete
                v-model="form.cobertura"
               :items="opciones"
                label="Tipo de Cobertura"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                :rules="[(v) => !!v || 'Este campo es requerido']"
              ></v-autocomplete>

              <v-text-field
                v-model="form.direccion"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Dirección *"
                hint="Ingrese aquí la dirección"
                :rules="[(v) => !!v || 'Este campo es requerido']"
              >
              </v-text-field>

              <v-text-field
                v-model="form.ciudad"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Ciudad del parqueadero *"
                hint="Ingrese aquí la Ciudad del parqueadero"
                :rules="[(v) => !!v || 'Este campo es requerido']"
              >
              </v-text-field>
              
							
              <v-text-field
                v-model="form.numParqueaderos"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Numero de parqueaderos *"
                hint="Ingrese aquí el numero de parqueaderos"
                :rules="[(v) => !!v || 'Este campo es requerido']"
              >
              </v-text-field>

              <v-text-field
                v-model="form.numParqueaderosO"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Numero de parqueaderos ocupado *"
                hint="Ingrese aquí el numero de parqueaderos ocupados"
                :rules="[(v) => !!v || 'Este campo es requerido']"
              >
              </v-text-field>

              <v-text-field
                v-model="form.horaAtencion"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Horeario de atencion *"
                hint="Ingrese aquí el numero de parqueaderos"
                :rules="[(v) => !!v || 'Este campo es requerido']"
              >
              </v-text-field>

              <v-text-field
                v-model="form.precioMin"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Precio por minuto *"
                hint="Ingrese aquí el precio del minuto el el parqueadero *"
                :rules="[(v) => !!v || 'Este campo es requerido']"
              >
              </v-text-field>

              <v-text-field
                v-model="form.fide"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Fidelización *"
                hint="Ingrese aquí la fidelización de parqueadero *"
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
              <strong> REGISTRAR o MODIFICAR</strong>
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
        IdParqueadero: "",
        direccion: "",
        ciudad: "",
        cobertura: "",
        numParqueaderos: "",
        numParqueaderosO: "",
        horaAtencion: "",
        precioMin: "",
        cedulaFun: "",
        fide: "",
      },
      
      headers: [
      { text: 'Nombre', value: 'IdParqueadero' },
      { text: 'Cédula del Funcionario', value: 'cedulaFun' },
      { text: 'Cobertura', value: 'cobertura' },
      { text: 'Dirección', value: 'direccion' },
      { text: 'Ciudad', value: 'ciudad' },
      { text: 'Número de Parqueaderos', value: 'numParqueaderos' },
      { text: 'Número de Parqueaderos ocupados', value: 'numParqueaderosO' },
      { text: 'Hora de Atención', value: 'horaAtencion' },
      { text: 'Precio Mínimo', value: 'precioMin' },
      { text: 'Fidelización', value: 'fide' },
      { text: '', value: '' } // Celda vacía para el botón
    ],
      loading: false,
      loadingTable: false,
      cobertura: "",
      opciones: ["Descubierto", "Semidescubierto", "Cubierto"],
    };
  },
  computed: {
    parqueaderosFiltrados() {
      const busqueda = this.form.busqueda.toLowerCase();
      return this.listarParqueadero.filter(
        (parqueadero) =>
          parqueadero.IdParqueadero.toLowerCase().includes(busqueda) ||
          parqueadero.cedulaFun.toLowerCase().includes(busqueda) ||
          parqueadero.cobertura.toLowerCase().includes(busqueda) ||
          parqueadero.direccion.toLowerCase().includes(busqueda) ||
          parqueadero.ciudad.toLowerCase().includes(busqueda) ||
          parqueadero.numParqueaderos.toLowerCase().includes(busqueda) ||
          parqueadero.numParqueaderosO.toLowerCase().includes(busqueda) ||
          parqueadero.horaAtencion.toLowerCase().includes(busqueda) ||
          parqueadero.precioMin.toLowerCase().includes(busqueda) ||
          parqueadero.fide.toLowerCase().includes(busqueda)
      );
    },
  },
  methods: {
    listarParqueadero() {
      this.loadingTable = true;
      fetch(process.env.VUE_APP_API_URL + "Parqueadero")
        .then((resp) => resp.json())
        .then((data) => {
          this.loadingTable = false;
          this.listarParqueadero = data;
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
        fetch(process.env.VUE_APP_API_URL + "Parqueadero", init)
          .then((response) => response.text())
          .then((text) => {
            this.loading = false;
            this.alert(text, "Muy bien", "success");
            this.$refs.form.reset();
            this.listarParqueadero();
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
            this.alert(
              "Error al registrar el parqueadero",
              "Ooop.. Error",
              "error"
            );
          });
      }
    },
    cerrar(i) {
      setTimeout(() => {
        (this.form.id = null), (this.form.IdParqueadero = "");
        this.form.direccion = "";
        this.form.ciudad = "";
        this.form.cobertura = "";
        this.form.numParqueaderos = "";
        this.form.numParqueaderosO = "";
        this.form.horaAtencion = "";
        this.form.precioMin = "";
        this.form.cedulaFun = "";
        this.form.fide = "";
        this.listarParqueadero[i].cerrar = false;
        this.$refs.form.resetValidation();
      }, 100);
    },
    info(data, i) {
      console.log(data);
      for (let j = 0; j < this.listarParqueadero.length; j++) {
        this.listarParqueadero[j].cerrar = false;
      }
      this.form.id = data.id;
      this.form.IdParqueadero = data.IdParqueadero;
      this.form.direccion = data.direccion;
      this.form.ciudad = data.ciudad;
      this.form.cobertura = data.cobertura;
      this.form.numParqueaderos = data.numParqueaderos;
      this.form.numParqueaderosO = data.numParqueaderosO;
      this.form.horaAtencion = data.horaAtencion;
      this.form.precioMin = data.precioMin;
      this.form.cedulaFun = data.cedulaFun;
      this.form.fide = data.fide;
      this.listarParqueadero[i].cerrar = true;
    },
  },
  mounted() {
    this.listarParqueadero();
  },
  
  
};
</script>
<style scoped>

</style>