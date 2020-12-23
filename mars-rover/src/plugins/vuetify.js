import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
          customProperties: true,
        },
      themes: {
        light: {
          primary: "#ff8c2e",
          secondary: "#424242",
          accent: "#82B1FF",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
          navbar: "#2A2F34",
          navbar2: "#41474A",
          navbar3: "#689940",
          navbar4: "#7BA556",
          drawer: "#F5F5F5",
          activebtn: "#707070",
          white: "#fff",
       
        }
      },
    },
});
