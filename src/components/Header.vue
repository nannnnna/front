<template>
  <div class="header">
    <img v-if="logoUrl" :src="`http://localhost:8000${logoUrl}`" alt="Logo" class="logo" />
    <button
        class="hamburger"
        @click="toggleMenu"
        v-show="isMobile"
        style="display:block; position: absolute; top: 20px; right: 20px;"
        >
        &#9776;
    </button>

    <nav v-show="isMenuOpen || !isMobile">
      <ul>
        <li v-for="item in menuItems" :key="item.name">
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
      };
    },
    created() {
      this.fetchMenuItems();
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    },
    unmounted() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      fetchMenuItems() {
        axios.get('http://localhost:8000/api/main-page-content/') 
          .then(response => {
            this.menuItems = response.data.menu_items;
            this.logoUrl = response.data.logo_url;
            console.log(this.logoUrl);
          })
          .catch(error => {
            console.error('Error fetching menu items:', error);
          });
      },
      toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Переключение состояния гамбургер-меню
    },
      handleResize() {
       this.isMobile = window.innerWidth < 768;
    }
    }
  };
</script>
  
  
<style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: transparent; 
    padding: 10px 20px;
  }
  
  .logo {
    height: 50px; 
    margin-right: 30px; 
  }
  
  nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  nav ul li {
    margin-right: 20px;
  }
  
  nav ul li:last-child {
    margin-right: 0;
  }
  
  nav ul li a {
    color: black;
    text-decoration: none; 
    font-size: 16px; 
    font-weight: bold;
    transition: color 0.3s ease; 
  }
  
  nav ul li a:hover {
    color: #ccc; 
  }
  .hamburger {
    display: none;
    font-size: 26px;
    background: none;
    border: none;
    color: black;
 }
 .mobile-menu {
   display: none;
 }
  

  @media (max-width: 768px) {
    .mobile-menu {
    display: block;
    }
    .header {
      flex-direction: column;  
      align-items: flex-start;
    }
  
    .logo {
      margin-bottom: 15px;
    }
    .hamburger {
        display: block;
        margin-left: auto;
    }
  
    nav ul {
      flex-direction: column; 
      align-items: flex-start;
      width: 100%;
    }
  
    nav ul li {
      margin-right: 0; 
      margin-bottom: 10px;
    }
  }
</style>
  