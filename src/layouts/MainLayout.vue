<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
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

        <div>v0.1</div>
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/SidebarMenuLinks'

var username = 'Luis'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      username,
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
  }
}
</script>
