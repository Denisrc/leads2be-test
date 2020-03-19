<template>
    <div>
        <b-table striped hover :items="items" :fields="fields">
            <template v-slot:cell(operations)="row">
                <b-button size="sm" @click="editRow(row.item, row.index, $event.target)" class="mr-2">
                    Edit
                </b-button>
                <b-button size="sm" @click="deleteRow(row.item)" variant="danger">Delete</b-button>
            </template>
        </b-table>
  </div>
</template>

<script>

import api from '../utils/api';

export default {
    props: {
        employees: Array
    },
    data() {
        return {
            fields: [
                {
                    key: 'name',
                    sortable: true
                },
                {
                    key: 'salary',
                    sortable: true
                },
                {
                    key: 'role',
                    sortable: true
                },
                {
                    key: 'operations'
                }
            ],
            items: this.employees
        }
    },
    methods: {
        editRow(item, index, button) {
            console.log(item);
            console.log(index);
            console.log(button);
            // this.$router.push({name: "EmployeeDetail"});
        },
        deleteRow: async function(item) {
            const response = await api.delete("/employee/"+ item.id);

            if (response.status === 200) {
                let newEmployees = this.items.filter(el => el.id != item.id);

                this.items = newEmployees;
            }
        }
    },
    mounted: async function() {
        const response = await api.get("/employee");
        if (response.status == 200) {
            this.items = response.data;
        }
    },
    updated: async function() {
        const response = await api.get("/employee");
        if (response.status == 200) {
            this.items = response.data;
        }
    }
    
}
</script>