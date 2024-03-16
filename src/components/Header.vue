<template>
  <div class="header">
    <img v-if="logoUrl" :src="`http://localhost:8000${logoUrl}`" alt="Logo" class="logo" />
    <nav>
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
            console.log(this.logoUrl);
          })
          .catch(error => {
            console.error('Error fetching menu items:', error);
          });
      }
    }
  };
</script>
  
  
<style scoped>
  .header {
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5); 
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
  }
  
  nav ul li {
    margin-right: 20px;
  }
  
  nav ul li:last-child {
    margin-right: 0;
  }
  
  nav ul li a {
    color: white;
    text-decoration: none; 
    font-size: 16px; 
    font-weight: bold;
    transition: color 0.3s ease; 
  }
  
  nav ul li a:hover {
    color: #ccc; 
  }
  

  @media (max-width: 768px) {
    .header {
      flex-direction: column; 
    }
  
    .logo {
      margin-bottom: 15px;
    }
  
    nav ul {
      flex-direction: column; 
    }
  
    nav ul li {
      margin-right: 0; 
      margin-bottom: 10px;
    }
  }
</style>
  