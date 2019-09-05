<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex>
        <h2 class="headline mb-3">
          Positions Grade
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon color="primary">info</v-icon>
              </v-btn>
            </template>
            <span style="color: white;">
              Here you can configure Employee Roles with grades and recommended skills set. <br>
              Each Employee should be assigned to an organization role (e.g. Developer, QA, Manager, etc.) <br>
              Project positions should be created in alignment with the Role grades (e.g. Junior Developer, Middle QA, etc.) <br>
              Role Grades help to better understand and define employee career paths.
            </span>
          </v-tooltip>
        </h2>
      </v-flex>
      <v-flex class="text-xs-right">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openEditRoleDialog()">Add Role</v-btn>
      </v-flex>
      <v-flex xs12 class=" mb-4">

      </v-flex>
    </v-layout>

    <v-layout row wrap v-for="role in roles" :key="role.id" class="mb-3">
      <v-flex xs12 class="mb-1">
        <span class="subheading">{{ role.type }}</span>

        <v-btn icon small class="mr-0" @click="openEditRoleDialog(role)"><v-icon small>edit</v-icon></v-btn>
        <v-btn icon small class="ml-0" @click="removeRole(role)"><v-icon small>clear</v-icon></v-btn>

        <v-btn small @click="expandCollapseRole(role)">{{role.expanded ? 'Collapse' : 'Expand'}} Skills</v-btn>
        <v-btn small @click="gradeDialog.role = role; gradeDialog.open = true" color="primary" >Add Grade</v-btn>
      </v-flex>

      <v-flex >
        <v-card flat >
          <v-card-text :class="{'overflow-hidden': role.expanded }">
        <v-layout row align-content-center :class="{'horiz-scroll': role.expanded}">
          <!-- fix key -->
          <!-- v-bind="{ [`xs${role.expanded ? 5 : 2}`]: true }" -->
          <v-flex v-bind="!role.expanded ? { [`xs2`]: true } : {}" v-for="grade in role.roleGrade" :key="grade.name" class="mr-2">
            <v-card>
              <v-card-title class="pr-2">
                <v-layout>
                {{ grade.name }}
                <v-spacer></v-spacer>
                <v-btn icon small class="ma-0"><v-icon small>edit</v-icon></v-btn>
                <!-- <v-btn icon small class="ma-0"><v-icon small>clear</v-icon></v-btn> -->
                </v-layout>
              </v-card-title>
              <!--
                type {
                  id: any;
                  name: string;
                  levels: int[];  // has length 5, values are true/false-ish
                  competenceLevel: int; // index of the levels array
                }
               -->
              <v-card-text v-if="role.expanded">
                <span class="caption grey--text"
                  v-if="!getCompetenceRows(role, grade).length"
                  >
                  No skills yet...
                </span>
                <table class="skillHeaderRow"
                  v-else>
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
                <table class="skillRow" v-for="competence in getCompetenceRows(role, grade)" :key="competence.id">
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
              </v-card-text>
              <v-card-actions>
                <v-btn flat block color="primary" @click="openSkillsConfigurationDialog(role, grade)">Configure Skills</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog
      v-model="roleDialog.open"
      @keydown.esc="roleDialog.open = false"
      max-width="300"
    >
      <v-card>
        <v-card-title class="headline">
          {{ roleDialog.role.id ? "Edit Role Name" : "Create new Role"}}
          <v-text-field v-model="roleDialog.role.type"></v-text-field>
        </v-card-title>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="roleDialog.open = false">Cancel</v-btn>
        <v-btn @click="saveRole()" color="primary">Save</v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="gradeDialog.open"
      @keydown.esc="gradeDialog.open = false"
      max-width="400"
    >
      <v-card v-if="gradeDialog.open">
        <v-card-title class="headline">
          Grade name (Role: {{gradeDialog.role.type}})
          <v-text-field v-model="gradeDialog.name"></v-text-field>
        </v-card-title>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="gradeDialog.open = false">Cancel</v-btn>
        <v-btn @click="addGrade()" color="primary">Add</v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="skillsDialog.open"
      @keydown.esc="skillsDialog.open = false"
      max-width="800"
      scrollable
    >
      <v-card v-if="skillsDialog.open">
        <v-card-title class="headline">
          Configure
          <v-spacer></v-spacer>
          <div class="subheading">
            <v-checkbox @change="showSelected" v-model="skillsDialog.showAll" label="Show selected"></v-checkbox>
          </div>
        </v-card-title>

        <v-card-text>
          <table class="skillHeaderRow" >
            <tbody>
              <tr>
                <td style="">

                </td>
                <td v-for="i in [1,2,3,4,5]" :key="i" style="width: 60px;"
                  class="text-xs-center">
                  {{ `E${i}` }}
                </td>
              </tr>
            </tbody>
          </table>
          <table class="skillRow" v-for="competence in skillsDialog.filteredSkills" :key="competence.id">
            <tbody>
              <tr>
                <td style="">
                  <v-layout>
                    <v-checkbox
                      v-model="skillsDialog.selected"
                      :value="competence.id"
                      :hide-details="true"
                      :label="competence.name"
                      :disabled="!skillsDialog.selected.includes(competence.id)"></v-checkbox>

                    <v-spacer></v-spacer>
                    <CompetenceInfo :competence="competence"></CompetenceInfo>
                    <!-- {{ competence.name }} -->
                  </v-layout>
                </td>
                <td v-for="i in [1,2,3,4,5]" :key="i"
                  class="competenceLevelFill text-xs-center"
                  style="width: 60px;"
                  :class="{
                    'required': competence.competenceLevel === i,
                    'available': competence.levels[i - 1],// && i < competence.competenceLevel
                    'selected': i == competence.competenceLevel
                  }"
                  @click="competence.competenceLevel = i; !skillsDialog.selected.includes(competence.id) && skillsDialog.selected.push(competence.id)"
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
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="skillsDialog.open = false">Cancel</v-btn>
          <v-btn primary @click="saveSkills()" color="primary">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import axios from 'axios'
import CompetenceInfo from '@/components/CompetenceInfo.vue'

export default {
  components: {
    CompetenceInfo
  },
  data: () => ({
    roleDialog: {
      open: false,
      role: {},
      link: null,
    },
    gradeDialog: {
      open: false,
      role: null,
      name: null,
    },
    skillsDialog: {
      open: false,
      role: null,
      grade: null,
      allSkills: null,
      filteredSkills: null,
      selected: [],
      showAll: false
    },
    roles: [],
    roleGradeCompetences: {}
  }),

  async created(){
    const res = await axios.get(this.$backendUrl + `api/RoleGrades/role`);
    this.roles = res.data;
  },

  methods: {
    async expandCollapseRole(role){
      this.$set(role, "expanded", !role.expanded);// {expanded: !role.expanded });
      if (role.expanded) {
        await this.loadGradeCompetences(role);
      }
    },
    async loadGradeCompetences(role) {
      if (!this.roleGradeCompetences[role.id]) {
        const res = await axios.get(this.$backendUrl + `api/RoleGrades/${role.id}/competences`);
        this.$set(this.roleGradeCompetences, role.id, res.data)
      }
    },
    async removeRole(role) {
      if (role.roleGrade && role.roleGrade.length) {
        alert(`The Role ${role.type} has grades, first remove all the grades to remove this role...`);
        return;
      }
      if (confirm(`Are you sure you want to remove an organization role - ${role.type}?`)) {
        const res = await axios.delete(this.$backendUrl + `api/RoleGrades/role/${role.id}`);
        this.roles.splice(this.roles.indexOf(role), 1);
      }
    },
    openEditRoleDialog(role) {
      const r = role || {};
      this.roleDialog.link = role;
      this.roleDialog.role = { id: r.id, type: r.type };
      this.roleDialog.open = true;
    },
    async saveRole() {
      const data = { ...this.roleDialog.role };
      const res = data.id
        ? await axios.put(this.$backendUrl + `api/RoleGrades/role/${data.id}`, data)
        : await axios.post(this.$backendUrl + `api/RoleGrades/role`, data);

      this.roleDialog.open = false;

      if (data.id) {
        this.roleDialog.link.type = data.type;
      } else {
        this.roles.push(res.data)
      }
    },
    async addGrade(){
      const role = this.gradeDialog.role;
      const data = {
        name: this.gradeDialog.name,
        employeeTypeId: role.id,
        order: role.roleGrade.length + 1
      }
      const res = await axios.post(this.$backendUrl + `api/RoleGrades`, data);

      this.gradeDialog.name = '';
      this.gradeDialog.open = false;

      role.roleGrade.push(res.data);
    },
    async openSkillsConfigurationDialog(role, grade) {
      this.skillsDialog.role = role;
      this.skillsDialog.grade = grade;
      this.skillsDialog.open = true;

      await this.loadGradeCompetences(role);
      const res = await axios.get(this.$backendUrl + `api/Competences/rows`);
      this.skillsDialog.allSkills = res.data;
      this.skillsDialog.filteredSkills = this.skillsDialog.allSkills;

      const competenceRows = this.getCompetenceRows(role, grade);
      const competences = competenceRows.length || grade.order == 1
          ? competenceRows
          : this.getCompetenceRows(role, role.roleGrade.filter(g => g.order == grade.order-1)[0]);
      this.skillsDialog.selected = competences.map(c => c.id)
      this.skillsDialog.allSkills.forEach(c => {
        if (this.skillsDialog.selected.includes(c.id)) {
          c.competenceLevel = competences.filter(gc => gc.id == c.id)[0].competenceLevel
        }
      })
    },
    getCompetenceRows(role, grade) {
      const t = this.roleGradeCompetences[role.id];
      return t
        ? t[grade.id].rows
        : [];
    },
    showSelected(checked) {
      this.skillsDialog.filteredSkills = checked
        ? this.skillsDialog.allSkills.filter(c => this.skillsDialog.selected.includes(c.id))
        : this.skillsDialog.allSkills;
    },
    async saveSkills(){
      const selected = this.skillsDialog.allSkills.filter(c => this.skillsDialog.selected.includes(c.id));
      const gradeRows = this.getCompetenceRows(this.skillsDialog.role, this.skillsDialog.grade);
      const byId = {}
      gradeRows.forEach(r => {
        byId[r.id] = r.roleGradeCompetenceId
      })
      const data = selected.map(s => ({
        id: byId[s.id] ? byId[s.id].roleGradeCompetenceId : 0,
        roleGradeId: this.skillsDialog.grade.id,
        competenceId: s.id,
        competenceLevelMark: s.competenceLevel
      }))

      const res = await axios.post(this.$backendUrl + `api/RoleGrades/${this.skillsDialog.role.id}/competences`, data);

      const rows = this.getCompetenceRows(this.skillsDialog.role, this.skillsDialog.grade);
      rows.length = 0;
      Array.prototype.push.apply(rows, res.data)
      this.skillsDialog.open = false
    },
    async save(){

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
