<template>
  <div>
    <div id="chat-button" @click="changeChatState">
    </div>
    <div v-if="chatIsOpen" v-on:blur="hideChat" id="chat-window"></div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from '../configs/config'
  import secureStorage from '../configs/secureStorage'

  export default {
    name: 'Chat',
    data() {
      return {
        chatIsOpen: false
      }
    },
    methods: {
      changeChatState() {
        this.chatIsOpen = !this.chatIsOpen;
      },
      hideChat() {
        this.chatIsOpen = false
      }
    },
    created () {
      const token = secureStorage.getItem('token')
      const _id = secureStorage.getItem('_id')
      // TODO
      /*
      axios
        .get(config.apiPath + ' chats/' + _id, {headers: {'Authorization': `Bearer ${token}`}})
        .then(ans => {

        })
        */
    }
  }
</script>

<style scoped>
  #chat-button {
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 80px;
    height: 80px;
    background-color: var(--q-color-primary);
    border-radius: 50%;
    cursor: pointer;
  }

  #chat-window {
    position: fixed;
    right: 20px;
    bottom: 105px;
    height: 70%;
    width: 350px;
    background-color: white;
    border-style: solid;
    border-width: 2px;
    border-color: var(--q-color-primary);
    border-radius: 10px;
  }

  @media (max-width: 420px) {
    #chat-window {
      height: 80%;
      width: 90%;
    }
  }
</style>
