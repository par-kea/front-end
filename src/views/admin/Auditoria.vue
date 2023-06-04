<template>
    <div>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="10" lg="12" xl="5">
          <h2 style="color: #eff8f6">
            <strong> REGISTRAR O MODIFICAR CLIENTES </strong>
          </h2>
          <p class="mb-12">
            Selecciona un cliente en la lista para ver su información
          </p>
  
          <v-text-field
                  v-model="form.busqueda"
                  color="#eff8f6"
                  rounded
                  outlined
                  dense
                  dark
                  label="Busca aqui por cualquier información del cliente *"
                  hint="Ingrese aquí cualquier información que esta asociada al cliente"
                >
          </v-text-field>
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="12" xl="6" class="pt-0">
              <v-alert v-if="listaClientes.length == 0" dense type="info" color="#E32222" prominent border="left">
                No se encontraron datos registrados
              </v-alert>
              <v-data-table
                v-else
                :items="listaClientes"
                :headers="headersClientes"
                color="#FF7171"
                dense
              >
                <template #item="{ item, index }">
                  <tr @click="info(item, index)">
                    <td>{{ item.nombre_cli }}</td>
                    <td>{{ item.contrasena }}</td>
                    <td>{{ item.cedulaCli }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.puntos_fide }}</td>
                    <td>{{ item.direccion }}</td>
                    <td>{{ item.telefono }}</td>
                    <td>
                      <v-btn v-if="item.cerrar" @click="cerrar(index)" fab x-small icon>
                        <v-icon>mdi-close-circle-outline</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>
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
                nombre_cli: "",
                direccion: "",
                telefono: "",
                email: "",
                contrasena: "",
                puntos_fide: "",
                cedulaCli: "",
            },

            loading: false,
            loadingTable: false,
            cobertura: "",
            opciones: ["Descubierto", "Semidescubierto", "Cubierto"],
            emailRules: [
                (v) => !!v || 'El correo electrónico es requerido',
                (v) =>
                /.+@.+\..+/.test(v) || 'Ingrese un correo electrónico válido',
            ],
            headersClientes: [
              { text: 'Nombre', value: 'nombre_cli' },
              { text: 'Número de Parqueaderos', value: 'contrasena' },
              { text: 'Cédula del Cliente', value: 'cedulaCli' },
              { text: 'Email', value: 'email' },
              { text: 'Hora de Atención', value: 'puntos_fide' },
              { text: 'Dirección', value: 'direccion' },
              { text: 'Teléfono', value: 'telefono' },
              { text: '', value: '' } // Celda vacía para el botón
            ],
            };
    },
    methods: {
      listaClientes() {
        this.loadingTable = true;
        fetch(process.env.VUE_APP_API_URL + "registro")
          .then((resp) => resp.json())
          .then((data) => {
            this.loadingTable = false;
            this.listaClientes = data;
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
          fetch(process.env.VUE_APP_API_URL + "clientes", init)
            .then((response) => response.text())
            .then((text) => {
              this.loading = false;
              this.alert(text, "Muy bien", "success");
              this.$refs.form.reset();
              this.listaClientes();
            })
            .catch((error) => {
              this.loading = false;
              console.log(error);
              this.alert(
                "Error al registrar el cliente",
                "Ooop.. Error",
                "error"
              );
            });
        }
      },
      cerrar(i) {
        setTimeout(() => {
          (this.form.id = null), (this.form.nombre_cli = "");
          this.form.direccion = "";
          this.form.telefono = "";
          this.form.email = "";
          this.form.contrasena = "";
          this.form.puntos_fide = "";
          this.form.precioMin = "";
          this.form.cedulaCli = "";
          this.listaClientes[i].cerrar = false;
          this.$refs.form.resetValidation();
        }, 100);
      },
      info(data, i) {
        console.log(data);
        for (let j = 0; j < this.listaClientes.length; j++) {
          this.listaClientes[j].cerrar = false;
        }
        this.form.id = data.id;
        this.form.nombre_cli = data.nombre_cli;
        this.form.direccion = data.direccion;
        this.form.telefono = data.telefono;
        this.form.email = data.email;
        this.form.contrasena = data.contrasena;
        this.form.puntos_fide = data.puntos_fide;
        this.form.precioMin = data.precioMin;
        this.form.cedulaCli = data.cedulaCli;
        this.listaClientes[i].cerrar = true;
      },
      validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
        },
    },
    mounted() {
      this.listaClientes();
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
  