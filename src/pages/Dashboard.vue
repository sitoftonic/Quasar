<template>
  <q-page class="flex flex-center">
    <p>
      {{ text }}
    </p>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DashboardPage',
  data () {
    return {
      text: ''
    }
  },
  mounted () {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/ditto')
      .then(res => (this.text = res))
  }
}
</script>
