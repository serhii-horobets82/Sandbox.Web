<template>
  <v-container>
    <v-layout row wrap class="align-center">
      <v-flex xs6>
        <h1>Positions for Project {{ project.name }}</h1>
      </v-flex>
      <v-flex xs6 text-xs-right>
        <v-btn @click="openCareerPathDialog()">New Career Path</v-btn>
        <!-- <v-btn @click="openRoleDialog()">Add Project Role</v-btn> -->
      </v-flex>
    </v-layout>
    <!--
      type careerPath = {
        id;
        name;
        role: {id, type};
        roleGrade: []
      }
     -->
    <v-layout>
      <v-flex >
        <v-layout v-for="path in careerPaths" :key="path.id" class="mb-2">
          <v-flex>
            <v-card>
              <!-- class="pb-0 pt-0" -->
              <v-card-title >
                {{ path.role.type }} | {{ path.name }}
                <v-spacer></v-spacer>
                <span>
                  Team: {{path.team ? path.team.name : '-'}}
                </span>
                <!-- <v-select
                  :items="[{id: 1, name: 'Team 1'}]"
                  item-text="name"
                  item-value="id"
                  v-model="path.teamId"
                  label="Team"
                  style="max-width: 250px;"
                  dense
                ></v-select> -->
              </v-card-title>
              <v-card-text class="pt-0 overflow-hidden">
                <v-layout class="horiz-scroll">
                  <v-flex v-for="grade in gradesByRoleId[path.roleId]" :key="grade.id" class="mr-2" style="max-width: 530px">
                  <!-- <v-flex v-for="grade in role.roleGrade" :key="grade.name" class="mr-2"> -->
                    <v-card flat style="min-width: 200px;">
                      <v-card-title class="pt-1">{{ grade.name }}</v-card-title>
                      <!-- <v-card-text></v-card-text> -->
                      <v-card flat style="background-color: #f5f9fc; min-height: 120px;">
                        <v-btn v-if="!careerCompetences[path.id].positions[grade.id]" @click="openPositionDialog(path.id, path.roleId, grade.id)">+ Add</v-btn>
                        <div v-if="careerCompetences[path.id].positions[grade.id]">
                        <table class="skillHeaderRow">
                          <tbody>
                            <tr>
                              <td style="width: 50%">

                              </td>
                              <td v-for="i in [1,2,3,4,5]" :key="i"
                                class="text-xs-center">
                                {{ `E${i}` }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table class="skillRow"

                          v-for="competence in careerCompetences[path.id].positions[grade.id].competences"
                          :key="competence.id">
                          <tbody>
                            <tr>
                              <td style="width: 50%">
                                <v-layout>
                                  {{ competence.name }}
                                  <v-spacer></v-spacer>
                                  <CompetenceInfo :competence="competence"></CompetenceInfo>
                                </v-layout>
                              </td>
                              <td v-for="i in [1,2,3,4,5]" :key="i"
                                class="competenceLevelFill text-xs-center"
                                style="width: 10%"
                                :class="{
                                  'required': competence.competenceLevel === i,
                                  'available': competence.levels[i - 1],// && i < competence.competenceLevel
                                  'selected': i == competence.competenceLevel
                                }"
                                >
                                <v-icon style="color: #B5D6EC" small v-if="!competence.levels[i - 1]">block</v-icon>
                                <v-tooltip bottom v-if="competence.levels[i - 1] && competence.levels[i - 1].certificates">
                                  <template v-slot:activator="{ on }">
                                    <v-icon
                                      small
                                      v-on="on">assignment</v-icon>
                                  </template>
                                  <span>{{competence.levels[i-1].certificates.map(c=>c.name).join('; ')}}</span>
                                </v-tooltip>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        </div>
                      </v-card>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <!-- <v-layout v-for="role in positionsByRole" :key="role.id">
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
        </v-layout> -->
      </v-flex>
    </v-layout>

    <!-- <v-dialog
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
    </v-dialog> -->

    <v-dialog
      v-model="careerPathDialog.open"
      @keydown.esc="careerPathDialog.open = false"
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline">
          New Career Path
        </v-card-title>

        <v-card-text>
          <v-text-field
            name="name"
            label="Name"
            v-model="careerPathDialog.name"
          ></v-text-field>
          <v-select
            :items="careerPathDialog.availableRoles"
            v-model="careerPathDialog.roleId"
            label="Role"
            :hide-details="true"
            item-text="type"
            item-value="id"
          ></v-select>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="careerPathDialog.open = false">Cancel</v-btn>
          <v-btn @click="addCareerPath()" color="primary">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="positionDialog.open"
      @keydown.esc="positionDialog.open = false"
      :max-width="positionDialog.width"
    >
      <v-card v-if="positionDialog.open">
        <v-card-title class="headline">
          Create position
        </v-card-title>

        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              Company Template
              <v-btn small disabled="">Take</v-btn>
              <v-btn small disabled="">Modify</v-btn>
            </v-flex>
            <v-flex xs12>
                <table class="skillHeaderRow">
                  <tbody>
                    <tr>
                      <td style="width: 50%">

                      </td>
                      <td v-for="i in [1,2,3,4,5]" :key="i"
                        class="text-xs-center">
                        {{ `E${i}` }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="skillRow" v-for="competence in positionDialog.companyTemplate.rows" :key="competence.id">
                  <tbody>
                    <tr>
                      <td style="width: 50%">
                        <v-layout>
                          {{ competence.name }}
                          <v-spacer></v-spacer>
                          <CompetenceInfo :competence="competence"></CompetenceInfo>
                        </v-layout>
                      </td>
                      <td v-for="i in [1,2,3,4,5]" :key="i"
                        class="competenceLevelFill text-xs-center"
                        style="width: 10%"
                        :class="{
                          'required': competence.competenceLevel === i,
                          'available': competence.levels[i - 1],// && i < competence.competenceLevel
                          'selected': i == competence.competenceLevel
                        }"
                        >
                        <v-icon style="color: #B5D6EC" small v-if="!competence.levels[i - 1]">block</v-icon>
                        <v-tooltip bottom v-if="competence.levels[i - 1] && competence.levels[i - 1].certificates">
                          <template v-slot:activator="{ on }">
                            <v-icon
                              small
                              v-on="on">assignment</v-icon>
                          </template>
                          <span>{{competence.levels[i-1].certificates.map(c=>c.name).join('; ')}}</span>
                        </v-tooltip>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </v-flex>
          </v-layout>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="positionDialog.open = false">Cancel</v-btn>
          <v-btn @click="addPosition()" color="primary">Save</v-btn>
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
      projectId: null,
      positions: null,
      project: {},
      roles: [],
      roleDialog: {
        open: false,
        // roles: [],
        availableRoles: []
      },
      careerPathDialog: {
        open: false,
        availableRoles: [],
        roleId: null,
        name: null,
      },
      positionDialog: {
        open: false,
        pathId: null,
        roleId: null,
        gradeId: null,
        width: 600,
        companyTemplate: null
      },
      careerPaths: [],
      gradesByRoleId: {}, // { [key: string] : any[] }
      roleGrades: [],
      careerCompetences: null
    }
  },

  async created() {
    const projectId = this.$route.params.projectId;
    this.projectId = projectId;
    // const roleRes = await axios.get(this.$backendUrl + `api/Employees/roles`);

    const res = await axios.get(this.$backendUrl + `api/RoleGrades/role`);
    const byId = {}
    res.data.forEach(d => {
      byId[d.id] = d.roleGrade
    })
    this.gradesByRoleId = byId;
    this.roleGrades = res.data;

    await this.loadCareerPaths();
    // const res = await axios.get(this.$backendUrl + `api/projects/${projectId}`);
    // this.project = res.data;
    // const response = await axios.get(this.$backendUrl + `api/positions/project/${projectId}`)
    // this.positions = response.data;
  },

  methods: {
    async loadCareerPaths(){
      const res = await axios.get(this.$backendUrl + `api/ProjectCareerPaths/${this.projectId}/competences`);
      this.careerCompetences = res.data;

      const resCareer = await axios.get(this.$backendUrl + `api/ProjectCareerPaths/${this.projectId}`);
      this.careerPaths = resCareer.data;

      // this.careerPaths = [
      //   {id: 1, name: 'Mainenance developer', roleId: 2, role: {type: 'DEV'}, team: {id: 1, name: 'Team 1'}},
      //   {id: 2, name: 'QA', roleId: 3, role: {type: 'QA'}},
      //   {id: 3, name: 'Test data', roleId: 9, role: {type: 'Another role'}},
      // ]
    },
    async openRoleDialog() {
      this.roleDialog.open = true;
      const res = await axios.get(this.$backendUrl + `api/RoleGrades/role`);
      this.roleDialog.availableRoles = res.data;
    },
    async openCareerPathDialog() {
      this.careerPathDialog.open = true;
      this.careerPathDialog.name = null;
      this.careerPathDialog.roleId = null;
      const res = await axios.get(this.$backendUrl + `api/RoleGrades/role`);
      this.careerPathDialog.availableRoles = res.data;
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
    },

    async addCareerPath() {
      const data = {
        name: this.careerPathDialog.name,
        roleId: this.careerPathDialog.roleId,
        projectId: this.projectId,
      }
      const res = await axios.post(this.$backendUrl + `api/ProjectCareerPaths/${this.projectId}`, data);

      this.careerPathDialog.open = false;
      await this.loadCareerPaths();
    },
    async openPositionDialog(pathId, roleId, gradeId) {
      const res = await axios.get(this.$backendUrl + `api/RoleGrades/${roleId}/${gradeId}`);
      console.log(res.data)
      this.positionDialog.pathId = pathId;
      this.positionDialog.roleId = roleId;
      this.positionDialog.gradeId = gradeId;
      this.positionDialog.companyTemplate = res.data[gradeId];
      this.positionDialog.open = true;
    },
    async addPosition() {
      alert('nothing')
      const data = {
        projectId: this.projectId,
        careerPathId: this.positionDialog.pathId,
        roleGradeId: this.positionDialog.gradeId,
        projectPositionCompetence: [

        ]
      }
      this.positionDialog.open = false;
    },
  }
}
</script>


<style scoped lang="scss">
.overflow-hidden {
  overflow: hidden;
}
.horiz-scroll {
  overflow-y: hidden;
  overflow-x: auto;
}
  .skillHeaderRow, .skillRow {
    min-width: 500px;
  }
  .skillHeaderRow {
    width: 100%;
    border-spacing:0;
    margin-bottom: 7px;

    td {
      color: #A2C4DA;
    }
  }

  .skillRow {
    font-size: 12px;
    width: 100%;
    border-spacing:0;
    line-height:40px;
    margin-bottom: 7px;
    color: #3C88B5;
    background-color: white;

    td {
      border: 1px solid #E8EFF7;
    }
    td:first-child {
      padding-left: 20px;
    }
    .v-input--selection-controls {
      margin-top: 0;
      padding-top:0;
    }
    // .v-input.v-input--selection-controls .v-label {
    //   font-size: 12px !important;
    //   color: #A2C4DA !important;
    // }
  }

  .competenceRow {
    font-size: 16px;
    margin: 5px;
  }

  .competenceLevelFill {
    border-spacing: 0;
    // min-width: 22px;
    // height: 22px;
    // margin: 1px;
    // float:left;

    // &.none {
    //   background-color: lightblue;
    // }

    &.available, &.required {
      background-color: rgba(61, 179, 237, 0.15);
      // background-color: #E3F2FD;
      // background-color: lightgreen;
      cursor: pointer;
    }

    &.current {
      background-color: rgba(61, 179, 237, 0.15);
      // background-color: green;
      // cursor: pointer;
    }
    &.selected {
      background-color: #3C88B5;
    }

    &.roleDesired {
      border-color: green;
      border-style: solid;
      border-width: 2px;
      padding: 2px;
      background-clip: content-box;
    }
  }
</style>
