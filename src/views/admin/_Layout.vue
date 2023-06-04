<template>
  <div>
    <v-app>
      <v-main>
        <v-row justify="center">
          <v-col
            class="mt-4 mt-lg-15 mt-xl-15"
            cols="20"
            sm="15"
            md="15"
            lg="10"
            xl="5"
          >
            <v-form ref="form">
              <img width="500" src="../../assets/img/logo2.2.png" />

              <v-row>
                <v-col class="mb-4" cols="12">
                  <v-bottom-navigation
                    style="border-radius: 10px"
                    height="75"
                    color="#B01A1A"
                    grow
                  >
                    <v-btn :to="{ name: 'parqueaderos' }" value="parqueaderos">
                      <v-icon large>mdi-city</v-icon>
                      <p class="pb-1 mb-0" style="font-size: 15px">
                        Parqueaderos
                      </p>
                    </v-btn>
                    <v-btn :to="{ name: 'funcionarios' }" value="funcionarios">
                      <v-icon large> mdi-account-star-outline</v-icon>
                      <p class="pb-1 mb-0" style="font-size: 15px">Funcionarios</p>
                    </v-btn>
                    <v-btn :to="{ name: 'clientes' }" value="clientes">
                      <v-icon large> mdi-account-multiple-plus</v-icon>
                      <p class="pb-1 mb-0" style="font-size: 15px">
                        Clientes
                      </p>
                    </v-btn>
                    
                    <v-btn :to="{ name: 'reservas' }" value="reservas">
                      <v-icon large>mdi mdi-clipboard-text-clock-outline</v-icon>
                      <p class="pb-1 mb-0" style="font-size: 15px">
                        Reservas
                      </p>
                    </v-btn>

                    <v-btn :to="{ name: 'auditoria' }" value="auditoria">
                      <v-icon large>mdi mdi-book-alphabet</v-icon>
                      <p class="pb-1 mb-0" style="font-size: 15px">
                        Auditorias
                      </p>
                    </v-btn>
                    
                    <v-btn :to="{ name: 'GrafiasYReportes' }" value="GrafiasYReportes">
                      <v-icon large>mdi mdi-chart-line</v-icon>
                      <p class="pb-1 mb-0" style="font-size: 15px">
                        Grafias Y Reportes
                      </p>
                    </v-btn>

                    <!-- <v-btn :to="{ name: 'remisiones' }" value="remisiones">
                      <v-icon large >mdi-ambulance</v-icon>
                      <p class="pb-1 mb-0" style="font-size: 15px">Remisiones</p>
                    </v-btn> -->
                    <v-btn @click="cerrar" value="remisiones">
                      <v-icon large>mdi-logout</v-icon>
                      <p class="pb-1 mb-0" style="font-size: 15px">
                        Cerrar sesión
                      </p>
                    </v-btn>
                  </v-bottom-navigation>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>

        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
      
    </v-app>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      right: null,
    };
  },
  methods: {
    cerrar() {
      localStorage.removeItem('id_usuario');
      localStorage.removeItem('cedula');
      this.$router.push({name: "login"});
    }
  }
};
</script>
<style scoped>
.item-nav {
  cursor: pointer;
}
.item-nav:hover {
  box-shadow: 0px 2px 4px #ef9a71, 0px 5px 16px #ef9a71 !important;
  border-radius: 10px !important;
}
</style>
