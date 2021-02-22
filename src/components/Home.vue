<template>
  <div>
    <v-carousel :show-arrows="false" hide-delimiters>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        src="@/assets/header_covid.png"
        reverse-transition="fade-transition"
        transition="fade-transition"
        height="100%"
      >
        <v-sheet color="transparent" height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h2 text-center title">
              Vacunación en Colombia
              <div class="text-h6 text-center title-count">
                Vacunas : {{ inicio.toLocaleString() }}
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-container fluid class=" background-vaccines">
      <v-row>
        <v-col>
          <div class="text-h3 mt-8 text-center title-vaccines">
            Vacunas adquiridas
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="background-vaccines pl-6">
      <v-row dense class="" align="center" justify="center">
        <v-col
          v-for="(vac, key) in vaccines"
          :key="key"
          cols="12"
          sm="4"
          md="4"
          xs="12"
          class="pl-6 pr-6"
        >
          <v-card color="#2779e2" dark class="rounded-xl" elevation="6">
            <v-card-title class="text-bold ">
              {{ vac.name }}
            </v-card-title>

            <div style="margin-top:-4%">
              <v-card-actions class="text-center ml-2">
                Cantidad adquiridad : {{ vac.amount.toLocaleString() }} dosis
              </v-card-actions>
              <v-card-actions class="text-center ml-2">
                Dosis por persona : {{ vac.dose }}
              </v-card-actions>
              <v-card-actions class="text-center ml-2">
                Paise de origen : {{ vac.origin }}
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class=" background-vaccines">
      <v-row>
        <v-col>
          <div class="text-h3 mt-8 text-center title-vaccines">
            Personas vacunadas
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class=" background-vaccines">
      <v-row>
        <v-col class="ml-10 mr-10 pl-4 pr-4">
          <v-progress-linear
            color="blue lighten-2"
            height="20"
            :buffer-value="percenteg"
            stream
          >
            {{ percenteg }}%</v-progress-linear
          >
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class=" background-vaccines">
      <v-row>
        <v-col>
          <div align="center" justify="center">
            <div
              style=" width:42%; border: solid;"
              class="text-h4 mt-8 text-center title-vaccines"
            >
              Dosis aplicadas: {{ counter }}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class=" background-vaccines">
      <v-row>
        <v-col>
          <div class="text-h3 mt-8 text-center title-vaccines">
            Datos por municipio
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class=" background-vaccines">
      <v-row>
        <v-col class="pl-10 pr-10">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">
                    Departamento
                  </th>
                  <th class="text-center">
                    Cantidad vacunados
                  </th>
                  <th class="text-center">
                    Población
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center" v-for="item in states" :key="item._id">
                  <td>{{ item.nameState }}</td>
                  <td>{{ item.vaccinated }}</td>
                  <td>{{ item.population }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import apiRoute from "../lib/routeApi";

export default {
  name: "HelloWorld",
  data: () => ({
    items: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
      }
    ],
    total: 0,
    speed: 200,
    inicio: 0,
    states: [],
    url: apiRoute.apiRoute,
    vaccines: [],
    counter: 0,
    percenteg: 0,
    population: 50300000
  }),
  methods: {
    updateCount(total, inicio) {
      const target = +this.total;
      const count = +this.inicio;
      const inc = target / this.speed;
      // console.log(count)
      if (count < target) {
        this.inicio = count + inc;
        setTimeout(this.updateCount, 1);
      } else {
        this.inicio = this.total;
      }
    },
    async getVaccines() {
      await axios.get(this.url + "/vaccine/").then(response => {
        this.vaccines = response.data;
      });
    }
  },
  async beforeMount() {
    await this.getVaccines();
    for (let vaccine in this.vaccines) {
      this.total += this.vaccines[vaccine].amount;
    }
    this.updateCount();
    await axios
      .get(this.url + "/state")
      .then(response => {
        this.states = response.data.states;
      })
      .catch(error => {
        console.log(error);
      });

    for (let state in this.states) {
      this.counter += this.states[state].vaccinated;
    }
    this.percenteg = ((this.counter / this.population) * 100).toFixed(1);
  }
};
</script>

<style scoped>
.title {
  font-weight: bold !important;
  color: #23286b !important;
}
.title-count {
  color: #23286b65 !important;
}
.title-vaccines {
  font-weight: bold !important;
  color: #23286bda !important;
}
.background-vaccines {
  background-color: #c3d9fd1f;
}
</style>
