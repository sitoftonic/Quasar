<template>
  <div class="q-pa-md">
    <q-scroll-area
      :visible="true"
      style="height: 450px; max-width: 350px"
    >
      <q-infinite-scroll reverse>
        <template>
          <div class="q-pa-md row justify-center">
            <div style="width: 100%;">
              <div v-for="message in this.messages">
                <q-chat-message
                  v-if="checkSender(message) === 'me'"
                  :name="message.from.name"
                  avatar="https://cdn.quasar.dev/img/avatar4.jpg"
                  :text="message.text"
                  :stamp="calcTimeSinceSent(message)"
                />
                <q-chat-message
                  v-if="checkSender(message) === 'other'"
                  :name="message.from.name"
                  avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                  :text="message.text"
                  sent
                  :stamp="calcTimeSinceSent(message)"
                />
              </div>
            </div>
          </div>
        </template>
      </q-infinite-scroll>
    </q-scroll-area>
    <q-input style="margin-top: 10px" outlined bottom-slots v-model="text" label="Escribe algo..." counter maxlength="400" v-on:keyup="keyPressed">
      <template v-slot:after>
        <q-btn round dense flat icon="send" @click="sendMessage" />
      </template>
    </q-input>
  </div>
</template>

<script>
  import config from '../configs/config'
  import secureStorage from '../configs/secureStorage'
  import axios from 'axios'


  export default {
    name: 'ChatMessages',
    props: ['usr'],
    data () {
      return {
        messages: [],
        text: '',
        user: this.usr
      }
    },
    sockets: {
      newMessage: function(message) {
        console.log(message)
        this.messages.push(message)
        this.scrollDown()
      }
    },
    methods: {
      calcTimeSinceSent(message) {
        const time = (new Date() - message.timestamp) / 1000
        if (time < 60) {
          return 'Hace menos de un minuto'
        }
        else {
          if (time < 3600) {
            return 'Hace ' + (time % 60).toString() + ' minutos'
          }
          else {
            if (time < 3600*24) {
              return 'Hace aproximadamente ' + ((time / 60) % 24) + ' horas'
            }
            else {
              return 'Hace ' + (time / (60*24)) + ' horas'
            }
          }
        }
      },
      checkSender(message) {
        const my_id = secureStorage.getItem('_id')
        if (my_id === message.from._id) {
          return 'me'
        }
        else {
          return 'other'
        }
      },
      sendMessage() {
        const my_id = secureStorage.getItem('_id')
        const my_name = secureStorage.getItem('name')
        const message = {
          from: {
            _id: my_id,
            name: my_name
          },
          to: {
            _id: this.user._id,
            name: this.user.name
          },
          chat_id: null,
          timestamp: new Date(),
          text: [this.text]
        }
        this.$socket.emit('newMessage', message)
        //this.$socket.emit('newMessage', message)
        this.messages.push(message)
        this.text = ''
        this.scrollDown()
      },
      keyPressed(e) {
        // If enter is pressed
        if (e.keyCode === 13) {
          this.sendMessage()
        }
      },
      scrollDown() {
        setTimeout(function () {
          document.getElementsByClassName('q-infinite-scroll')[0].scrollIntoView(false)
        }, 50)
      }
    },
    created () {
      this.$socket.emit('bindUser', secureStorage.getItem('_id'))
    },
    mounted () {
      const token = secureStorage.getItem('token')
      const my_id = secureStorage.getItem('_id')
      axios
        .get(config.apiPath + 'messages/' + my_id + '/' + this.user._id, {headers: {'token': token}})
        .then(ans => {
          ans.data.forEach(message => {
            this.messages.push(message)
          })
          this.scrollDown()
        })
    },
  }
</script>

<style scoped>

</style>
