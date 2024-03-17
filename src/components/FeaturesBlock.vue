<template>
    <div class="features-container">
      <div class="feature-block" v-for="feature in features" :key="feature.title">
        <div class="feature-title">{{ feature.title }}</div>
        <div class="feature-value">{{ feature.value }}</div>
        <div class="feature-description">{{ feature.description }}</div>
      </div>
    </div>
</template>
  
<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        features: [],
      };
    },
    created() {
      this.fetchFeatures();
    },
    methods: {
      fetchFeatures() {
        axios.get('http://localhost:8000/api/features-content/')
          .then(response => {
            this.features = response.data.features;
          })
          .catch(error => {
            console.error('Error fetching features', error);
          });
      },
    },
  };
</script>
  
<style scoped>
.features-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 0 auto;
}

.feature-block {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 0px 0px rgba(255, 255, 255, 0.2);
  position: relative; /* Needed for absolute positioning of children */
}


.feature-title {
  font-size: 1.5em; 
  margin-bottom: 0.5em;
}

.feature-value {
  font-size: 2.5em; 
  font-weight: bold; 
}

.feature-description {
  font-size: 1em;
  opacity: 0.7;
}


@media (max-width: 900px) {
  .features-container {
    grid-template-columns: repeat(2, 1fr);
    padding: 10px;
  }

  .feature-block {
    margin: 0;
    padding: 10px;
  }
  .feature-title {
    font-size: 1em;
  }

  .feature-value {
    font-size: 1.8em;
  }

  .feature-description {
    font-size: 0.9em;
  }

  
}


</style>
  