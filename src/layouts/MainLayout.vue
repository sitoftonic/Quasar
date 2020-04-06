<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <div style="display: flex; justify-content: space-between !important;">
          <div style="display: flex; flex-direction: row; align-items: center">
            <q-btn
              flat
              dense
              round
              icon="menu"
              aria-label="Menu"
              @click="leftDrawerOpen = !leftDrawerOpen"
            />
            <q-toolbar-title>
              Influentia
            </q-toolbar-title>
            <q-input style="margin-top: 5px; margin-bottom: -10px" outlined bottom-slots v-model="searchText" maxlength="400" v-on:keyup="keyPressed">
              <template v-slot:after>
                <q-btn round dense flat icon="search" @click="onSearch" />
              </template>
            </q-input>
          </div>
          <DropdownMenu></DropdownMenu>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Bienvenido, {{ username }}
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <OfflineBanner v-if="isOffline"></OfflineBanner>
      <router-view />
      <div>
        <Chat></Chat>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/SidebarMenuLinks'
import secureStorage from '../configs/secureStorage'
import OfflineBanner from '../components/OfflineBanner'
import DropdownMenu from '../components/DropdownMenu'
import Chat from '../components/Chat'


export default {
  name: 'MainLayout',
  components: {
    Chat,
    DropdownMenu,
    OfflineBanner,
    EssentialLink
  },
  data () {
    return {
      leftDrawerOpen: false,
      username: null,
      searchText: '',
      isOffline: false,
      essentialLinks: [
        {
          title: 'Dashboard',
          caption: 'Página principal',
          icon: 'home',
          link: '/'
        },
        {
          title: 'Buscador',
          caption: 'Nuevas campañas',
          icon: 'search',
          link: '/search/campaigns'
        },
        {
          title: 'Mis campañas',
          caption: 'Administración',
          icon: 'chat',
          link: '/my/campaigns'
        },
        {
          title: 'Mensajes',
          caption: 'Bandeja de entrada',
          icon: 'record_voice_over',
          link: '/my/messages'
        },
        {
          title: 'Afiliados',
          caption: 'Gestiona tu red',
          icon: 'rss_feed',
          link: '/my/affiliates'
        },
        {
          title: 'Centro de Datos',
          caption: 'Analiza tu impacto',
          icon: 'public',
          link: '/my/analytics'
        },
        {
          title: 'Configuración',
          caption: 'Ajustes de Usuario',
          icon: 'settings',
          link: '/my/settings'
        }
      ]
    }
  },
  methods: {
    onSearch() {

    },
    keyPressed(e) {
      // If enter is pressed
      if (e.keyCode === 13) {
        this.sendMessage()
      }
    },
  },
  created () {
    try {
      this.username = secureStorage.getItem('name')
    } catch (e) {
      secureStorage.clear()
      this.$router.push({ name: 'login' })
    }
  },
}
</script>

<style>

</style>
