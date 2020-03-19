import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Employee from '../components/Employee.vue'
import EmployeeDetail from '../components/EmployeeDetail.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'Home', component: Home},
    { path: '/employee', name: 'Employee', component: Employee},
    { path: '/employeeDetail/:id', name: 'EmployeeDetailId', component: EmployeeDetail},
    { path: '/employeeDatail', name: 'EmployeeDetail', component: EmployeeDetail}
];

export default new VueRouter({
    routes
});