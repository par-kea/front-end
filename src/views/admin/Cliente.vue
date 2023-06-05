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
            <v-col cols="12" sm="6" md="6" lg="9" xl="6" class="pt-0">                
              <v-alert v-if="listaClientes.length == 0" dense type="info" color="#E32222" prominent border="left">
                No se encontraron datos registrados
              </v-alert>
              <v-data-table
                v-else
                :items="listaClientes"
                :headers="headers"
                color="#FF7171"
                dense
              >
                <template #item="{ item, index }">
                  <tr @click="info(item, index)">
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.contraseña }}</td>
                    
                    <td>{{ item.email }}</td>
                    <td>{{ item.puntos_fid }}</td>
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
                  v-model="form.cc_cliente"
                  color="#eff8f6"
                  rounded
                  outlined
                  dense
                  dark
                  label="Cedula del cliente *"
                  hint="Ingrese aquí la Cedula del cliente"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                >
                </v-text-field>
                <v-text-field
                  v-model="form.nombre"
                  color="#eff8f6"
                  rounded
                  outlined
                  dense
                  dark
                  label="Nombre de la sucursales *"
                  hint="Ingrese aquí el nombre de la sucursales"
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
                  label="Dirección *"
                  hint="Ingrese aquí la dirección"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                >
                </v-text-field>
                <v-text-field
                    v-model="form.email"
                    :rules="emailRules"
                    rounded
                    outlined
                    dense
                    dark
                    label="Correo electrónico"
                    required
                ></v-text-field>
                              
                <v-text-field
                  v-model="form.contraseña"
                  color="#eff8f6"
                  rounded
                  outlined
                  dense
                  dark
                  label="Contraseña *"
                  hint="Ingrese aquí la contraseña"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                >
                </v-text-field>
  
                <v-text-field
                  v-model="form.puntos_fid"
                  color="#eff8f6"
                  rounded
                  outlined
                  dense
                  dark
                  label="Puntos de fidelizacion*"
                  hint="Ingrese aquí los Puntos de fidelizacion"
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
                cc_cliente: "",
                nombre: "",
                contraseña: "",
                email: "",
                puntos_fid: "", 
                direccion: "",
                estado: "activo",
            },
            loading: false,
            loadingTable: false,
            emailRules: [
                (v) => !!v || 'El correo electrónico es requerido',
                (v) =>
                /.+@.+\..+/.test(v) || 'Ingrese un correo electrónico válido',
            ],
            headers: [
              { text: 'Nombre', value: 'nombre' },
              { text: 'Contraseña', value: 'contraseña' },
              { text: 'Email', value: 'email' },
              { text: 'Puntos de fidelización', value: 'puntos_fid' },
              { text: 'Dirección', value: 'direccion' },
              { text: '', value: '' } // Celda vacía para el botón
            ],
            };
    },
    methods: {
      listaClientes() {

        this.loadingTable = true;
        fetch(process.env.VUE_APP_API_URL + "cliente")
          .then((resp) => resp.json())
          .then((data) => {
            this.loadingTable = false;
            this.listaClientes  = data;
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
          fetch(process.env.VUE_APP_API_URL + "cliente", init)
          
            .then((response) => response.text())
            .then((text) => {
              console.log(process.env.VUE_APP_API_URL + "cliente");
              this.loading = false;
              this.$refs.form.reset();
              //this.listaClientes();
              this.alert(text, "Muy bien", "success");
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
          (this.form.id = null), (this.form.nombre = "");
          this.form.cc_cliente = "";
          this.form.direccion = "";
          this.form.email = "";
          this.form.contraseña = "";
          this.form.puntos_fid = "";          
          this.listaClientes[i].cerrar = false;
          this.$refs.form.resetValidation();
        }, 100);
      },
      info(data, i) {
        console.log(data);
        for (let j = 0; j < this.listaClientes.length; j++) {
          this.listaClientes[j].cerrar = false;
        }
        this.form.cc_cliente = data.cc_cliente;
        this.form.nombre = data.nombre;
        this.form.contraseña = data.contraseña;       
        this.form.email = data.email;
        this.form.puntos_fid = data.puntos_fid;
        this.form.direccion = data.direccion;
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
 
  