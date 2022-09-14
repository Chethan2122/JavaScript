<template>

  <div>
    <SearchElement @searchFunc="searchElement($event)" />
    <apiIntegration />
    <AddressEmp />
  </div>
</template>

<script>
import searchElement from '@/components/searchElement.vue'
import apiIntegration from './components/apiIntegration.vue';
import AddressEmp from './components/addressEmp.vue';
export default {
  name: 'App',

  components: {
    apiIntegration,
    AddressEmp,
    searchElement

  },

  data: () => ({
    //
  }),
};
</script>
