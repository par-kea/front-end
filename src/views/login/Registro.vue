<template>
  <div>
    <div>
      <v-row justify="center">
        <v-col
          class="mt-4 mt-lg-15 mt-xl-15"
          cols="12"
          sm="10"
          md="10"
          lg="8"
          xl="5"
        >
          <v-form ref="form">
            <img width="200" src="../../assets/img/logo2.2.png" />
            
            <h2 class="mb-13" style="color: #B01A1A">
              <strong> REGISTRAR USUARIO</strong>
            </h2>

            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="pt-0">
                <v-text-field
                  class="custom-text-field"
                  dark
                  rounded
                  outlined
                  dense
                  v-model="form.nombre_dueño"
                  label="Nombre*"
                  hint="Ingrese aquí la cédula "
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="pt-0">
                <v-text-field
                  class="custom-text-field"
                  dark
                  rounded
                  outlined
                  dense
                  v-model="form.cedula_Dueño"
                  label="Cédula*"
                  hint="Ingrese aquí la cédula "
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="pt-0">
                <v-text-field
                  class="custom-text-field"
                  dark
                  rounded
                  outlined
                  dense
                  v-model="form.telefono_de_contacto"
                  label="Teléfono de contacto *"
                  hint="Ingrese aquí el teléfono de contacto"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                  required
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="pt-0">
                <v-text-field
                  class="custom-text-field"
                  dark
                  rounded
                  outlined
                  dense
                  v-model="form.direccion_de_residencia"
                  label="Dirección *"
                  hint="Ingrese aquí la dirección"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                  required
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="pt-0">
                <v-text-field
                  class="custom-text-field"
                  dark
                  rounded
                  outlined
                  dense
                  v-model="form.cedulaUsuario"
                  label="Cédula de ciudadanía *"
                  hint="Ingrese aquí la cédula de ciudadanía"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                  required
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="pt-0">
                <v-text-field
                  class="custom-text-field"
                  dark
                  rounded
                  outlined
                  dense
                  v-model="form.correoUsuario"
                  label="Correo de usuario *"
                  hint="Ingrese aquí el correo del usuario a registrar"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                  required
                >
                </v-text-field>
              </v-col>

            </v-row> 

            <v-btn
              :loading="loading"
              @click="login()"
              class="mt-5"
              block
              rounded
              dark
              color="#B01A1A"
            >
              <strong> REGISTRAR USUARIO </strong>
            </v-btn>

            <v-btn
              :to="{ name: 'login' }"
              class="mt-5"
              block
              rounded
              dark
              color="#630F0F"
            >
              <strong>IR A INICIAR SESIÓN </strong>
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<style>

.custom-text-field .v-input__control input {
  color: white !important;
}

.custom-text-field .v-label {
  color: white !important;
}

.custom-text-field .v-input__append-inner .v-icon {
  color: white !important;
}

</style>

<script>
import alert from "@/mixins/alert";
export default {
  mixins: [alert],
  data() {
    return {
      listaSedes: [],
      // listaGenero: [
      //   {
      //     id: "M",
      //     nombre: "Macho",
      //   },
      //   {
      //     id: "F",
      //     nombre: "Hembra",
      //   },
      // ],
      // listaEsterilizacion: [
      //   {
      //     nombre: "Si",
      //   },
      //   {
      //     nombre: "No",
      //   },
      // ],
      form: {
        cedulaUsuario: "",
        nombre_dueño: "",
        cedula_Dueño: "",
        direccion_de_residencia: "",
        telefono_de_contacto: "",
        especie: "",
        id_sucursal: {
          id_sucursal: null,
        },
        genero: null,
        edad: null,
        esteril: null,
        raza: null,
      },
      form_login: {
        usuario: "",
        password: "",
        repetir_password: "",
        rol: "usuario",
        cedula: "",
      },
      loading: false,
      infoSede: {
        nombre_sucursal: "",
        direccion: "",
        telefono: null,
        id_sucursal: null,
      },
      show: false,
      show2: false,
    };
  },
  watch: {
    "form.id_sucursal.id_sucursal": function (n) {
      if (n) {
        for (let i = 0; i < this.listaSedes.length; i++) {
          if (this.listaSedes[i].id_sucursal == n) {
            this.infoSede = this.listaSedes[i];
          }
        }
      } else {
        this.infoSede = {
          nombre_sucursal: "",
          id_sucursal: 1,
        };
      }
    },
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.form_login.usuario = this.form.cedula_Dueño;
        this.form_login.cedula = this.form.cedula_Dueño;
        var init = {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(this.form_login),
          headers: {
            "Content-Type": "application/json",
          },
        };
        this.loading = true;
        fetch(process.env.VUE_APP_API_URL + "login", init)
          .then((response) => response.text())
          .then((text) => {
            this.loading = false;
            this.alert(text, "Muy bien", "success");
            this.registrarPacientes();
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
          });
      }
    },
    registrarPacientes() {
      var init = {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(this.form),
        headers: {
          "Content-Type": "application/json",
        },
      };
      this.loading = true;
      fetch(process.env.VUE_APP_API_URL + "paciente", init)
        .then((response) => response.text())
        .then((text) => {
          this.loading = false;
          this.alert(text, "Muy bien", "success");

          setTimeout(() => {
            this.$router.push({ name: "login" });
          }, 2000);
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
          this.alert("Error al registrar el paciente", "Ooop.. Error", "error");
        });
    },
    listarSucursales() {
      fetch(process.env.VUE_APP_API_URL + "sucursal")
        .then((resp) => resp.json())
        .then((data) => {
          this.listaSedes = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    register() {
      if (this.$refs.form.validate()) {
      }
    },
  },
  mounted() {
    this.listarSucursales();
  },
};
</script>
