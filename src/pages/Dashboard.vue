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

  }
}
</script>
