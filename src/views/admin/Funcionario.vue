<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="10" lg="12" xl="5">
        <h2 style="color: #eff8f6">
          <strong> REGISTRAR O MODIFICAR FUNCIONARIO </strong>
        </h2>
        <p class="mb-12">
          Selecciona un funcionario en la lista para ver su información
        </p>

        <v-text-field
                v-model="form.busqueda"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Busca aqui por cualquier información del funcionario *"
                hint="Ingrese aquí cualquier información que esta asociada al funcionario"
              >
        </v-text-field>
        <v-row>
          <v-col cols="12" sm="6" md="6" lg="9" xl="6" class="pt-0">
                    <v-alert v-if="listarfuncionario.length == 0" dense type="info" color="#E32222" prominent border="left">
                        No se encontraron datos registrados
                    </v-alert>
                    <v-data-table
                      v-else
                      :items="listarfuncionario"
                      :headers="headers"
                      color="#FF7171"
                      dense
                    >
                      <template #item="{ item, index }">
                        <tr @click="info(item, index)">
                          <td>{{ item.nombreFun }}</td>
                          <td>{{ item.contrasena }}</td>
                          <td>{{ item.cedulaFun }}</td>
                          <td>{{ item.direccion }}</td>
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
                v-model="form.nombreFun"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Nombre del funcionario *"
                hint="Ingrese aquí el ID del funcionario"
                :rules="[(v) => !!v || 'Este campo es requerido']"
              >
              </v-text-field>

              <v-text-field
                v-model="form.contrasena"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Contraseña *"
                hint="Ingrese aquí la Contraseña"
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
                label="Cédula del funcionario  *"
                hint="Ingrese aquí la cédula del funcionario del funcionario" 
                :rules="[(v) => !!v || 'Este campo es requerido']"
              >
              </v-text-field>

              <v-text-field
                v-model="form.direccion"
                color="#eff8f6"
                rounded
                outlined
                dense
                dark
                label="Ingrese aquí la dirección del funcionario*"
                hint="Ingrese aquí la dirección donde se encontrará al funcionario"
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
        nombreFun: "",
        contrasena: "",
        cedulaFun: "",
        direccion: "",
        
      },
      headers: [
      { text: 'Nombre', value: 'nombreFun' },
      { text: 'Contraseña', value: 'contrasena' },
      { text: 'Cédula del Funcionario', value: 'cedulaFun' },
      { text: 'Dirección', value: 'direccion' },
      { text: '', value: '' } // Celda vacía para el botón
    ],
      loading: false,
      loadingTable: false,
      
    };
  },
  methods: {
    listarfuncionario() {
      this.loadingTable = true;
      fetch(process.env.VUE_APP_API_URL + "funcionario")
        .then((resp) => resp.json())
        .then((data) => {
          this.loadingTable = false;
          this.listarfuncionario = data;
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
        fetch(process.env.VUE_APP_API_URL + "funcionario", init)
          .then((response) => response.text())
          .then((text) => {
            this.loading = false;
            this.alert(text, "Muy bien", "success");
            this.$refs.form.reset();
            this.listarfuncionario();
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
            this.alert(
              "Error al registrar el funcionario",
              "Ooop.. Error",
              "error"
            );
          });
      }
    },
    cerrar(i) {
      setTimeout(() => {
        (this.form.id = null), (this.form.nombreFun = "");
        this.form.contrasena = "";
        this.form.cedulaFun = "";
        this.form.direccion = "";
        this.listarfuncionario[i].cerrar = false;
        this.$refs.form.resetValidation();
      }, 100);
    },
    info(data, i) {
      console.log(data);
      for (let j = 0; j < this.listarfuncionario.length; j++) {
        this.listarfuncionario[j].cerrar = false;
      }
      this.form.id = data.id;
      this.form.nombreFun = data.nombreFun;
      this.form.contrasena = data.contrasena;
      this.form.cedulaFun = data.cedulaFun;
      this.form.direccion = data.direccion;
      this.form.fide = data.fide;
      this.listarfuncionario[i].cerrar = true;
    },
  },
  mounted() {
    this.listarfuncionario();
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
