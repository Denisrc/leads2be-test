<template>
    <div>
        <b-card>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group
                    label="Username: "
                    label-for="input-username"
                >
                    <b-form-input
                        id="input-username"
                        v-model="form.username"
                        required
                        placeholder="Username"
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    label="Password: "
                    label-for="input-password"
                >
                    <b-form-input
                        id="input-password"
                        v-model="form.password"
                        type="password"
                        required
                        placeholder="Password"
                    ></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary">Login</b-button>
                <b-button type="submit" variant="success">Register</b-button>
            </b-form>
        </b-card>
    </div>
</template>


<script>
import api from '../utils/api';

export default {
    name: 'Login',
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
            show: true
        }
    },
    methods: {
        onSubmit: async function(event) {
            event.preventDefault();
            let buttonText = event.explicitOriginalTarget.textContent;

            if (buttonText === "Login") {
                this.login();
            }
        },
        onReset(event) {
            event.preventDefault()

            this.form.username = '';
            this.form.password = '';

            this.show = false;
            this.$nextTick(() => {
                this.show = true
            });
        },
        login: async function() {
            const response = await api.post("/login", this.form).catch((error) => {
                console.log(error);
                console.log(error.response);
            });
            if (response != null) {
                const token = response.data.token;
                localStorage.setItem('user', token);

                this.$router.push({name: "Home"});
            }

        }
    }
}
</script>