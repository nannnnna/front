<template>
    <div class="header">
      <div class="logo-container">
          <img v-if="logoUrl" :src="`http://localhost:8000${logoUrl}`" alt="Logo" class="logo" />
      </div>
      <button class="hamburger" @click.stop="toggleMenu" v-if="isMobile">
          {{ isMenuOpen ? '✕' : '&#9776;' }}
      </button>
      <nav :class="{ 'is-open': isMenuOpen }">
          <ul>
              <li v-for="item in menuItems" :key="item.name">
                <div @click="closeMenu">
                    <router-link :to="item.url">{{ item.name }}</router-link>
                </div>
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
        closeMenu() {
            this.isMenuOpen = false;
        }
    },
    mounted() {
        this.isMobile = window.innerWidth < 900;
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth < 900;
        });
        document.addEventListener('click', (event) => {
            if (!this.$el.contains(event.target) && this.isMenuOpen) {
                this.closeMenu();
            }
        });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('click', this.handleClickOutside);
    },
    watch: {
        '$route'() {
            this.closeMenu();
        }
        }
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
        width: 20px; 
        height: 20px; 
        background-color: transparent;
    }

    .corner::before, .corner::after {
        content: '';
        position: absolute;
        background-color: white; 
    }

    .corner::before {
        width: 100%; 
        height: 2px; 
        top: 0;
    }

    .corner::after {
        width: 2px; 
        height: 100%;
        left: 0;
    }

    .corner-top-left {
        top: -2px;
        left: -2px;
    }

    .corner-top-right {
        top: -2px;
        right: -2px;
        transform: rotate(90deg); 
    }

    .corner-bottom-left {
        bottom: -2px;
        left: -2px;
        transform: rotate(270deg);
    }

    .corner-bottom-right {
        bottom: -2px;
        right: -2px;
        transform: rotate(180deg); 
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
        font-size: 24px;
        background: none;
        border: none;
        color: white;
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
        display: none;
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

  