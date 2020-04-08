<template>
  <!-- v-click-outside="hideChat"  EN CHAT-BUTTON-->
  <div id="chat-window">
    <div v-if="this.chatWindow === 'search'" class="q-ma-md">
      <div style="display: flex; flex-direction: row; align-items: center; max-height: 50px">
        <q-icon name="keyboard_backspace" style="font-size: 20px; margin-right: 10px; cursor: pointer" @click="changeChatWindow('main')"></q-icon>
        <h5>Gente en línea</h5>
      </div>
      <p>¿Con quién quieres hablar hoy?</p>
      <q-scroll-area
        :visible="true"
        style="height: 500px; width: 100%;"
      >
        <div v-for="user in onlineUsers" class="q-py-xs">
          <q-list bordered separator>
            <q-slide-item>
              <q-item clickable v-ripple @click="changeToChatMessages(user)">
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar6.jpg" draggable="false">
                  </q-avatar>
                </q-item-section>
                <q-item-section>{{user.name}}</q-item-section>
              </q-item>
            </q-slide-item>
          </q-list>
        </div>
      </q-scroll-area>
    </div>
    <div v-if="this.chatWindow === 'main'" class="q-ma-md">
      <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; max-height: 50px">
        <h5>Mis chats</h5>
        <q-btn color="primary" label="Buscar gente" @click="changeChatWindow('search')" />
      </div>
      <q-scroll-area
        :visible="true"
        style="height: 500px; width: 100%;"
      >
        <div v-for="user in onlineUsers" class="q-py-xs">
          <q-list bordered separator>
            <q-slide-item>
              <q-item clickable v-ripple @click="changeToChatMessages(user)">
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar6.jpg" draggable="false">
                  </q-avatar>
                </q-item-section>
                <q-item-section>{{user.name}}</q-item-section>
              </q-item>
            </q-slide-item>
          </q-list>
        </div>
      </q-scroll-area>
    </div>
    <div v-if="this.chatWindow === 'messages'" class="q-ma-md">
      <div style="height: 500px; width: 100%;">
        <div style="display: flex; flex-direction: row; align-items: center; max-height: 50px; margin-bottom: 30px">
          <q-icon name="keyboard_backspace" style="font-size: 20px; margin-right: 10px; cursor: pointer" @click="changeChatWindow('main')"></q-icon>
          <h5>{{this.chattingWith.name}}</h5>
        </div>
        <ChatMessages :usr="this.chattingWith">
        </ChatMessages>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from '../configs/config'
  import ClickOutside from 'vue-click-outside'
  import secureStorage from '../configs/secureStorage'
  import ChatMessages from './ChatMessages'

  export default {
    name: 'Chat',
    components: { ChatMessages },
    data() {
      return {
        chatIsOpen: false,
        chatWindow: 'main',
        onlineUsers: [],
        chattingWith: null
      }
    },
    methods: {
      changeChatState() {
        this.chatIsOpen = !this.chatIsOpen;
      },
      hideChat() {
        this.chatIsOpen = false
      },
      changeChatWindow(window) {
        if (window !== 'messages') {
          this.chattingWith = null
        }
        this.chatWindow = window
      },
      changeToChatMessages(user) {
        this.chattingWith = JSON.parse(JSON.stringify(user))
        this.changeChatWindow('messages')
      }
    },
    created () {
      const token = secureStorage.getItem('token')
      axios
        .get(config.apiPath + 'users/online', {headers: {'token': token}})
        .then(ans => {
          this.onlineUsers = ans.data.message;
        })
    },
    directives: {
      ClickOutside
    }
  }
</script>

<style scoped>
  #chat-window {
    //position: fixed;
    //right: 20px;
    //bottom: 105px;
    height: 100%;
    width: 100%;
    background-color: white;
    //border-style: solid;
    //border-width: 2px;
    //border-color: var(--q-color-primary);
  }
</style>
