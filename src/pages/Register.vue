<template>
  <div>
    <p v-if="errors.length">
      <b>Error:</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    <p>
      <label for="name">Nombre</label>
      <input type="text" name="name" id="name" v-model="name" v-on:keyup="keyPressed">
    </p>

    <p>
      <label for="email">Dirección e-mail</label>
        <input type="text" name="email" id="email" v-model="email" v-on:keyup="keyPressed">
    </p>

    <p>
      <label for="pass">Contraseña</label>
        <input type="password" name="pass" id="pass" v-model="pass" v-on:keyup="keyPressed">
    </p>
    <button @click="sendRegister">Crear cuenta</button>
    <div>
      <router-link to="/login">¿Ya estás registrado?</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../configs/config'
import secureStorage from '../configs/secureStorage'
import iziToast from 'izitoast'

export default {
  name: 'LoginPage',
  data () {
    return {
      name: null,
      email: null,
      pass: null,
      errors: []
    }
  },
  methods: {
    keyPressed(e) {
      // If enter is pressed
      if (e.keyCode === 13) {
        this.sendRegister()
      }
    },
    saveUserData(ans) {
      secureStorage.setItem('token', ans.token)
      secureStorage.setItem('name', ans.user.name)
      secureStorage.setItem('_id', ans.user._id)
    },
    checkForm () {
      let ok = null
      this.errors = []
      if (this.name && this.email && this.pass) {
        // Validate
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
          // User tries to log by email
          if (this.name.length > 1) {
            //if (/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g.test(this.password)) {
            if (true) ok = true
            //}
            else {
              this.errors.push('Debes introducir una contraseña segura.')
            }
          }
          else {
            this.errors.push('Debes introducir un nombre válido.')
          }
        }
        else {
          this.errors.push('Debes introducir un correo electrónico válido.')
        }
      }
      else {
        if (!this.name) this.errors.push('Debes introducir tu nombre.')
        if (!this.email) this.errors.push('Debes introducir tu e-mail.')
        if (!this.pass) this.errors.push('Debes introducir tu contraseña.')
      }
      return ok;
    },
    saveToken (ans) {
      if (ans.token) {
        this.saveUserData(ans)
        this.$router.push({ name: 'dashboard' })
        iziToast.show({
          title: 'Bienvenido, ' + ans.user.name,
          message: 'Te has registrado con éxito :)'
        })
      }
      else {
        secureStorage.removeItem('token')
        this.errors.push('La información introducida no es válida. Contacta con nosotros para más información.')
      }
    },
    sendRegister () {
      if (this.checkForm()) {
        // Login
        axios
          .post(config.apiPath + 'register/influencer', { name: this.name, email: this.email, pass: this.pass })
          .then(ans => this.saveToken(ans.data))
      }
      else {
        this.name = ''
        this.email = ''
        this.pass = ''
      }
    },
  }
}
</script>

<style scoped>

</style>
