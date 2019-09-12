<template>
  <v-container>
  <v-layout>
    <v-flex>
      <h1 v-if="$route.params.id == 0">Create Position</h1>
      <h1 v-else>Edit project (ID: {{$route.params.id}})</h1>
    </v-flex>

  </v-layout>
  <!-- <v-layout> -->

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
    <v-text-field
      v-model="position.name"
      :counter="150"
      label="Position title"
      required
    ></v-text-field>

    <h2>Roles:</h2>
      <v-card v-for="(role, i) in position.roles" :key="role.id">
        <v-card-title class="headline">
          {{role.name}}

          <v-spacer></v-spacer>

          <v-btn icon @click="removeRole(i)">
            <v-icon color="red">clear</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-layout row wrap>
            <v-flex sm6>
              <v-layout>
                  <v-card flat tile>
                    <v-card-title class="title">Summary</v-card-title>
                    <v-card-text>{{ role.summary }}</v-card-text>
                  </v-card>
              </v-layout>
              <v-layout>
                  <v-card flat tile>
                    <v-card-title class="title">Description</v-card-title>
                    <v-card-text>{{ role.description }}</v-card-text>
                  </v-card>
              </v-layout>
            </v-flex>
            <v-flex sm6>
              <EcfCompetenceRow v-for="competence in (roleCompetences.get(role.id) || [])" :key="competence.id"
                :competence="competence"
                :competenceLevels="competence.levels"></EcfCompetenceRow>
            </v-flex>
          </v-layout>

        </v-card-text>



      </v-card>

    <v-btn @click="dialog = true">Add Role</v-btn>
<!--
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field> -->
    <!-- <v-select
      v-model="position"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select> -->
<!--

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox> -->

    <v-dialog
      v-model="dialog"
      @keydown.esc="dialog = false"
      max-width="800"
      scrollable
    >
      <v-card>
        <v-card-title class="headline">
          <v-layout row align-center class="dialog-header">
            <v-flex xs6>Roles ({{rolesFiltered.length}}/{{roles.length}})</v-flex>
            <v-flex xs6>
              <v-text-field flat
                hide-details
                label="Filter"
                prepend-inner-icon="search"
                v-model="rolesFilter"
                ></v-text-field>
            </v-flex>
          </v-layout>

        </v-card-title>
        <v-card-text>
        <v-card v-for="role in rolesFiltered" :key="role.id">
          <v-card-title class="headline">{{role.name}}</v-card-title>

          <v-card-text>
            {{ role.summary }}
          </v-card-text>

          <v-card-text>
            {{ role.description }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="positionRolesIds.has(role.id)"
              color="green darken-1"
              flat="flat"
              @click="addRole(role)"
            >
              <v-icon v-if="positionRolesIds.has(role.id)" color="success">done</v-icon>
              {{ positionRolesIds.has(role.id) ? 'Added' : 'Add' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false; rolesFilter=''">Done</v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>

    <v-divider></v-divider>

    <v-btn
      :disabled="!valid || !position.name || !position.roles.length"
      color="success"
      @click="create"
    >
      Create
    </v-btn>

    <v-btn :to="{name: 'positions'}">
      Back
    </v-btn>

  </v-form>
  <!-- </v-layout> -->
  </v-container>
</template>

<script>
import axios from 'axios'
import EcfCompetenceRow from '@/components/EcfCompetenceRow.vue'
import toast from '@/services/toast'

export default {
  components: {
    EcfCompetenceRow
  },
  data() {
    return {
      valid: false,
      dialog: false,
      position: {name:'', roles: []},
      roles: [],
      rolesFilter: '',
      positionRolesIds: new Set(),
      roleCompetences: new Map()
    }
  },

  async created(){
    const rolesResponse = await this.$http.get('api/ecfroles');
    this.roles = rolesResponse.data;
  },

  computed: {
    rolesFiltered(){
      const filter = this.rolesFilter.toLowerCase()
      return this.roles.filter(r => r.name.toLowerCase().includes(filter))
    }
  },

  methods: {
    async create(){
      if (!this.position.roles.length){
        alert('Please add at least one role!')
        return;
      }
      const data = {...this.position};
      data.positionRole = data.roles.map(r => ({roleId: r.id}));
      const response = await this.$http.post('api/positions', data)

      toast.success(`Position has been created.`)
      this.$router.push({url: ''})
    },
    async addRole(role){
      if (!this.positionRolesIds.has(role.id)) {
        this.positionRolesIds.add(role.id)
        this.position.roles.push(role)

        const res = await this.$http.get(`api/ecfroles/${role.id}?withCompetences=true`)
        const competences = []
        for (let c of res.data.ecfRoleCompetence) {
          const item = {
            id: c.competence.id,
            name: c.competence.name,
            levels: [],
            roleLevel: c.competenceLevel
          }

          for (let level of c.competence.competenceLevel) {
            item.levels[level.level] = {
              description: level.description,
              level: level.level
            }
          }

          competences.push(item)
        }
        this.roleCompetences.set(role.id, competences)
        console.log(this.roleCompetences.get(role.id))
      }
    },
    removeRole(i) {
      this.position.roles.splice(i, 1)
    }
  }

}
</script>

<style>
  .dialog-header .v-text-field {
    /* margin-top: 0; */
    padding-top: 0;
  }
</style>
