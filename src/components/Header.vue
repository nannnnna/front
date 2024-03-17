<template>
  <div class="header">
        <div class="figure-2">
            <span class="corner corner-top-left"></span>
            <span class="corner corner-top-right"></span>
            <span class="corner corner-bottom-left"></span>
            <span class="corner corner-bottom-right"></span>
        </div>
            <div class="logo-container">
                <img v-if="logoUrl" :src="`http://localhost:8000${logoUrl}`" alt="Logo" class="logo" />
            </div>
            <button class="hamburger" @click="toggleMenu" v-if="isMobile">
            &#9776;
            </button>

            <nav :class="{ 'is-open': isMenuOpen }" @click.stop>
            <ul>
                <li v-for="item in menuItems" :key="item.name" >
                <router-link :to="item.url">{{ item.name }}</router-link>
                </li>
            </ul>
            </nav>
  </div>
</template>
  
<script>
  import axios from 'axios';
  
  export default {
    name: 'AppHeader',
    data() {
      return {
        menuItems: [],
        logoUrl: '',
        isMenuOpen: false,
        isMobile: false,
      };
    },
    created() {
      this.fetchMenuItems();
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
    },
    computed: {
        currentRoute() {
            return this.$route.path;
        }
    },
    methods: {
      fetchMenuItems() {
        axios.get('http://localhost:8000/api/main-page-content/') 
          .then(response => {
            this.menuItems = response.data.menu_items;
            this.logoUrl = response.data.logo_url;
          })
          .catch(error => {
            console.error('Error fetching menu items:', error);
          });
      },
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    },
      handleResize() {
        this.isMobile = window.innerWidth < 768;
      },
    },
    mounted() {
      this.handleResize();
  },
  };
</script>
  
  
<style scoped>
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 2rem 2rem;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        position: relative;
    }
    .figure-2 {
        opacity: 0.212;
        position: absolute;
        left: 150px;
        top: 0px;
        width: 400px;
        height: 100%;
        z-index: 44;
        border: 2px solid rgba(255, 255, 255, 0.5);
    }
    .corner {
        position: absolute;
        width: 20px; /* Ширина линии уголка */
        height: 20px; /* Высота линии уголка */
        background-color: transparent;
    }

    .corner::before, .corner::after {
        content: '';
        position: absolute;
        background-color: white; /* Цвет уголков */
    }

    .corner::before {
        width: 100%; /* Полная ширина родителя */
        height: 2px; /* Высота горизонтальной линии */
        top: 0;
    }

    .corner::after {
        width: 2px; /* Ширина вертикальной линии */
        height: 100%; /* Полная высота родителя */
        left: 0;
    }

    .corner-top-left {
        top: -2px; /* Смещаем наружу от границы */
        left: -2px;
    }

    .corner-top-right {
        top: -2px;
        right: -2px;
        transform: rotate(90deg); /* Поворачиваем уголок */
    }

    .corner-bottom-left {
        bottom: -2px;
        left: -2px;
        transform: rotate(270deg); /* Поворачиваем уголок */
    }

    .corner-bottom-right {
        bottom: -2px;
        right: -2px;
        transform: rotate(180deg); /* Поворачиваем уголок */
    }

    .logo {
        position: relative;
        font-family: "MuseoSansCyrl", sans-serif;
        font-size: 16px;
        color: rgb(255, 255, 255);
        line-height: 1.2;
        text-align: center;
        border: 1px solid transparent;
        padding: 0;
        width: 100%;
        max-height: 50px;
        max-width: 300px;
        cursor: pointer;
        transition: all 0.3s ease;
        overflow: hidden;
        margin-left: 200px;
    }

    nav {
        flex: 1;
        display: flex;
        justify-content: center; 
    }

    nav ul {
        list-style-type: none;
        display: flex;
        margin: 0;
        padding: 0;
        font-size: 20px;
        font-family: "MuseoSansCyrl";
        color: rgb(255, 255, 255);
        line-height: 1.375;
    }

    nav ul li {
        padding: 0 25px;  
    }

    nav ul li a {
        color: inherit;
        text-decoration: none;
    }

    nav ul li a:hover {
        color: #ccc;
    }

    .hamburger {
        display: none;
        cursor: pointer;
    }

@media (max-width: 900px) {
    .header {
        padding: 10px;
        justify-content: space-around; 
  }

    .logo {
        margin-left: 0; 
  }

    .hamburger {
        display: block;
        position: absolute;
        top: 1rem;
        right: 1rem;
  }

    nav ul {
        flex-direction: column;
        align-items: flex-start;
        background-color: rgba(0, 0, 0, 0.8);
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100vh;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
  }

    nav.is-open ul {
        transform: translateX(0);
        display: block;
  }

    nav ul li {
        width: 100%;
        text-align: left;
        padding: 15px;
  }
}
</style>

  