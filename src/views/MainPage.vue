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
    html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    }

  .background-wrapper {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0; 
    background-repeat: no-repeat; 
    background-size: cover; 
    background-position: center center;
    position: fixed; 
    top: 0;
    left: 0;
    z-index: -1; 
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
  
  @media (max-width: 900px) {
    .button-wrapper {
    position: absolute;
    left: 50%;
    top: 120px;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 40px;
    z-index: 3;
  }

  .start-travel-button {
    font-size: 14px;
    padding: 10px 20px;
    width: auto;
    height: auto;
  }

  body {
    overflow: auto;
    background-attachment: scroll;
  }
    .background-wrapper {
    background-attachment: scroll;
    background-size: cover;
    background-position: center center;
    min-height: 100vh;
   }
   .main-content {
    max-height: none;
  }

  .main-title {
    font-size: 24px;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    z-index: 2;
  }
  }
</style>





  