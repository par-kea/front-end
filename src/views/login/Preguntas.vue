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
          <v-form ref="form" v-model="valida" lazy-validation>
            <img width="200" src="../../assets/img/logo2.2.png" />


            <h2 class="mb-8" style="color: #eff8f6">
              <strong> PREGUNTAS FRECUENTES </strong>
            </h2>

            <v-btn
              :to="{ name: 'login' }"
              class="mt-0 mb-10"
              block
              rounded
              dark
              color="#B01A1A"
            >
              <strong> INICIAR SESIÓN </strong>
            </v-btn>

            <v-text-field
              color="#eff8f6"
              rounded
              outlined
              dense
              dark
              v-model="search"
              hint="Insgrese aquí una palabra clave"
              label="Buscar pregunta"
              append-icon="mdi-magnify"
            >
            </v-text-field>
          </v-form>

          <v-data-iterator :items="items" :search="search" hide-default-footer>
            <template v-slot:default="props">
              <v-row>
                <v-col
                  v-for="item in props.items"
                  :key="item.nombre"
                  cols="12"
                  sm="12"
                  md="12"
                  lg="12"
                >
                  <v-card>
                    <v-card-title class="subheading font-weight-bold">
                      {{ item.nombre }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="text-left">
                      {{ item.descripcion }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import alert from "@/mixins/alert";
export default {
  data() {
    return {
      search: "",
      items: [
        {
          nombre: "¿Cómo registrarse en Par-Kea?",
          descripcion:
            "Si quiere registrarse con el rol de Funcionario de un parqueadero, debe contactarse con el administrador de la aplicación escribien a admin@Par-Kea.com. Para el registro como usuario, dirigete a iniciar sesión y das clic en (REGISTRAR usuario), ingresa los datos y ya estas listo para utilizaar el sistema",
        },
        {
          nombre: "¿Cómo iniciar sesión en Par-Kea?",
          descripcion:
            "Ingresa a Par-kea.com y en el formulario de inicio de sesión llene sus datos y de clic en (INGRESAR).",
        },
        {
          nombre: "¿Cómo reservar un parqueadero en Par-Kea?",
          descripcion:
            "Si es usuario, inicia sesión con sus credenciales y obtendrá un formulario para reservar un parqueadero, selecciona el parqueadero, fecha y horasde la reserva.",
        }
      ],
    };
  },
  methods: {},
};
</script>
