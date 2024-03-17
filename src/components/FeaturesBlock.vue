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
.display-flex-center {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100vh;
}
.features-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: fit-content;
  max-height: 600px; 
  overflow-y: auto; 
  padding: 20px;
}

.feature-block {
  /* width: calc(50% - 10px); 
  margin-bottom: 20px;  */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
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
  