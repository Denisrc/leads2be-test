<template>
    <div>
    <b-table striped hover :items="employees" :fields="fields">
              <template v-slot:cell(operations)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>

      </template>
    </b-table>
  </div>
</template>

<script>
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
            ]
        }
    }
}
</script>