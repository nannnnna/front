<template>
    <div>
        <AppHeader />
        <h1>{{ headline }}</h1>
        <p>{{ subHeadline }}</p>
    </div>
</template>
 
<script>
import axios from 'axios';
import AppHeader from '@/components/Header.vue';

export default {
    components: {
        AppHeader
    },
    data() {
        return {
            headline: '',
            subHeadline: '',
            menuItems: []
        };
    },
    created() {
        axios.get('/api/menu-items/')
        .then(response => {
            this.menuItems = response.data.menuItems;
        })
        .catch(error => {
            console.error('Error fetching menu items', error);
        });
    }
}
</script>
 
<style scoped>
/* Стили для главной страницы */
</style>