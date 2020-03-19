<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                label="Name: "
                label-for="input-name"
            >
                <b-form-input
                    id="input-name"
                    v-model="form.name"
                    required
                    placeholder="Enter name"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                label="Salary: "
                label-for="input-salary"
            >
                <b-form-input
                    id="input-salary"
                    v-model="form.salary"
                    type="number"
                    required
                    placeholder="Enter Salary"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                label="Role: "
                label-for="input-role"
            >
                <b-form-input
                    id="input-role"
                    v-model="form.role"
                    required
                    placeholder="Enter Role"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>   
    </div>
</template>

<script>
import api from '../utils/api';

export default {
    name: 'EmployeeDetail',
    data() {
        return {
            form: {
                name: '',
                salary: '',
                role: '', 
            },
            show: true
        }
    },
    methods: {
        onSubmit: async function(event) {
            event.preventDefault();
            const response = await api.post("/employee", this.form);
            if (response.status === 200) {
                alert("Created");
            }
            this.onReset(event);
        },
        onReset(event) {
            event.preventDefault()

            this.form.name = '';
            this.form.salary = '';
            this.form.role = '';

            this.show = false;
            this.$nextTick(() => {
                this.show = true
            });
        }
    }  
}
</script>