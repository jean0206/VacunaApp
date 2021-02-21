<template>
  <div style="margin-top:100px" class="v-container mb-6">
    <v-row col="12">
      <v-col class="text-center">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4"></div>
              <div style="padding:4%">
                <v-avatar size="110">
                  <img src="@/assets/avatar.png" alt="John" />
                </v-avatar>
              </div>
              <v-text-field v-model="user.userName" label="Usuario" outlined></v-text-field>
              <v-text-field v-model="user.password" type="password" label="Contraseña" outlined></v-text-field>
              <v-btn
                class="ma-2"
                color="primary"
                @click="login"
              >
                Iniciar sesión
              </v-btn>
            </v-list-item-content>
          </v-list-item>
          <v-alert
      dense
      outlined
      type="error"
      v-if="alert"
    >
      I'm a dense alert with the <strong>outlined</strong> prop and a <strong>type</strong> of error
    </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import apiRoute from '../lib/routeApi'
export default {
    data:()=>({
        user:{
            userName:"",
            password:""
        },
        url:apiRoute.apiRoute,
        alert:false
      
    })
    ,methods:{
        login(){
            axios.post(this.url+'/user/login',{
                user:this.user.userName,
                password:this.user.password
            }).then(response=>{
                let auth= response.data['auth']
                if (auth){
                    document.cookie='token='+response.data['token']
                    localStorage.setItem('user',response.data['user'])
                    console.log(response.data)
                    this.$router.push('/dashboard')
                }else{
                    this.alert=true
                }
            })
        }
    },beforeMount(){
      let id=localStorage.getItem('user')
      if (id!=undefined){
        this.$router.push('/dashboard')
      }else{
        this.$router.push('/login')
      }
    }
}
</script>
