<template>
  <div class="header">
    <img v-if="logoUrl" :src="`http://localhost:8000${logoUrl}`" alt="Logo" class="logo" />
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
  padding: 1rem 2rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  border-bottom: 1px solid #fff;
}

.logo {
  height: 50px;
  margin-left: 16rem; 
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

  