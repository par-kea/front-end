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
            <img width="500" src="../../assets/img/logo2.2.png" />
          
            <h2 class="mb-13" style="color: #D89602">
              <strong> INICIAR SESIÓN </strong>
            </h2>
            
            <template>
              <v-text-field
                class="custom-text-field custom-text-field-white-outline"
                rounded
                outlined
                dense
                dark
                color="#D89602"
                v-model="user"
                hint="Ingrese aquí el usuario"
                label="Usuario (cédula)"
                :rules="[(v) => !!v || 'Este campo es requerido']"
                required
              ></v-text-field>
            </template>

            <v-text-field
              class="custom-text-field"
              rounded
              outlined
              dense
              dark
              color="#D89602"
              v-model="pass"
              hint="Ingrese aquí la contraseña"
              label="Contraseña"
              :type="show ? 'text' : 'password'"
              :rules="[(v) => !!v || 'Este campo es requerido']"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
            ></v-text-field>
            <vue-recaptcha
              center
              ref="recaptcha"
              sitekey="6LcLI2MmAAAAABgDEHhw9d9a4pnAJKZwxCO5ASjA"
              @verify="onCaptchaVerified"
            ></vue-recaptcha>

            <v-btn
              :loading="loading"
              @click="captchaVerified ? login() : null"
              id="ingresar-btn"
              class="mt-5"
              block
              rounded
              dark
              color="#B01A1A"
            >
              <strong> INGRESAR </strong>
            </v-btn>



            
            <v-btn
              :to="{ name: 'registro' }"
              class="mt-5"
              block
              rounded
              dark
              color="#630F0F"
            >
              <strong> REGISTRAR USUARIO </strong>
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<style>

.custom-text-field .v-input__control input {
  border-color: white !important;
  background-color: transparent !important;
  color: color="#D89602" !important;
}

.custom-text-field .v-label {
  color: color="#D89602" !important;
}

.custom-text-field .v-input__append-inner .v-icon {
  color: color="#D89602" !important;
}

</style>

<script>
import axios from 'axios';
import { VueRecaptcha } from 'vue-recaptcha'


export default {
  data() {
    return {
      user: "",
      pass: "",
      show: false,
      loading: false,
      infoUsuario: {},
      infoFuncionarioP: {},
      firstTimeLogin: false,
      captchaError: false,
      captchaVerified: false
    };
  },
  components: {
  VueRecaptcha
  },
  methods: {
    onCaptchaVerified(response) {
    if (response) {
      this.$refs.form.resetValidation();
      this.$refs.form.validate();

      if (this.$refs.form.valid) {
        this.captchaVerified = true;
      } else {
        this.captchaVerified = false;
      }
    } else {
      this.captchaVerified = false;
    }
  },
    captureIP() {
      axios.get('http://ip-api.com/json')
        .then(response => {
          const ip = response.data.query;
          // Envía la IP al servidor o realiza alguna acción con ella
          this.sendIPToServer(ip);
        })
        .catch(error => {
          console.error('Error al obtener la IP:', error);
        });
    },

    sendIPToServer(ip) {
      // Aquí puedes realizar una solicitud al servidor con la IP capturada
      // utilizando axios u otro método de tu elección
      // Ejemplo de solicitud POST con axios:
      // axios.post('/ruta-al-servidor', { ip: ip })
      //   .then(response => {
      //     // Hacer algo con la respuesta del servidor
      //   })
      //   .catch(error => {
      //     console.error('Error al enviar la IP al servidor:', error);
      //   });

      // Ejemplo de solicitud POST con fetch:
      fetch('/ruta-al-servidor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip: ip }),
      })
        .then(response => {
          // Hacer algo con la respuesta del servidor
        })
        .catch(error => {
          console.error('Error al enviar la IP al servidor:', error);
        });
    },

    login() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        // Captura la IP del usuario
        this.captureIP();

        fetch(process.env.VUE_APP_API_URL + "login/" + this.user + "/" + this.pass)
          .then(response => response.json())
          .then(data => {
            var redirect = null;
            if (data.rol === "cliente") {
              this.obtenerInfoUsuario();
              if (this.firstTimeLogin) {
                redirect = "NuevaContra"; 
              } else {
                redirect = "reservar"; // Redirige a la página "reservar"
              }
            } else if (data.rol === "funcionario") {
              redirect = "funcionarios";
              this.obtenerInfoFuncionarioP();
            } else if (data.rol === "admin") {
              redirect = "parqueaderos";
            }
            
            if (redirect) {
              this.alert("Inicio sesión exitoso", "Muy bien", "success");
              setTimeout(() => {
                this.loading = false;
                this.$router.push({ name: redirect });
              }, 2000);
            }
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
      }
    },

    obtenerInfoUsuario() {
      fetch(process.env.VUE_APP_API_URL + "clientes/" + this.user)
        .then(resp => resp.json())
        .then(data => {
          this.infoPaciente = data;
          localStorage.setItem('id_usuario', this.infoPaciente.id_paciente);
          localStorage.setItem('cedula', this.user);
          if (data.primerInicio) {
            this.firstTimeLogin = true;
          } else {
            this.firstTimeLogin = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    obtenerInfoFuncionarioP() {
      fetch(process.env.VUE_APP_API_URL + "medico/"+this.user)
        .then(resp => resp.json())
        .then(data => {
          this.infoMedico = data;
          localStorage.setItem('id_usuario', this.infoPaciente.id_medico);
          localStorage.setItem('cedula', this.user);
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>

