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
      <v-card dark>
        <v-col cols="12" class="d-flex justify-center pt-5">
          <v-btn x-large fab><v-icon x-large>mdi-space-station mdi-spin</v-icon></v-btn>
        </v-col>
        <v-card-title>
          Oops! we have discovered that Mars has a very unusual flat and squared
          shape!!
        </v-card-title>

        <v-card-text>
          Fortunately our rover has a boundary detector which prevents it to
          fall out of the planet!  <br>
          Your planned route has been cancelled, please plan a new route.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mb-2" @click="dialog = false">
            try again
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { CRS } from "leaflet";
import { latLng } from "leaflet";
import {
  LMap,
  // LTileLayer,
  LImageOverlay,
  LMarker,
  LPopup,
  LIcon,
  LRectangle,
  // LTooltip,
  // LControl,
  // LGeoJson
} from "vue2-leaflet";

export default {
  name: "Example",
  components: {
    LMap,
    // LTileLayer,
    // LGeoJson,
    LRectangle,
    LMarker,
    LImageOverlay,
    LPopup,
    LIcon,
    // LTooltip,
    // LControl,
  },
  data() {
    return {
      dialog: false,
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
      search: "",
      value: null,
      filterTags: [],
      loading: false,
      show: true,
      enableTooltip: true,
      zoom: -10,
      center: [141.26713, 111.974814, 17],
      geojson: null,
      fillColor: "#e4ce7f",
      url: "https://geology.com/articles/mars/olympus-mons-volcano.jpg",
      // url: "http://leafletjs.com/examples/crs-simple/uqm_map_full.png",

      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      bounds: [
        [-100, -100],
        [400, 400],
      ],
      crs: CRS.Simple,
      stars: [
        { name: "Sol", lng: 175.2, lat: 145.0 },
        { name: "Mizar", lng: 41.6, lat: 130.1 },
        { name: "Krueger-Z", lng: 13.4, lat: 56.5 },
        { name: "Deneb", lng: 218.7, lat: 8.3 },
      ],
      travel: [
        [145.0, 175.2],
        [8.3, 218.7],
      ],
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

    headers() {
      let headers = [
        {
          text: "nombre",
          align: "start",
          filterable: true,
          value: "name",
          width: 200,
        },
        {
          text: "tags",
          align: "start",
          filterable: true,
          value: "tags",
          width: 20,
        },
      ];
      return headers;
    },
    shops() {
      let shops = [
        {
          id: 1,
          name: "Mercería B.E.A",
          icon: "mdi-shoe-heel",
          position: latLng(41.2790192, 1.974814, 17),
          instagram: "https://www.instagram.com/merceriabea/",
          website: "https://www.merceriabea.com/",
          tags: [
            "mercería",
            "costurera",
            "compostura",
            "lana",
            "mascarillas",
            "arreglos",
          ],
        },
        {
          id: 2,
          name: "Intez Inmuebles",
          instagram: "https://www.instagram.com/intezinmuebles/",
          icon: "mdi-office-building",
          website: "https://www.intez.es/",
          facebook: "https://www.facebook.com/intezinmuebles",
          position: latLng(41.2687408, 1.9863705),
          tags: [
            " inmuebles",
            " compra",
            " venta",
            " inmobiliaria",
            " apartamentos",
            " alquiler",
          ],
        },
        {
          id: 3,
          name: "Gominoles",
          icon: "mdi-muffin",
          instagram: "https://www.instagram.com/gominoles.castelldefels/",
          facebook: "https://www.facebook.com/gominoles.castelldefels/",
          position: latLng(41.2826747, 1.9798195),
          tags: [
            " gominoles",
            " dulces",
            " golosinas",
            " cumpleaños",
            " niños",
          ],
        },
        {
          id: 4,
          name: "La casa de la iaia",
          icon: "mdi-baby-face-outline",
          instagram: "https://www.instagram.com/lacasadelaiaiacastelldefels/",
          facebook: "https://www.facebook.com/ludotecacastelldefels/",
          position: latLng(41.2836019, 1.9790619),
          tags: [
            " ludoteca",
            " guardería",
            " fiestas infantiles",
            " cumpleaños",
            " niños",
          ],
        },
        {
          id: 5,
          name: "Naturbella",
          icon: "mdi-face-woman-outline",
          instagram: "https://www.instagram.com/naturbellacastelldefels/",
          facebook: "https://www.facebook.com/naturbellacastelldefels/",
          position: latLng(41.2831487, 1.9788344),
          website:
            "https://centre-estetica-naturbella-castelldefels.negocio.site/",
          tags: [
            " estética",
            " centro de estética",
            " peluquería",
            " manicura",
            " esmalte",
            " semipermanente",
          ],
        },
        {
          id: 6,
          name: "Delma Nails",
          icon: "mdi-face-woman-outline",
          instagram: "https://www.instagram.com/delmaelisa_nails/",
          position: latLng(41.2668608, 1.9789211),
          website: "https://delma-nails.negocio.site/",
          tags: [
            " estética",
            " centro de estética",
            " manicura",
            " esmalte",
            " semipermanente",
          ],
        },
      ];
      return shops;
    },
    filteredShops() {
      return this.shops.filter((item) => {
        return (
          item.name.toLowerCase().includes(this.search.toLowerCase()) ||
          item.tags.join("").toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
    tags() {
      let foundTags = [];
      this.shops.map((shop) => {
        foundTags = [...new Set([...foundTags, ...shop.tags])];
      });
      return foundTags;
    },
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
    styleFunction() {
      const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          color: "#ECEFF1",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 1,
        };
      };
    },
    onEachFeatureFunction() {
      if (!this.enableTooltip) {
        return () => {};
      }
      return (feature, layer) => {
        layer.bindTooltip(
          "<div>code:" +
            feature.properties.code +
            "</div><div>nom: " +
            feature.properties.nom +
            "</div>",
          { permanent: false, sticky: true }
        );
      };
    },
  },
  methods: {
    foundObstacle(degrees){
      this.dialogObstacle = true
      console.log(degrees)
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
              console.log('move north')
              northBound
                ? (this.dialog = true)
                : obstacle ? this.foundObstacle(degrees)
                : (this.rover.position.lat += 1);

            } else if (degrees == 90) {
              eastBound ? (this.dialog = true) 
                : obstacle ? this.foundObstacle(degrees)
                : (this.rover.position.lng += 1);
              console.log("move east");
            } else if (degrees == 180) {
              southBound
                ? (this.dialog = true)
                : obstacle ? this.foundObstacle(degrees)
                : (this.rover.position.lat -= 1);
            } else if (degrees == 270) {
              westBound ? (this.dialog = true)
                  : obstacle ? this.foundObstacle(degrees) 
                  : obstacle ? console.log(this.rover.position.lng) 
                  : (this.rover.position.lng -= 1)
              console.log("move west");
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
