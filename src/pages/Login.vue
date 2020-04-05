<template>
  <div>
    <p v-if="errors.length">
      <b>Error:</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>

    <p>
      <label for="user">Usuario</label>
        <input type="text" name="user" id="user" v-model="user" v-on:keyup="keyPressed">
    </p>

    <p>
      <label for="pass">Contraseña</label>
        <input type="password" name="pass" id="pass" v-model="pass" v-on:keyup="keyPressed">
    </p>
    <button @click="sendLogIn">Iniciar sesión</button>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../configs/config'
import secureStorage from '../configs/secureStorage'

export default {
  name: 'LoginPage',
  data () {
    return {
      user: null,
      pass: null,
      errors: []
    }
  },
  methods: {
    keyPressed(e) {
      // If enter is pressed
      if (e.keyCode === 13) {
        this.sendLogIn()
      }
    },
    saveUserData(ans) {
      secureStorage.setItem('token', ans.token)
      secureStorage.setItem('name', ans.user.name)
      secureStorage.setItem('_id', ans.user._id)
    },
    checkForm () {
      let type = null
      this.errors = []
      if (this.user && this.pass) {
        // Validate
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.username)) {
          // User tries to log by email
          type = 'email'
        }
        else {
          // User tries to log by username
          type = 'username'
        }
      }
      else {
        if (!this.user) this.errors.push('Debes introducir tu usuario.')
        if (!this.pass) this.errors.push('Debes introducir tu contraseña.')
      }
      return { type, errors: this.errors }
    },
    saveToken (ans) {
      if (ans.token) {
        this.saveUserData(ans)
        this.$router.push({ name: 'dashboard' })
      }
      else {
        secureStorage.removeItem('token')
        this.errors.push('La información introducida no es válida.')
      }
    },
    sendLogIn () {
      let type = this.checkForm().type
      if (type) {
        // Login
        axios
          .post(config.apiPath + 'login/' + type, { user: this.user, pass: this.pass })
          .then(ans => this.saveToken(ans.data))
      }
    },
    forgotPass () {
      // TODO
    }
  }
}
</script>

<style scoped>

</style>
