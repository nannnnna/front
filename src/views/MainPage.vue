<template>
  <div class="background-wrapper" :style="backgroundStyle" @click="closeMenu">
    <AppHeader />
    <FeaturesBlock />
    <div class="main-content">
      <div class="button-wrapper">
        <button class="start-travel-button">{{ button_text }}</button>
      </div>
    </div>
  </div>
</template>


  
  <script>
  import axios from 'axios';
  import AppHeader from '@/components/Header.vue';
  import FeaturesBlock from '@/components/FeaturesBlock.vue';

  
  export default {
    name: 'MainPage',
    components: {
      AppHeader,
      FeaturesBlock,
    },
    data() {
      return {
        headline: '',
        subHeadline: '',
        menuItems: [],
        backgroundUrl: '',
        button_text: '',
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
            this.menuItems = response.data.menuItems;
            this.backgroundUrl = `http://localhost:8000${data.background_url}`;
            this.button_text = data.button_text;
          })
          .catch(error => {
            console.error('Error fetching menu items', error);
          });
      },
      closeMenu(event) {
        if (this.isMenuOpen && !event.target.closest('.header')) {
            this.isMenuOpen = false;
      }
    },
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
  .button-wrapper {
    position: absolute;
    left: 376px; /* Adjusted based on your Photoshop details */
    top: 381px;
    z-index: 11;
    width: 178px; /* Width of the clickable area */
    height: 33px; /* Height of the clickable area */
  }

  .start-travel-button {
    font-family: "MuseoSansCyrl", sans-serif; /* Ensure you have this font loaded */
    font-size: 14px;
    color: rgb(255, 255, 255);
    line-height: 1.2;
    text-align: left;
    background-color: rgba(22, 21, 29, 0.502); /* Semi-transparent background */
    border-width: 1px;
    border-style: solid;
    border-color: transparent; /* Set border color if needed */
    padding: 0; /* No padding, size is controlled by wrapper */
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  /* For the hover state of the button */
  .start-travel-button:hover {
    background-color: rgba(255, 255, 255, 0.8); /* Adjust hover background color as needed */
    /* Add any other hover styles you need */
  }

  .background-wrapper {
    /* ... existing styles ... */
    position: relative; /* Needed for absolute positioning of children */
  }
  
</style>
  