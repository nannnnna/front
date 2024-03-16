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
    min-height: 100vh; 
    background-repeat: no-repeat; 
    background-size: cover; 
    background-attachment: fixed; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .main-content {
    width: 100%; 
    max-height: 100vh; 
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    color: white;
    text-align: center; 
  }
  
  body {
    margin: 0; 
  }
  
  body {
    overflow: hidden; 
  }
</style>
  