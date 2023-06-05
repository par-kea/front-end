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
                <strong> Cambio de contraseña </strong>
              </h2>
              <p>
                Aquí debes hacer cambio de contraseña que se te asignó
              </p>
              <template>
                <v-text-field
                class="custom-text-field custom-text-field-white-outline"
                rounded
                outlined
                dense
                dark
                color="#D89602"
                v-model="anterior"
                hint="Ingrese aquí la nueva contraseña que se le fue asignada"
                label="Contraseña que se envio al correo"
                :type="show ? 'text' : 'password'"
                :rules="[
                    (v) => !!v || 'Este campo es requerido',
                    
                ]"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                
                ></v-text-field>
            </template>
              <template>
                <v-text-field
                class="custom-text-field custom-text-field-white-outline"
                rounded
                outlined
                dense
                dark
                color="#D89602"
                v-model="user"
                hint="Ingrese aquí la nueva contraseña"
                label="Contraseña"
                :type="show ? 'text' : 'password'"
                :rules="[
                    (v) => !!v || 'Este campo es requerido',
                    
                ]"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                @blur="validatePasswords"
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
                hint="Ingrese aquí la contraseña de nuevo"
                label="Contraseña nuevamente"
                :type="show ? 'text' : 'password'"
                :rules="[
                (v) => !!v || 'Este campo es requerido',
                (v) => !user || v === user || 'Las contraseñas no coinciden'
                ]"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                @blur="validatePasswords"
            ></v-text-field>

            <v-btn
              :loading="loading"
              class="mt-5"
              block
              rounded
              dark
              color="#B01A1A"
              :disabled="!passwordsMatch"
              @click="submit"

            >
              <strong>SIGUIENTE</strong>
            </v-btn>
            <stripe-checkout
            ref="referencia"
            mode="subscription"
            :pk="publishableKey"
            :line-items="items"
            :success-url="successUrl"
            :cancel-url="cancelURL"
            @loading="v => loading= v"
            

            />

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
  import {StripeCheckout} from '@vue-stripe/vue-stripe'
  import alert from "@/mixins/alert";
  export default {
    components:{
      StripeCheckout
    },
    mixins: [alert],
    data() {
      this.publishableKey = "pk_test_51NEkeIKkMva2veBubab9yeSyocJTVSudtSJTKUXYJ3HqgJ4IEKyncBcV7bWErIzz2jpFLbyjhYFbsjUYwLGw5f5y001frNT4X5"
      return {
        user: "",
        pass: "",
        show: false,
        loading: false,
        infoUsuario: {},
        infoFuncionarioP: {},
        passwordsMatch: false,
        items: [
          {
            price:'price_1NEknWKkMva2veBuS8Y1L30c',
            quantity:1
          }
        ],
        successUrl:'http://localhost:8080/clientes',
        cancelURL:'http://localhost:8080/login/NuevaContra'
      };
    },
    methods: {
      submit(){
        this.$refs.referencia.redirectToCheckout()
      },

      validatePasswords() {

      this.passwordsMatch = this.user === this.pass;
    },
  
      obtenerInfoUsuario() {
        fetch(process.env.VUE_APP_API_URL + "paciente/"+this.user)
          .then((resp) => resp.json())
          .then((data) => {
            this.infoPaciente = data;
            localStorage.setItem('id_usuario', this.infoPaciente.id_paciente);
            localStorage.setItem('cedula', this.user);
          })
          .catch((error) => {
            console.log(error);
          });
      },
  
      obtenerInfoFuncionarioP() {
        fetch(process.env.VUE_APP_API_URL + "medico/"+this.user)
          .then((resp) => resp.json())
          .then((data) => {
            this.infoMedico = data;
            localStorage.setItem('id_usuario', this.infoPaciente.id_medico);
            localStorage.setItem('cedula', this.user);
          })
          .catch((error) => {
            console.log(error);
          });
      },
  
  
    },
    watch: {
    user() {
      this.validatePasswords();
    },
    pass() {
      this.validatePasswords();
    }
  },
  };
  </script>
  