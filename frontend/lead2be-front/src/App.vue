<template>
  <div id="app">
    <EmployeeList 
      :employees="employees"
    />
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
  data() {
    return {
      employees: []
    }
  },
  mounted: async function() {
    const response = await api.get("/employee");

    this.employees = response.data;
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
