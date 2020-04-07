<template>
  <q-layout>
    <q-header elevated style="padding: 20px">
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
        </div>
        <div style="display: flex; flex-direction: row;">
          <q-btn
            flat
            dense
            round
            icon="search"
            class="header-icon"
            aria-label="Búsqueda"
            @click=""
          />
          <q-btn
            flat
            dense
            round
            icon="chat"
            class="header-icon"
            aria-label="Chat"
            @click="handleRightDrawer('chat')"
          />
          <q-btn
            flat
            dense
            round
            icon="feedback"
            class="header-icon"
            aria-label="Notificaciones"
            @click="handleRightDrawer('notifications')"
          />
          <DropdownMenu></DropdownMenu>
        </div>
      </div>
    </q-header>

    <q-drawer
      side="left"
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
    <q-drawer
      side="right"
      v-model="chatDrawerOpen"
      show-if-above
      bordered
      :width="300"
      :breakpoint="500"
      content-class="bg-grey-1"
    >
      <Chat></Chat>
    </q-drawer>
    <q-drawer
      side="right"
      v-model="notificationsDrawerOpen"
      show-if-above
      bordered
      :width="300"
      :breakpoint="500"
      content-class="bg-grey-1"
    >
      <p>Hola Notifications</p>
    </q-drawer>
    <q-page-container>
      <OfflineBanner v-if="isOffline"></OfflineBanner>
      <router-view />
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
      chatDrawerOpen: false,
      notificationsDrawerOpen: false,
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
    handleRightDrawer(type) {
      if (type === 'chat') {
        if (this.notificationsDrawerOpen) {
          this.notificationsDrawerOpen = !this.notificationsDrawerOpen
        }
        this.chatDrawerOpen = !this.chatDrawerOpen
      }
      else {
        if (this.chatDrawerOpen) {
          this.chatDrawerOpen = !this.chatDrawerOpen
        }
        this.notificationsDrawerOpen = !this.notificationsDrawerOpen
      }
    },
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
  .header-icon {
    margin-right: 20px;
  }
</style>
