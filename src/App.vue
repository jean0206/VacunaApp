<template>
  <v-app >
        <v-app-bar
      absolute
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon href="https://github.com/jean0206/VacunaApp" target="blank">
        <v-icon>mdi-github</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Home/>
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
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
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

export default {
  name: 'App',

  components: {
    Home
  },

  data: () => ({
    //
  })
}
</script>

<style scoped>
</style>
