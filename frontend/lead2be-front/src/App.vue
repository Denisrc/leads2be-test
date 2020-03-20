<template>
    <div id="app">
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">Leads2Be</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item><router-link id="routerLink" to="/">Home</router-link></b-nav-item>
                    <b-nav-item><router-link id="routerLink" to="/employee">Employees</router-link></b-nav-item>
                    <b-nav-item><router-link id="routerLink" to="/login">Login</router-link></b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-container>
            <router-view></router-view>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'App',
}
</script>

<style>
#routerLink {
    color: #FFFFFF;
    text-decoration: none;
}
</style>