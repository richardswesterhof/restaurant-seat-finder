<template>
  <div>
    <h3>
      Filters:
    </h3>

    <template v-for="filter in filters">
      <div>
        <div class="block" v-if="filter.type === FTEnum.radioButton">
          <b-radio
            v-for="option in filter.options"
            :key="option.value"
            :name="filter.displayName"
            :native-value="option"
            @input="radioSelect(filter, option)"
          >
            {{option.displayName}}
          </b-radio>
        </div>


        <div v-else-if="filter.type === FTEnum.checkbox">
          (checkbox)
        </div>

        <div v-else-if="filter.type === FTEnum.checkboxList" class="block">
          <b-checkbox
            v-for="option in filter.options"
            :key="option.value"
            :native-value="option"
            @input="checkboxListToggle(filter, option)"
          >
            {{option.displayName}}
          </b-checkbox>
        </div>

        <div v-else-if="filter.type === FTEnum.dropdown">
          (dropdown)
        </div>

        <div v-else-if="filter.type === FTEnum.inputField">
          (input field)
        </div>

        <div v-else-if="filter.type === FTEnum.slider">
          (slider)
        </div>

        <div v-else>
          oops! {{filter.type}} is not a known filter type
        </div>

      </div>
    </template>

  </div>
</template>

<script>
  import FilterTypeEnum from '../../utils/enums/filterTypeEnum';

  export default {
    name: "RestaurantFilters",

    props: {
      filters: {
        type: Array,
        required: true,
      },
    },

    data() {
      return {
        FTEnum: FilterTypeEnum.enum,
        filterValues: this.$props.filters.slice(),
      }
    },

    methods: {
      radioSelect(filter, selected) {
        this.filterValues.find(item => filter === item).selected = selected;
        this.notifyParent();
      },

      checkboxListToggle(filter, toggled) {
        filter = this.filterValues.find(item => filter === item);
        if(!filter.selected) {
          filter.selected = []
        }
        let ind = filter.selected.findIndex(toggle => toggled === toggle);
        if(ind >= 0) {
          //we have to remove it from the list
          filter.selected.splice(ind, 1);
        }
        else {
          //we have to add it to the list
          filter.selected.push(toggled);
        }

        this.notifyParent();
      },



      notifyParent() {
        this.$emit("filter-update");
      },



      getFilterValues() {
        return this.filterValues;
      },
    },


  }
</script>

<style scoped>

</style>
