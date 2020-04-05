<template>
  <div style="display: flex; align-items: center">
    <img src="../assets/img/avatar.png" alt="Mi foto de perfil" class="round-avatar">
    <q-btn-dropdown :flat="flat" :label="username">
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
    </q-btn-dropdown>
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
</style>
