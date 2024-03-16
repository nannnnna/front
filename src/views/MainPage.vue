<template>
  <div class="background-wrapper" :style="backgroundStyle">
    <AppHeader />
    <div class="main-content">
      <h1>{{ headline }}</h1>
      <p>{{ subHeadline }}</p>
    </div>
  </div>
</template>


  
  <script>
  import axios from 'axios';
  import AppHeader from '@/components/Header.vue';
  
  export default {
    name: 'MainPage',
    components: {
      AppHeader
    },
    data() {
      return {
        headline: '',
        subHeadline: '',
        menuItems: [],
        backgroundUrl: '',
      };
    },
    created() {
      this.fetchMainContent();
    },
    computed: {
      backgroundStyle() {
        return {
          backgroundImage: this.backgroundUrl ? `url(${this.backgroundUrl})` : ''
        };
      }
    },
    methods: {
      fetchMainContent() {
        axios.get('http://localhost:8000/api/main-page-content/')
          .then(response => {
            const data = response.data;
            this.headline = data.headline;
            this.subHeadline = data.sub_headline;
            this.menuItems = response.data.menuItems;
            this.backgroundUrl = `http://localhost:8000${data.background_url}`;
          })
          .catch(error => {
            console.error('Error fetching menu items', error);
          });
      }
    }
  }
  </script>
  
<style scoped>
  .background-wrapper {
    min-height: 100vh; /* Ensure the background covers the full viewport height */
    background-repeat: no-repeat; /* Prevent background from repeating */
    background-size: cover; /* Cover the entire area of the element */
    background-attachment: fixed; /* Keep the background fixed in place when scrolling */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .main-content {
    width: 100%; /* Ensure the content does not exceed the width of the viewport */
    max-height: 100vh; /* Ensure the content does not exceed the height of the viewport */
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center content vertically */
    align-items: center; /* Center content horizontally */
    color: white; /* Set text color for visibility against dark background */
    text-align: center; /* Center text */
  }
  
  /* Make sure the AppHeader is positioned correctly and does not have its own background */
 
  
  /* Ensure that the body element has no margin */
  body {
    margin: 0; /* Remove default margin */
  }
  
  /* If you need to ensure that there is no scroll, you might want to hide overflow on the body */
  body {
    overflow: hidden; /* Hide scroll bars */
  }
</style>
  