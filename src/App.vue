<template>
  <v-app >

        <v-app-bar
      absolute
      flat
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
    <v-btn v-if="this.$router.currentRoute.path=='/vaccines'" to="/dashboard" outlined color="primary">
      <span>Departamentos</span>

      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
    <v-btn v-if="this.$router.currentRoute.path=='/dashboard'" to="/vaccines" outlined color="primary">
      <span>Vacunas</span>

      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon href="https://github.com/jean0206/VacunaApp" target="blank">
        <v-icon>mdi-github</v-icon>
      </v-btn>


      <v-btn @click="logout" v-if="this.$router.currentRoute.path=='/dashboard' || this.$router.currentRoute.path=='/vaccines'" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>

     <v-footer
     class="mt-6"
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        color="white"
        text
        rounded
        class="my-2"
      >
    
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} <strong></strong>
      </v-col>
    </v-row>
  </v-footer>
  </v-app>
</template>

<script>
import Home from './components/Home'
import axios from 'axios'

export default {
  name: 'App',

  components: {
    Home
  },

  data: () => ({
    url:'http://127.0.0.1:3030',
  }),
  methods:{
    logout(){
      document.cookie="token="
      localStorage.removeItem('user')
      this.$router.push('/')
    }
  },
  beforeMount(){
    axios.get(
      this.url+'/state').then(response=>{console.log(response.data)})
  }
}
</script>
  
<style scoped>
</style>
