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
        axios.get('https://apidemo.besi.sh/api/features-content/')
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
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: fit-content;
  max-height: 600px; 
  overflow-y: auto; 
  padding: 20px;
  color: white;
  font-family: "MuseoSansCyrl";
}

.feature-block {
  padding: 40px;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}


.feature-title {
  font-size: 1.5em;
  font-weight: normal; 
  margin-bottom: 0.5em;
  opacity: 0.6;
}

.feature-value {
  font-size: 4em;
  font-weight: bold; 
}

.feature-description {
  font-size: 1.7em; 
  font-weight: normal; 
  opacity: 0.8;
}


@media (max-width: 900px) {
  .features-container {
    grid-template-columns: repeat(2, 1fr);
    padding: 10px;
    gap: 15px;
  }

  .feature-block {
    margin: 0;
    padding: 15px;
  }
  .feature-title {
    font-size: 1em;
    opacity: 0.6;
  }

  .feature-value {
    font-size: 1.8em;
  }

  .feature-description {
    font-size: 0.9em;
    opacity: 0.8;
  }

  
}


</style>
  