<template>
  <div id="app">
    <notifications style="top: 10%; right: -4px" :duration="5000" group="foo" />
    <v-app>
      <router-view />
      <v-fab-transition>
        
        
      </v-fab-transition>
    </v-app>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background-color: #181818;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #ffffff;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
