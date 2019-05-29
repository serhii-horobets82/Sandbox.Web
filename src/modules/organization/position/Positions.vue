<template>
  <v-container>
    <v-layout row wrap class="align-center">
      <v-flex xs6>
        <h1>Positions for Project: {{ project.name }}</h1>
      </v-flex>
      <v-flex xs6 text-xs-right>
        <v-btn @click="openRoleDialog()">Add Project Role</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex >
        <v-layout v-for="role in positionsByRole" :key="role.id">
          <v-flex>
            <v-card>
              <v-card-title>{{ role.type }}</v-card-title>
              <v-card-text>
                <v-layout>
                  <v-flex v-for="grade in role.roleGrade" :key="grade.name" class="mr-2">
                    <v-card>
                      <v-card-title>{{ grade.name }}</v-card-title>
                      <v-card-text></v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-dialog
      v-model="roleDialog.open"
      @keydown.esc="roleDialog.open = false"
      max-width="300"
    >
      <v-card>
        <v-card-title class="headline">
          Add project role
        </v-card-title>

        <v-card-text>
          <v-select
            :items="roleDialog.availableRoles"
            v-model="roleDialog.roleId"
            label="Select..."
            :hide-details="true"
            item-text="type"
            item-value="id"
            solo
          ></v-select>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="roleDialog.open = false">Cancel</v-btn>
          <v-btn @click="addRole()" color="primary">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <!-- <v-card>

      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex xs12 md6 lg4 v-for="position in positions" :key="position.id">
            <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>

                <div class="headline">{{ position.name }}</div>
                <v-spacer></v-spacer>
                <v-btn icon flat color="white" v-if="false" :to="{name: 'project-positionEdit', params: {id: position.id, projectId: $route.params.projectId }}">
                  <v-icon>edit</v-icon>
                </v-btn>

              </v-card-title>
              <v-card-text>
                <v-card v-for="item in position.positionRole" :key="item.id" class="mb-1">
                  <v-card-title>
                      <span class="subheading">{{ item.role.name }}</span>

                      <v-spacer></v-spacer>
                      <v-btn flat icon @click="expandCollapse(item)">
                        <v-icon >
                          {{item.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}
                        </v-icon>
                      </v-btn>
                  </v-card-title>

                  <v-divider v-if="item.expanded"></v-divider>
                  <v-card-text v-if="item.expanded">
                    <EcfCompetenceRow v-for="competence in (getRoleCompetences(item.role) || [])" :key="competence.id"
                      :competence="competence"
                      :competenceLevels="competence.levels"
                      ></EcfCompetenceRow>
                  </v-card-text>
                </v-card>

              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card> -->

  </v-container>
</template>

<script>
import axios from 'axios';
// import EcfCompetenceRow from '@/components/EcfCompetenceRow.vue'

export default {
  components: {
    // EcfCompetenceRow
  },

  data() {
    return {
      positions: null,
      project: {},
      roles: [],
      roleDialog: {
        open: false,
        // roles: [],
        availableRoles: []
      },
      gradesByRoleId: {} // { [key: string] : any[] }
    }
  },

  async created() {
    const projectId = this.$route.params.projectId;
    const roleRes = await axios.get(this.$backendUrl + `api/Employees/roles`);

    const res = await axios.get(this.$backendUrl + `api/RoleGrades/role`);
    const byId = {}
    res.data.forEach(d => {
      byId[d.id] = d.roleGrade
    })
    this.gradesByRoleId = byId;
    // const res = await axios.get(this.$backendUrl + `api/projects/${projectId}`);
    // this.project = res.data;
    // const response = await axios.get(this.$backendUrl + `api/positions/project/${projectId}`)
    // this.positions = response.data;
  },

  methods: {
    async openRoleDialog() {
      this.roleDialog.open = true;
      const res = await axios.get(this.$backendUrl + `api/RoleGrades/role`);
      this.roleDialog.availableRoles = res.data;
    },
    async addRole() {

      // const res = await axios.get(this.$backendUrl + `api/`);
      this.roles.push = this.roleDialog.availableRoles.filter(r => r.id == this.roleDialog.roleId)[0]
      this.roleDialog.open = false;
    },
    getRoleCompetences(role){
      const competences = []
      for (let c of role.ecfRoleCompetence) {
        const item = {
          id: c.competence.id,
          name: c.competence.name,
          levels: [],
          roleLevel: c.competenceLevel
        }

        for (let level of c.competence.ecfCompetenceLevel) {
          item.levels[level.level] = {
            description: level.description,
            level: level.level
          }
        }

        competences.push(item)
      }
      return  competences
    },

    expandCollapse(item) {
      if (item.expanded == undefined) {
        this.$set(item, 'expanded', true)
      }
      else {
        item.expanded = !item.expanded
      }
    }
  }
}
</script>

<style>

</style>
