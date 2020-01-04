<template>
  <div>
    <b-collapse
      class="card has-rounded-corners"
      v-for="res in restaurants"
      :key="res.id"
      :open="opened[res.id]"
      @open="toggleOpen(res.id)"
      @close="toggleOpen(res.id)"
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
        <a class="card-footer-item rest-list-footer-item" :href="res.website" target="_blank">Visit Website</a>
      </footer>
    </b-collapse>
  </div>
</template>

<script>
  import DetailedRestaurant from "./DetailedRestaurant";
  import CompactRestaurant from "./CompactRestaurant";

  export default {
    name: "RestaurantList",
    components: {CompactRestaurant, DetailedRestaurant},
    props: {
      restaurants: {
        type: Array,
        required: true,
      },
    },

    watch: {
      restaurants(newVal, oldVal) {
        this.setAllOpen(false);
      },
    },

    data() {
      return {
        opened: {},
      }
    },

    methods: {
      toggleOpen(resId) {
        this.$set(this.opened, resId, !this.opened[resId]);
      },

      setAllOpen(bool) {
        for(let i = 0; i < this.$props.restaurants.length; i++){
          this.opened[i+1] = bool;
        }
      },
    },
  }
</script>

<style scoped>

</style>
