<template>
  <v-container>
    <v-row v-if="home" class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/mars.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col cols="12" class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Mars
        </h1>

        <p class="subheading font-weight-regular">
            Are you ready to discover life in Mars?
          </p>
      </v-col>

      <v-col  cols="12">
        <v-btn @click="home = false"  color="primary" >take me there!</v-btn>
      </v-col>

   
    </v-row>
    <v-row v-if="!home">

      <mars-map>
      </mars-map>

    </v-row>
  </v-container>
</template>

<script>
import MarsMap from './MarsMap.vue'

  export default {
    name: 'Home',
    components: {
      MarsMap
    },

    data: () => ({
      home:true
    }),
  }
</script>
