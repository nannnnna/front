<template>
  <div class="background-wrapper" :style="backgroundStyle" @click="closeMenu">
    <AppHeader />
    <FeaturesBlock />
    <div class="main-content">
      <h1 class="main-title">{{ titleText }}</h1>
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
        titleText: '',
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
            this.titleText = data.title_text;
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
    
    background-size: cover; 
    background-attachment: fixed; 
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .main-content {
    width: 100%; 
    height: 100%;
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
    left: calc(25% - 100px);
    top: calc(2/3 * 100vh);
    transform: translate(-50%, -50%);
    z-index: 11;
    width: 200px;
    height: 50px;
  }
  
  .start-travel-button {
    font-family: "MuseoSansCyrl", sans-serif;
    font-size: 16px;
    color: rgb(255, 255, 255);
    line-height: 1.2;
    text-align: center;
    background-color: rgba(22, 21, 29, 0.502);
    border: 1px solid transparent;
    padding: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .start-travel-button:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  
  .main-title {
    font-size: 45.621px;
    font-family: "MuseoSansCyrl", sans-serif;
    color: rgb(255, 255, 255);
    text-transform: uppercase;
    line-height: 1.2;
    text-align: left;
    position: absolute;
    left: 50%;
    top: 214.954px;
    transform: translateX(-50%) scale(1.27134410390151);
    z-index: 14;
    white-space: nowrap;
  }
  
  @media (max-width: 768px) {
    .button-wrapper {
      left: 10%;
      top: calc(2/3 * 100vh);
      transform: translate(-10%, -50%);
      width: 50%;
    }
    .start-travel-button {
      font-size: 3vw;
    }
  }
</style>




  