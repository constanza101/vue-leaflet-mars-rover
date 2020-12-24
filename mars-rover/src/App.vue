<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://www.pinclipart.com/picdir/big/90-906532_moon-rover-png-clipart.png"
          transition="scale-transition"
          width="50"
        />

      <span class="pl-7" style="font-size: 24px">A trip to Mars</span>

      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/constanza101/vue-leaflet-mars-rover"
        target="_blank"
        text
      >  <v-icon>mdi-github</v-icon>
        <span class="mx-2">git hub repository</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Home/>
      <Footer />
    </v-main>

  </v-app>
</template>

<script>
import Footer from './components/Footer.vue';
import Home from './components/Home';

export default {
  name: 'App',

  components: {
    Home,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
