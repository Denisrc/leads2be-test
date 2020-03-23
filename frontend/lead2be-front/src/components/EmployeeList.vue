<template>
    <div>
        <b-table striped hover :items="items" :fields="fields">
            <template v-slot:cell(operations)="row">
                <b-button size="sm" @click="editRow(row.item)" class="mr-2">
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
        editRow(item) {
            console.log(item);
            this.$router.push({name: "EmployeeDetailId", params: { id: item._id }});
        },
        deleteRow: async function(item) {
            const token = localStorage.getItem('user');

            var sure = confirm("Are you sure you want to delete?");
            if (sure == true) {
                const response = await api.delete("/employee/"+ item._id, {
                    headers: {
                        "auth-token": token
                    }
                });

                if (response.status === 200) {
                    let newEmployees = this.items.filter(el => el._id != item._id);

                    this.items = newEmployees;
                }
            }
        }
    },
    mounted: async function() {
        const token = localStorage.getItem('user');
        const response = await api.get("/employee", {
            headers: {
                "auth-token": token
            }
        });
        if (response.status == 200) {
            this.items = response.data;
        }
    }
}
</script>