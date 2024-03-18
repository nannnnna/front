<template>
    <div class="background-wrapper" :style="backgroundStyle" @click="closeMenu">
      <AppHeader />
      <div class="features-align-container">
        <FeaturesBlock />
      </div>
      <div class="main-content">
        <h1 class="main-title">{{ titleText }}</h1>
        <div class="button-wrapper">
          <button class="start-travel-button">{{ button_text }}<span class="corner corner-bottom-left"></span>
            <span class="corner corner-top-right"></span></button>
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
        axios.get('https://apidemo.besi.sh/api/main-page-content/')
          .then(response => {
            const data = response.data;
            this.menuItems = response.data.menuItems;
            this.backgroundUrl = `https://apidemo.besi.sh/${data.background_url}`;
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

    .features-align-container {
        display: flex;
        justify-content: flex-end; 
        align-items: center;
        height: 100%;
        width: 85%;
    }

    .background-wrapper {
        height: 100vh;
        width: 100vw;
        justify-content: center;
        align-items: center;
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
        position: relative;
        font-family: "MuseoSansCyrl", sans-serif;
        font-size: 16px;
        color: rgb(255, 255, 255);
        line-height: 1.2;
        text-align: center;
        background-color: rgba(22, 21, 29, 0.502);
        padding: 0;
        width: 100%; 
        height: 100%; 
        cursor: pointer;
        transition: all 0.3s ease;
        overflow: hidden;
        border: 1px solid rgba(100, 149, 237, 0.8);
        box-sizing: border-box;
  }
  
  .start-travel-button .corner {
        position: absolute;
        background-color: white;
        z-index: 12;
    }

    .corner-bottom-left {
        width: 8px;
        height: 2px;
        bottom: -1px;
        left: 0;
    }

    .corner-bottom-left::before {
        content: '';
        position: absolute;
        width: 2px;
        height: 8px;
        bottom: 0;
        left: -1px;
        background-color: white;
    }

    .corner-top-right {
        width: 8px;
        height: 2px;
        top: -1px;
        right: 0;
    }

    .corner-top-right::before {
        content: '';
        position: absolute;
        width: 2px;
        height: 8px;
        top: 0;
        right: -1px;
        background-color: white;
    }

    .main-title {
        font-size: 45.621px;
        font-family: "MuseoSansCyrl", sans-serif;
        color: rgb(255, 255, 255);
        text-transform: uppercase;
        line-height: 1.2;
        position: relative;
        margin: 0 auto;
        text-align: left;
        position: absolute;
        max-width: 500px;
        left: 500px;
        top: 214.954px;
        z-index: 4;
        transform: matrix(1.27134410390151,0,0,1.27134410390151,0,0);
        color: white; 
        background-image: linear-gradient(to right, white 0%, red 100%); 
        -webkit-background-clip: text; 
        background-clip: text;
        color: transparent;
    }
  
    @media (max-width: 900px) {
        .button-wrapper {
            position: absolute;
            left: 50%;
            top: calc(50% - 120px);
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

        .main-title {
            font-size: 6vw; 
            position: absolute; 
            left: 50%;
            top: 20%; 
            transform: translate(-50%, -50%);
            z-index: 10;
            color: #FFF; 
            max-width: 100%;
            text-shadow: 0px 0px 8px rgba(0,0,0,0.5); 
            background-image: linear-gradient(to right, white 0%, red 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
}
</style>





  