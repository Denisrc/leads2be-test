<template>
    <div>
        <br>
        <b-card>
            <div v-if="created">
                <b-alert show variant="success">User Created</b-alert>
            </div>
            <div v-if="errorLogin">
                <b-alert show variant="danger">{{ erroMessage }}</b-alert>
            </div>
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
                <b-row align-h="center">
                    <b-col cols="1"><b-button type="submit" variant="primary">Login</b-button></b-col>
                    <b-col cols="1"><b-button type="submit" variant="success">Register</b-button></b-col>
                </b-row>
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
            show: true,
            created: false,
            errorLogin: false,
            erroMessage: ''
        }
    },
    methods: {
        onSubmit: async function(event) {
            event.preventDefault();
            let buttonText = event.explicitOriginalTarget.textContent;

            if (buttonText === "Login") {
                this.login();
            } else {
                this.register();
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
                this.errorLogin = true;
                this.erroMessage = error.response.data.message;
            });
            if (response != null) {
                const token = response.data.token;
                localStorage.setItem('user', token);

                this.$router.push({name: "Home"});
            }
        },
        register: async function() {
            const response = await api.post("/register", this.form).catch((error) => {
                this.errorLogin = true;
                this.erroMessage = error.response.data.message;
            });

            if (response.status == 200) {
                this.created = true;
            }
        }
    }
}
</script>