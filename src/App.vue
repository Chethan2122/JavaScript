<template>
  
    <div>
      <ApiPost/>
     <apiIntegration />
    </div>
</template>

<script>
import apiIntegration from './components/apiIntegration.vue';
import ApiPost from './components/apiPost.vue';
export default {
  name: 'App',

  components: {
    apiIntegration,
    ApiPost
},

  data: () => ({
    //
  }),
};
</script>
