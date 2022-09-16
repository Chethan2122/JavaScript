<template>

  <div>
    <router-link to="/apiIntegration">apiIntegration</router-link> |
    <router-link to="/addressEmp">addressEmp</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
};
</script>
