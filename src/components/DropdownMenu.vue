<template>
  <div class="dropdown-menu">
    <q-btn :flat="flat">
      <div style="display: flex; flex-direction: row; align-items: center">
        <img src="../assets/img/avatar.png" alt="Mi foto de perfil" class="round-avatar">
        <p class="username" style="margin: 0; margin-left: 10px">{{username}}</p>
      </div>
      <q-menu>
        <q-list>
          <q-item clickable v-close-popup @click="onSettingsClick">
            <q-item-section>
              <q-item-label>Ajustes</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="onHelpClick">
            <q-item-section>
              <q-item-label>Ayuda</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="onLogoutClick">
            <q-item-section>
              <q-item-label>Cerrar sesión</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
  import secureStorage from '../configs/secureStorage'
  import axios from 'axios'
  import config from '../configs/config'

  export default {
    name: 'DropdownMenu',
    data: function() {
      return {
        username: secureStorage.getItem('name'),
        flat: true
      }
    },
    methods: {
      sendLogout: function(id) {

      },
      onSettingsClick: function() {
        console.log("Yeah")
      },
      onHelpClick: function() {

      },
      onLogoutClick: function() {
        const _id = secureStorage.getItem('_id')
        axios
          .post(config.apiPath + 'logout', { _id: _id, message: 'Logged Out at ' + Date.now() })
          .then(ans => {
            secureStorage.clear()
            this.$router.push({ name: 'login' })
        })
      }
    }
  }
  /*
  * <div style="display: flex; flex-direction: row; align-items: center">
      <img src="../assets/img/avatar.png" alt="Mi foto de perfil" class="round-avatar">
      {{ username }}
    </div>
  * */
</script>

<style scoped>
  .round-avatar {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin-right: -5px;
  }

  .q-btn {
    text-transform: none;
  }

  .dropdown-menu {
    display: flex;
    align-items: center
  }

  @media (max-width: 450px) {
    .username {
      display: none;
    }
  }
</style>
