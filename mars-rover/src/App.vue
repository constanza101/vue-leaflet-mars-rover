<template>
  <v-app style="height: 100vh; overflow:hidden;">
    <v-app-bar
      app
      color="black"
      dark
    >
      <div class="d-flex align-center">
      <v-btn plain x-large text href="/">
        <v-img
         
          alt="Logo"
          class="shrink mr-2"
          contain
          src="https://www.pinclipart.com/picdir/big/90-906532_moon-rover-png-clipart.png"
          transition="scale-transition"
          width="50"
        />
      </v-btn>


      <span class="pl-7" style="font-size: 24px">A trip to Mars</span>

      </div>

      <v-spacer></v-spacer>

      <v-btn
        class="hidden-sm-and-down"
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
    drawer: false,
  }),
};
</script>
