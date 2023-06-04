<template>
  <div>
    <v-app>
      <v-main>
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
              

              <v-row>
                <v-col class="mb-4" cols="12">
                  <v-bottom-navigation
                    style="border-radius: 10px"
                    height="75"
                    color="#B01A1A"
                    grow
                  >
                    <v-btn :to="{ name: 'ReservasF' }" value="ReservasF">
                      <v-icon large>mdi-calendar</v-icon>
                      <p class="pb-1 mb-0" style="font-size: 15px">Reservas</p>
                    </v-btn>
                    <v-btn :to="{ name: 'GrafiasYReportesFun' }" value="GrafiasYReportesFun">
                      <v-icon large>mdi-history</v-icon>
                      <p class="pb-1 mb-0" style="font-size: 15px">Grafias Y Reportes</p>
                    </v-btn>
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
      items: [
        {
          title: "Empleados",
          icon: "mdi-account-group",
          to: { name: "importar" },
        },
        {
          title: "Reportes empleados",
          icon: "mdi-chart-bar",
          to: { name: "graphics" },
        },
        { title: "Novedades", icon: "mdi-bullhorn", to: { name: "news" } },
        {
          title: "Peliculas",
          icon: "mdi-movie",
          to: { name: "importarPelicula" },
        },
        { title: "Libros", icon: "mdi-book", to: { name: "importarLibro" } },
        {
          title: "Reporte de entretenimiento",
          icon: "mdi-book",
          to: { name: "graphicsE" },
        },
      ],
      right: null,
    };
  },
   methods: {
    cerrar() {
      localStorage.removeItem("id_usuario");
      localStorage.removeItem("cedula");
      this.$router.push({ name: "login" });
    },
  },
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
