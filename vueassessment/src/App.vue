<template>
  
  <div>
    <router-link to="/customerDetails">customerDetails</router-link> |
    <router-link to="/hotelDetails">hotelDetails</router-link>
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