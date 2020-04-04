<template>
  <div style="display: flex; align-items: center">
    <img src="../assets/img/avatar.png" alt="Mi foto de perfil" class="round-avatar">
    <q-btn-dropdown color="primary" :label="username">
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

  export default {
    name: 'DropdownMenu',
    data: function() {
      return {
        username: secureStorage.getItem('name')
      }
    },
    methods: {
      onSettingsClick: function() {
        console.log("Yeah")
      },
      onHelpClick: function() {

      },
      onLogoutClick: function() {
        secureStorage.clear()
        this.$router.push({ name: 'login' })
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
  .q-btn__wrapper:before {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }

  .q-btn {
    text-transform: none;
  }

  .round-avatar {
    border-radius: 50%;
  }
</style>
