<template>
  <div class="columns">
    <div class="column is-10 is-offset-1">
      <h2 class="has-text-centered has-text-centered-mobile" style="margin-bottom:2vh; margin-left:2%;">Restaurants Nearby</h2>

      <b-loading :active="isLoading"></b-loading>
      <div style="text-align: center">
        <p v-show="displayPatienceMessage">Please be patient, our server was just taking a coffee break</p>
      </div>

      <b-collapse
        class="card has-rounded-corners"
        v-for="res in restaurants"
        :key="res.id"
        :open="opened[res.id]"
        @open="toggleOpen(res.id)"
        @close="toggleOpen(res.id)"
        v-show="!isLoading"
        style="margin: 0 2% calc(0.4vh + 3px) 2%;"
      >
        <div
          slot="trigger"
          slot-scope="props"
          class="card-header"
          role="button"
          style="border-radius: 16px;">
          <CompactRestaurant :res-data="res" class="card-header-title"></CompactRestaurant>
          <a class="card-header-icon">
            <b-icon
              pack="fas"
              :icon="props.open ? 'fa fa-caret-up' : 'fa fa-caret-down'">
            </b-icon>
          </a>
        </div>


        <div class="card-content">
          <DetailedRestaurant :res-data="res" class="content"></DetailedRestaurant>
        </div>


        <footer class="card-footer">
          <a class="card-footer-item rest-list-footer-item" href="https://google.com" target="_blank">Visit Website</a>
        </footer>
      </b-collapse>
    </div>

  </div>

</template>

<script>
  import CompactRestaurant from "./CompactRestaurant";
  import api from "../../api/api_wrapper";
  import DetailedRestaurant from "./DetailedRestaurant";
  import Timing from "../../utils/Timing";

  export default {
    name: "RestaurantList",
    components: {DetailedRestaurant, CompactRestaurant},

    data() {
      return {
        restaurants: [],
        opened: {},
        isLoading: true,
        displayPatienceMessage: false,
      }
    },

    async mounted() {
      await this.getRestaurants();
    },

    methods: {
      async getRestaurants() {
        this.isLoading = true;
        let loadingTooLong = window.setTimeout(function(self) {
          self.displayPatienceMessage = true;
        }, 1000, this);

        // await Timing.sleep(5000);

        await api.getPlaces().then((response) => {
          if(response && response.status === 200) {
            this.restaurants = response.data;
          }
          else {
            this.$buefy.toast.open({message: 'request failed with status code: ' + ((response && response.status) ? response.status : 'unknown status'), type: 'is-danger'});
            console.error(response);
          }
          this.isLoading = false;
          window.clearTimeout(loadingTooLong);
          this.displayPatienceMessage = false;

          for(let i = 0; i < this.restaurants.length; i++){
            this.opened[i+1] = false;
          }
        });
      },

      toggleOpen(resId) {
        this.$set(this.opened, resId, !this.opened[resId]);
      },

      confirmUpdate(resId, amount) {
        console.log(resId + "'s amount of seats will be updated to " + amount);
        api.updateSeats(resId, amount).then((response) => {
          if(response && response.status === 200) {
            this.$buefy.toast.open({message: 'thank you for your contribution, the amount of free seats has been updated', type: 'is-success'});

            for(let i = 0; i < this.restaurants.length; i++) {
              let newRest = this.restaurants[i];
              if(newRest.id === resId) {
                newRest.free_seats = response.data.free_seats;
                this.restaurants.splice(i, 1, newRest)
              }
            }
          }
          else {
            this.$buefy.toast.open({message: 'request failed with status code: ' + ((response && response.status) ? response.status : 'unknown status'), type: 'is-danger'});
            console.error(response);
          }
        });
      },
    }
  }
</script>

<style scoped>
.columns{
  background-color: var(--lightGrey);
}
</style>
