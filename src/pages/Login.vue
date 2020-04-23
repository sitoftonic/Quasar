<template class="theme-default page-signin">
  <div>
    <!-- Page background -->
    <div id="page-signin-bg">
      <!-- Background overlay -->
      <div class="overlay"></div>
      <!-- Replace this with your bg image -->
      <img src="assets/demo/signin-bg-1.jpg" alt="">
    </div>
    <!-- / Page background -->

    <!-- Container -->
    <div class="signin-container">

      <!-- Left side -->
      <div class="signin-info">
        <a href="index.html" class="logo">
          <img src="assets/demo/logo-big.png" alt="" style="margin-top: -5px;">&nbsp;
          PixelAdmin
        </a> <!-- / .logo -->
        <div class="slogan">
          Simple. Flexible. Powerful.
        </div> <!-- / .slogan -->
        <ul>
          <li><i class="fa fa-sitemap signin-icon"></i> Flexible modular structure</li>
          <li><i class="fa fa-file-text-o signin-icon"></i> LESS &amp; SCSS source files</li>
          <li><i class="fa fa-outdent signin-icon"></i> RTL direction support</li>
          <li><i class="fa fa-heart signin-icon"></i> Crafted with love</li>
        </ul> <!-- / Info list -->
      </div>
      <!-- / Left side -->

      <!-- Right side -->
      <div class="signin-form">

        <!-- Form -->
        <form action="index.html" id="signin-form_id">
          <div class="signin-text">
            <span>Sign In to your account</span>
          </div> <!-- / .signin-text -->

          <div class="form-group w-icon">
            <input type="text" name="signin_username" id="username_id" class="form-control input-lg" placeholder="Username or email">
            <span class="fa fa-user signin-form-icon"></span>
          </div> <!-- / Username -->

          <div class="form-group w-icon">
            <input type="password" name="signin_password" id="password_id" class="form-control input-lg" placeholder="Password">
            <span class="fa fa-lock signin-form-icon"></span>
          </div> <!-- / Password -->

          <div class="form-actions">
            <input type="submit" value="SIGN IN" class="signin-btn bg-primary">
            <a href="#" class="forgot-password" id="forgot-password-link">Forgot your password?</a>
          </div> <!-- / .form-actions -->
        </form>
        <!-- / Form -->

        <!-- "Sign In with" block -->
        <div class="signin-with">
          <!-- Facebook -->
          <a href="index.html" class="signin-with-btn" style="background:#4f6faa;background:rgba(79, 111, 170, .8);">Sign In with <span>Facebook</span></a>
        </div>
        <!-- / "Sign In with" block -->

        <!-- Password reset form -->
        <div class="password-reset-form" id="password-reset-form">
          <div class="header">
            <div class="signin-text">
              <span>Password reset</span>
              <div class="close">&times;</div>
            </div> <!-- / .signin-text -->
          </div> <!-- / .header -->

          <!-- Form -->
          <form action="index.html" id="password-reset-form_id">
            <div class="form-group w-icon">
              <input type="text" name="password_reset_email" id="p_email_id" class="form-control input-lg" placeholder="Enter your email">
              <span class="fa fa-envelope signin-form-icon"></span>
            </div> <!-- / Email -->

            <div class="form-actions">
              <input type="submit" value="SEND PASSWORD RESET LINK" class="signin-btn bg-primary">
            </div> <!-- / .form-actions -->
          </form>
          <!-- / Form -->
        </div>
        <!-- / Password reset form -->
      </div>
      <!-- Right side -->
    </div>
    <!-- / Container -->

    <div class="not-a-member">
      Not a member? <a href="pages-signup.html">Sign up now</a>
    </div>

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
    <button @click="fbLogin">Iniciar sesión con Facebook</button>
    <div>
      <router-link to="/signup">No tengo una cuenta</router-link>
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
      user: null,
      pass: null,
      errors: [],
      showFbLogin: null
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
        iziToast.show({
          title: 'Bien!',
          message: 'Has iniciado sesión con éxito'
        })
      }
      else {
        secureStorage.removeItem('token')
        this.errors.push('La información introducida no es válida.')
      }
    },
    sendLogIn () {
      let type = this.checkForm().type
      if (type) {
        this.$q.loading.show()
        // Login
        axios
          .post(config.apiPath + 'login/' + type, { user: this.user, pass: this.pass })
          .then(ans => {
            this.saveToken(ans.data)
            this.$q.loading.hide()
          })
      }
    },
    fbLogin() {
      try {
        FB.login((response) => {
          if (response.status === 'connected' && response.authResponse != null) {
            secureStorage.setItem('fb_token', response.authResponse.accessToken);
            axios
              .post(config.apiPath + 'login/facebook', { userID: response.authResponse.userID })
              .then(ans => this.saveToken(ans.data))
          }
        }, {scope: 'email, user_likes'})
      } catch (err) {
        //console.log(err);
      }
    }
  },
  created () {
    FB.getLoginStatus((response) => {
      if (secureStorage.getItem('fb_token')) {
        if (response.authResponse.accessToken === secureStorage.getItem('fb_token')) {
          this.$router.push({name: 'dashboard'});
        }
        else {
          secureStorage.removeItem('fb_token');
          FB.logout(function (response) {
            console.log(response)
          })
        }
      }
    });
  }
}
</script>

<style scoped>

</style>
