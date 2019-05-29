<template>
  <v-container>
    <v-layout>
      <v-flex>
        <h1 v-if="$route.params.id == 0">Create employee</h1>
        <h1 v-else>Edit employee (ID: {{$route.params.id}})</h1>
      </v-flex>
    </v-layout>

    <template>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="employee.name"
          :counter="150"
          label="Name"
          required
        ></v-text-field>

        <v-select
          v-model="employee.type"
          :items="employeeTypes"
          :rules="[v => !!v || 'Item is required']"
          item-text="type"
          item-value="id"
          label="Type"
          required
        ></v-select>

        <v-btn
          :disabled="!valid"
          color="success"
          @click="save()"
        >
          Save
        </v-btn>

        <v-btn
          :to="{name: 'employees'}"
        >
          Cancel
        </v-btn>
      </v-form>
    </template>

  </v-container>
</template>

<script>
import axios from 'axios'
import toast from '@/services/toast'

export default {
  data: () => ({
    valid: false,
    employee: {},
    employeeTypes: []
  }),

  async created () {
    const id = +this.$route.params.id;
    if (id !== 0) {
      const res = await axios.get(this.$backendUrl + 'api/employees/' + id)
      this.employee = {
        id: res.data.id,
        name: res.data.nameTemp,
        type: res.data.employeeType
      };
    }
    const resTypes = await axios.get(this.$backendUrl + 'api/employees/roles')
    this.employeeTypes = resTypes.data;
  },

  methods: {
    async save() {
      const employee = {
        id: this.employee.id || 0,
        nameTemp: this.employee.name,
        employeeTypeId: this.employee.type
      }

      if (employee.id){
        await axios.put(this.$backendUrl + 'api/employees/' + employee.id, employee)
      } else {
        await axios.post(this.$backendUrl + 'api/employees/', employee)
      }

      toast.success(`Employee has been ${employee.id ? 'created': 'saved'}.`)
      this.$router.push({name: 'employees'})
    }
  }
}
</script>

<style>

</style>
