<template>
    <div>
        <br>
        <b-button id="new-button" variant="primary" @click="newEmployee">New</b-button>
        <br>
        <br>
        <EmployeeList/>
  </div>
</template>


<script>

import EmployeeList from './EmployeeList.vue'

export default {
    name: 'Employee',
    components: {
        EmployeeList
    },
    data() {
        return {
            employees: []
        }
    },
    methods: {
        newEmployee() {
            this.$router.push({name: "EmployeeDetail"});
        }
    }
}
</script>

<style>
#new-button {
    align-self: "left";
    align-content: "left";
}
</style>
