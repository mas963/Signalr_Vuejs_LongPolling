<template>
  <div id="app">
    <h1>Vue.js & SignalR Long Polling Chat</h1>
    <input v-model="username" placeholder="Kullanıcı Adı">
    <input v-model="userMessage" placeholder="Mesaj">
    <button @click="handleSendMessage">Gönder</button>
    <ul>
      <li v-for="msg in messages" :key="msg.id">{{ msg.user }}: {{ msg.message }}</li>
    </ul>
  </div>
</template>

<script>
import {useSignalRStore} from './stores/signalRStore';
import {mapState, mapActions} from 'pinia';

export default {
  name: 'App',
  data() {
    return {
      username: '',
      userMessage: '',
    };
  },
  computed: {
    ...mapState(useSignalRStore, ['messages'])
  },
  methods: {
    ...mapActions(useSignalRStore, ['sendMessage']),
    handleSendMessage() {
      if (this.username && this.userMessage) {
        this.sendMessage(this.username, this.userMessage);
        this.userMessage = ''; // Mesaj gönderildikten sonra input'u temizle
      } else {
        alert("Kullanıcı adı ve mesaj alanları boş bırakılamaz!");
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
