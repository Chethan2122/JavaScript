<template>

  <div>
    <!-- <SearchElement @searchFunc="searchElement($event)" /> -->
    <router-link to="/apiIntegration">apiIntegration</router-link> |
    <router-link to="/addressEmp">addressEmp</router-link>
    <router-view/>
  </div>
</template>

<script>
// import searchElement from '@/components/searchElement.vue'
// import apiIntegration from './components/apiIntegration.vue';
// import AddressEmp from './components/addressEmp.vue';
export default {
  name: 'App',

  components: {
    // apiIntegration,
    // AddressEmp,
    // searchElement

  },

  data: () => ({
    //
  }),
};
</script>
