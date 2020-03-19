<template>
    <div>
        <div>
            <b-button variant="primary" @click="newEmployee">New</b-button>
        </div>
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
            console.log("employee")
            this.$router.push({name: "EmployeeDetail"});
        }
    }
}
</script>
