<template>
  <div>
    <div id="restaurantMainMap" style="height: 75vh">
    </div>
    <p style="text-align:right; color:gray" v-show="mapError">{{mapNotShowingMessage}}</p>
  </div>
</template>

<script>
  import * as L from "leaflet";
  import tokens from "../../top_secret_files/tokenList";

  export default {
    name: "RestaurantMap",

    props: {
      restaurants: {
        type: Array,
        required: true,
      },
    },

    data() {
      return {
        map: null,

        restaurantMarkers: [],

        mapError: false,
        mapNotShowingMessage: process.env.NODE_ENV === 'production' ?
          'Map not showing? That means we messed something up in our configurations :(\nPlease let us know' :
          'It looks like you forgot to enter a value for maxboxToken in src/top_secret_files/tokenList.js',
      }
    },

    methods: {
      getMap() {
        return this.map;
      },

      makeMap() {
        let myCoords = this.$store.getters.position.coords;
        let self = this;

        //create the shell of the map
        this.map = L.map('restaurantMainMap', {
          center: [myCoords.latitude, myCoords.longitude],
          zoom: 13,
        });

        //add tiles to the shell, these are the actual map images
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          minZoom: 8,
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          accessToken: tokens.mapboxToken,
          //these options make the scaling of the text a bit nicer
          tileSize: 512,
          zoomOffset: -1,
        }).on('tileerror', function() {
          if(!self.mapError) {
            self.$buefy.toast.open({message: 'could not load map tiles', type: 'is-danger'});
          }
          self.mapError = true;
        }).addTo(this.map);

        this.restaurantMarkers.push({id: 'self', marker: L.marker([myCoords.latitude, myCoords.longitude]).addTo(this.map)});

        this.$props.restaurants.forEach(function(item, index) {
          //self.restaurantMarkers.push({id: item.id, marker: L.marker([item.latitude, item.longitude]).addTo(this.map)});
          console.log(item, index, self);
        });
      },
    },
  }
</script>

<style scoped>

</style>
