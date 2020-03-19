<template>
    <div>
        <div>
            <b-button variant="primary" @click="newEmployee">New</b-button>
        </div>
        <EmployeeList 
        :employees="employees"
        />
  </div>
</template>


<script>
import api from '../utils/api';

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
            alert("New Employee");
        }
    },
    mounted: async function() {
        const response = await api.get("/employee");
        this.employees = response.data;
    }
}
</script>
