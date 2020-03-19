<template>
  <div id="app">
    <EmployeeList />
  </div>
</template>

<script>
import api from './utils/api';

import EmployeeList from './components/EmployeeList.vue'

export default {
  name: 'App',
  components: {
    EmployeeList
  },
  mounted: async function() {
    console.log("Teste");
    const response = await api.get("/employee");
    console.log(response);
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
