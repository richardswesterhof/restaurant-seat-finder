<template>
  <div class="content">
    <RestaurantList></RestaurantList>
  </div>
</template>

<script>
  import RestaurantList from "./RestaurantList";
  import RestaurantFilters from "./RestaurantFilters";
  export default {
    name: "HomePage",
    components: {RestaurantFilters, RestaurantList},
  }
</script>

<style scoped>
  .content{
    background-color: var(--lightGrey);
    width: 100%;
    margin-bottom: 30px;
    margin-right: -1%;
    margin-left: 1%;
  }
</style>
