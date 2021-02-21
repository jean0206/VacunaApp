<template>
  <div style="margin-top:100px" class="v-container mb-6">
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
                  <th class="text-center">
                    Editar
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="text-center"
                  v-for="(item, key) in states"
                  :key="key"
                >
                  <td>{{ item.nameState }}</td>
                  <td>{{ item.vaccinated }}</td>
                  <td>{{ item.population }}</td>
                  <td>
                    <v-icon small class="mr-2" @click="editItem(key)">
                      mdi-pencil
                    </v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">
          {{ stateEdit.nameState }}
        </v-card-title>
        <div style="padding:3%;">
          <v-text-field
            disabled
            v-model="stateEdit.nameState"
            label="Nombre "
            outlined
          ></v-text-field>
          <v-text-field
            v-model="stateEdit.vaccinated"
            label="vacunados"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="stateEdit.population"
            label="población"
            outlined
          ></v-text-field>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="primary darken-1" text @click="editState">
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import apiRoute from "../lib/routeApi";
export default {
  data: () => ({
    states: [],
    url: apiRoute.apiRoute,
    dialog: false,
    stateEdit: {}
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
    editItem(index) {
      this.dialog = true;
      this.stateEdit = Object.assign({}, this.states[index]);
      console.log(this.stateEdit);
    },
    async editState() {
      const options = {
        headers: { "x-access-token": this.readCookie("token") }
      };
      await axios
        .post(
          this.url + "/state/edit",
          {
            id: this.stateEdit._id,
            vaccinated: this.stateEdit.vaccinated,
            population: this.stateEdit.population
          },
          options
        )
        .then(async response => {
          console.log(response.data);
          this.dialog = false;
          await axios
            .get(this.url + "/state/editable", options)
            .then(response => {
              if (!response.data["auth"]) {
                alert("No tienes permiso para acceder");
                this.$router.push("/login");
              } else {
                this.states = response.data["states"];
                console.log(this.states);
              }
            })
            .catch(error => {
              console.log(error.message);
            });
        });
      console.log("ajsad");
    }
  },
  async beforeMount() {
    if (this.readCookie("token") === "") {
      alert("No tienes permiso");
      this.$router.push("/login");
    } else {
      const options = {
        headers: { "x-access-token": this.readCookie("token") }
      };
      await axios
        .get(this.url + "/state/editable", options)
        .then(response => {
          if (!response.data["auth"]) {
            alert("No tienes permiso para acceder");
            this.$router.push("/login");
          } else {
            this.states = response.data["states"];
            console.log(this.states);
          }
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  }
};
</script>
