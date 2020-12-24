<template>
  <div id="leaflet-map" style="max-height: calc(100vh - 150px)">
    <v-row>
      <v-col cols="12" md="8" lg="7" class="px-5 d-flex justify-center">
        <h3>Welcome to the red planet! Enjoy a virtual tour!</h3>
      </v-col>
    </v-row>

    <v-row class="px-xs-12 px-md-0">
      <v-col cols="12" md="8" lg="7" class="px-5 d-flex justify-center">
        <l-map
          ref="map"
          :crs="crs"
          style="height: 550px; width: 600px; background-color: black"
          :center="center"
          :options="{zoomControl: false}"
        >
          <l-image-overlay :url="url" :bounds="bounds" ></l-image-overlay>
          <l-rectangle :bounds="rectangle.bounds" :l-style="rectangle.style"></l-rectangle>

          <l-marker
            :draggable="true"
            :key="roverKey"
            :lat-lng="rover.position"
            @update:lat-lng="updatePosition"
          >
            <l-icon>
              <div class="background-icon">
                <v-icon large  >{{ rover.icon }} {{ `mdi-rotate-${rover.facing}` }}</v-icon>
              </div>
            </l-icon>

            <l-popup>
              <v-row>
                <v-col
                  class="d-flex justify-center pt-1"
                  cols="12"
                  style="font-size: 14px"
                >
                  {{ rover.position }}
                </v-col>
              </v-row>
            </l-popup>
          </l-marker>
        </l-map>
              
     

      </v-col>

      <v-col
        cols="12"
        md="4"
        lg="5"
        style="border-radius: 10px; background-color: #fff3e6"
        class="px-5 d-flex justify-center"
      >
        <v-row class="pr-3">
          <v-col cols="12" lg="6">
            <b>Instructions</b> <br />
            Plan the route and type the commands in the textfield below. Press the button and watch it happen! <br>
             * Don't worry about the boundaries, if the rover reaches a border it will not fall out of the map!
          </v-col>

          <v-col cols="12" lg="6">
            <b>Commands</b>
            <ul>
              <li><b>F:</b> moves the rover forwards one position</li>
              <li> <b>R:</b> turns the rover right and moves the rover forwards one position</li>
              <li> <b>L:</b> turns the rover left and moves the rover forwards one  position</li>
            </ul>
          </v-col>
          <v-col cols="12" class="pl-7">
            <v-text-field
              v-model="roverMovements"
              append-icon="mdi-arrow"
              label="eg: RRFFFL"
              single-line
              hide-details
              outlined
              dense
              :append-outer-icon="'mdi-rocket'"
              @click:append-outer="moveRover"
            ></v-text-field
          ></v-col>

          <v-col class="px-7">
            <v-card>
              <v-col cols="12">
                <b>At the moment the rover is facing {{ direction }}.</b>
                <v-icon class="pl-2">mdi-compass-rose</v-icon>
              </v-col>
              <v-col cols="12">
                <b>Actual position:</b> <br />
                {{ rover.position }}
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

    </v-row>
   
    <v-dialog v-model="dialog" max-width="490">
       <DialogAlert 
       v-if="dialogBorder"
       title="Oops! we have discovered that Mars has a very unusual flat and squared shape!!"
       text1="Fortunately our rover has a boundary detector which prevents it to fall out of the planet!" 
       text2="Your planned route has been cancelled, please plan a new route."
       @close-dialog="closeDialogBorder()"
       ></DialogAlert>
      <DialogAlert 
       v-if="dialogObstacle"
       title="Oops! Yoy have bumped into a VOLCANO!!"
       text1="Our rober can't climb, so it has stopped here." 
       text2="Your planned route has been cancelled, please plan a new route."
       @close-dialog="closeDialogObstacle()"
       ></DialogAlert>
    </v-dialog>
  </div>
</template>

<script>
import DialogAlert from './DialogAlert.vue'
import { CRS } from "leaflet";
import { latLng } from "leaflet";
import {
  LMap,
  LImageOverlay,
  LMarker,
  LPopup,
  LIcon,
  LRectangle,
} from "vue2-leaflet";

export default {
  name: "Example",
  components: {
    DialogAlert,
    LMap,
    LRectangle,
    LMarker,
    LImageOverlay,
    LPopup,
    LIcon,
  },
  data() {
    return {
      dialog: false,
      dialogBorder: false,
      dialogObstacle: false,
      popupMessage: "",
      degrees: 0,
      roverKey: 0,
      rover: {
        icon: "mdi-space-station",
        position: latLng(41.26713, 1.974814, 17),
        // position: LatLng(34.811548, -26.768394),
        facing: 0,
      },
      latitudude: 41.26713,
      longitude: 1.974814,
      roverMovements: "",
      rectangle: {
        bounds:[
        [230, 30],
        [310, 90],
      ],
      style: { color: 'black', weight: 3 }
      },
      loading: false,
      zoom: -10,
      center: [141.26713, 111.974814, 17],
      url: "https://geology.com/articles/mars/olympus-mons-volcano.jpg",
      bounds: [
        [-100, -100],
        [400, 400],
      ],
      crs: CRS.Simple,
    };
  },
  computed: {
    direction() {
      let direction = "";
      if (this.rover.facing === 0) {
        direction = "north";
      } else if (this.rover.facing === 90) {
        direction = "east";
      } else if (this.rover.facing === 180) {
        direction = "south";
      } else if (this.rover.facing === 90) {
        direction = "west";
      }
      return direction;
    },

  },
  methods: {
    foundBorder(){
      this.dialogBorder = true
      this.dialog = true
    },
    closeDialogBorder(){
      this.dialog= false
      this.dialogBorder = false
    },
    closeDialogObstacle(){
      this.dialog= false
      this.dialogObstacle = false
    },
    foundObstacle(degrees){
      this.dialogObstacle = true
      this.dialog = true
      degrees === 0 ? this.rover.position.lat -= 1: 
      degrees === 90 ? this.rover.position.lng -= 1: 
      degrees === 180 ? this.rover.position.lat += 1: 
      degrees === 270 ? this.rover.position.lng += 1: degrees
      
    },
    updatePosition(position) {
      this.rover.position = position;
    },
    async moveRover() {
      this.loading = true;
      for (const char of this.roverMovements) {
        await this.action(char.toLowerCase());
      }
      this.loading = false;
    },
    async action(char) {
      try {
        await this.waitPromise(2000).then(
          this.turnRover(char).then(this.moveForward(char))
        );
      } catch (e) {
        console.log(e);
      }
    },
    async turnRover(char) {
      char === "r"
        ? (this.rover.facing += 90)
        : char === "l"
        ? (this.rover.facing -= 90)
        : char;
      //we make sure that degrees are always 0 to 270
      this.rover.facing ** 2 === 129600
        ? (this.rover.facing = 0)
        : this.rover.facing == -90
        ? (this.rover.facing = 270)
        : this.rover.facing;
    },
    async moveForward(char) {
      let actionChars = ["f", "l", "r"];
      if (actionChars.includes(char)) {
        for (let x = 0; x < 100; x++) {
          setTimeout(() => {
            let degrees = this.rover.facing;
            // let foundObstacle = false;
            let northBound = this.rover.position.lat > 366; 
            let eastBound = this.rover.position.lng > 370;
            let southBound = this.rover.position.lat < -86;
            let westBound = this.rover.position.lng < -82;
            let obstacle = ((this.rover.position.lat < 327) && (this.rover.position.lat > 192) && (-2 < this.rover.position.lng) && (this.rover.position.lng < 109) )

            if (degrees == 0) {
              northBound
                ? (this.foundBorder())
                : obstacle ? this.foundObstacle(degrees)
                : (this.rover.position.lat += 1);

            } else if (degrees == 90) {
              eastBound ? (this.foundBorder()) 
                : obstacle ? this.foundObstacle(degrees)
                : (this.rover.position.lng += 1);
            } else if (degrees == 180) {
              southBound
                ? (this.foundBorder())
                : obstacle ? this.foundObstacle(degrees)
                : (this.rover.position.lat -= 1);
            } else if (degrees == 270) {
              westBound ? (this.foundBorder())
                  : obstacle ? this.foundObstacle(degrees) 
                  : (this.rover.position.lng -= 1)
            }
              this.roverKey++;
          }, 100);
        }
      }
    },

    async waitPromise(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
  mounted() {
    this.$refs.map.mapObject.setView([150, 150], -1);
  },
  async created() {},
};
</script>
<style scoped lang="css">
.background-icon {
  margin-top: -27px;
  margin-left: -10px;
  width: 46px;
  height: 46px;
  background-color: white;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 1px 1px 5px grey;
}
a {
  color: black;
}
>>> .leaflet-popup {
  margin-bottom: 40px;
}
>>> .leaflet-top {
  z-index: 400;
}
>>> .leaflet-bottom {
  z-index: 400;
}

>>> .v-input--hide-details {
  padding-top: 0;
}

>>> .leaflet-map-pane {
  z-index: 0;
}
</style>
