<template>
  <div style="margin-top:65px">
    <v-container>
      <v-row>
        <v-col md="6" cols="12" lg="6" xl="6">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">
                  Añadir nueva vacuna
                </div>

                <v-text-field
                  v-model="newVaccine.name"
                  dense
                  label="Nombre"
                  outlined
                ></v-text-field>
                <v-textarea
                  outlined
                  v-model="newVaccine.description"
                  name="input-7-4"
                  label="Descripción"
                ></v-textarea>
                <v-text-field
                  v-model="newVaccine.dos"
                  type="number"
                  dense
                  label="Dosis"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="newVaccine.origin"
                  dense
                  label="Pais de origen"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="newVaccine.amount"
                  type="number"
                  dense
                  label="Cantidad adquirida"
                  outlined
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions class="">
              <v-btn class="ma-2" color="primary" @click="addVaccine">
                Añadir
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="6" cols="12" lg="6" xl="6">
          <v-container>
            <v-row class="text-center">
              <h2 class="">Vacunas</h2>
            </v-row>
            <v-row>
              <v-col cols="6" v-for="(item, key) in vacunas" :key="key">
                <v-card
                  style="padding:6%;"
                  class="mx-auto"
                  color="primary"
                  dark
                  max-width="270"
                >
                  <strong> Nombre :</strong> {{ item.name }} <br />
                  <strong>Descripción :</strong> {{ item.description }}<br />
                  <strong>Número de dosis: </strong> {{ item.dose }}<br />
                  <strong>País de origen:</strong> {{ item.origin }}<br />
                  <strong>Cantidad adquirida: </strong>{{ item.amount }}<br />
                  <v-btn @click="edit(key)" color="success" fab small dark>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>

                  <v-btn @click="deleteVaccine(key)" style="margin-left:2%" color="error" fab small dark>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card>
                
              </v-col>
            </v-row>
          </v-container>
          <div></div>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" persistent max-width="344">
      <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">
                  Editar vacuna
                </div>

                <v-text-field
                  v-model="editVaccine.name"
                  dense
                  label="Nombre"
                  outlined
                ></v-text-field>
                <v-textarea
                  outlined
                  v-model="editVaccine.description"
                  name="input-7-4"
                  label="Descripción"
                ></v-textarea>
                <v-text-field
                  v-model="editVaccine.dose"
                  type="number"
                  dense
                  label="Dosis"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="editVaccine.origin"
                  dense
                  label="Pais de origen"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="editVaccine.amount"
                  type="number"
                  dense
                  label="Cantidad adquirida"
                  outlined
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions class="">
              <v-btn class="ma-2" color="primary" @click="putVaccine(key)">
                Editar
              </v-btn>
              <v-btn class="ma-2" color="error" @click="dialog=!dialog">
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
    </v-dialog>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import routeApi from "../lib/routeApi";



export default {
  data: () => ({
    vacunas: [],
    newVaccine: {
      name: "",
      description: "",
      dos: 0,
      origin: "",
      amount: 0,
    },
    editVaccine: {},
    dialog:false,
    url: routeApi.apiRoute
  }),
  methods: {
    readCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }

      return null;
    },
    addVaccine() {
      const options = {
        headers: { "x-access-token": this.readCookie("token") }
      };
      axios
        .post(
          this.url + "/vaccine/add",
          {
            name: this.newVaccine.name,
            description: this.newVaccine.description,
            dose: this.newVaccine.dos,
            origin: this.newVaccine.origin,
            amount: this.newVaccine.amount
          },
          options
        )
        .then(response => {
          this.vacunas = (response.data);
          console.log(response.data);
        });
      this.newVaccine = {
        name: "",
        description: "",
        dos: 0,
        origin: "",
        amount: ""
      };
    },
    deleteVaccine(index){
      const options = {
        headers: { "x-access-token": this.readCookie("token") }
      };
      console.log(this.vacunas[index]._id)
      axios.post(this.url+'/vaccine/delete',{
        id:this.vacunas[index]._id
      },options).then(response=>{
        this.vacunas = response.data
        console.log(response.data)
      })
    }, edit(index){
      this.editVaccine = this.vacunas[index]
      this.dialog = true
    },
    putVaccine(){
      const options = {
        headers: { "x-access-token": this.readCookie("token") }
      };
      axios.post(this.url+'/vaccine/edit',{
        _id: this.editVaccine._id,
        name: this.editVaccine.name,
        description: this.editVaccine.description,
        dose: this.editVaccine.dose,
        origin: this.editVaccine.origin,
        amount: this.editVaccine.amount
      },options).then(response=>{
        this.vacunas = response.data
        this.dialog = false
        })
      console.log(this.editVaccine)
    }
  },
  beforeMount() {
    const options = {
      headers: { "x-access-token": this.readCookie("token") }
    };
    axios.get(this.url + "/vaccine/", options).then(response => {
      this.vacunas = response.data;
    });
  }
};
</script>
