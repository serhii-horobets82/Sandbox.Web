<template>
  <v-container>
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
            <span>
              Here you can configure Employee Roles with grades and recommended skills set. <br>
              Each Employee should be assigned to an organization role (e.g. Developer, QA, Manager, etc.) <br>
              Project positions should be created in alignment with the Role grades (e.g. Junior Developer, Middle QA, etc.) <br>
              Role Grades help to better understand and define employee career paths.
            </span>
          </v-tooltip>
        </h2>
        <span class="red--text">(DEMO!!! Data is not saved anywhere!! only on the front end)</span>
      </v-flex>
      <v-flex class="text-xs-right">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="roleDialog.open = true">Add Role</v-btn>
      </v-flex>
      <v-flex xs12 class=" mb-4">

      </v-flex>
    </v-layout>

    <v-layout row wrap v-for="role in roles" :key="role.id" class="mb-3">
      <v-flex xs12 class="mb-1">
        <span class="subheading">{{ role.name }}</span>

        <v-btn small @click="expandCollapseRole(role)">Expand Skills</v-btn>
        <v-btn small @click="gradeDialog.role = role; gradeDialog.open = true" color="primary" >Add Grade</v-btn>
      </v-flex>

      <v-flex >
        <v-card flat >
          <v-card-text :class="{'overflow-hidden': role.expanded }">
        <v-layout row align-content-center :class="{'horiz-scroll': role.expanded}">
          <!-- fix key -->
          <!-- v-bind="{ [`xs${role.expanded ? 5 : 2}`]: true }" -->
          <v-flex v-bind="!role.expanded ? { [`xs2`]: true } : {}" v-for="grade in role.grades" :key="grade.name" class="mr-2">
            <v-card>
              <v-card-title>
              {{ grade.name }}
              </v-card-title>
              <v-card-text v-if="role.expanded">
                <table class="skillHeaderRow" >
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
                <table class="skillRow" v-for="competence in grade.competences" :key="competence.id">
                  <tbody>
                    <tr>
                      <td style="width: 50%">
                        {{ competence.name }}
                      </td>
                      <td v-for="i in [1,2,3,4,5]" :key="i"
                        class="competenceLevelFill text-xs-center"
                        style="width: 10%"
                        :class="{
                          'required': competence.roleLevel === i,
                          'available': competence.levels[i],// && i < competence.roleLevel
                          'selected': i == competence.roleLevel
                        }"
                        >
                        <v-icon style="color: #B5D6EC" small v-if="!competence.levels[i]">block</v-icon>
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
          Role name
          <v-text-field v-model="roleDialog.name"></v-text-field>
        </v-card-title>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="roleDialog.open = false">Cancel</v-btn>
        <v-btn @click="addRole()">Add</v-btn>
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
          Grade name (Role: {{gradeDialog.role.name}})
          <v-text-field v-model="gradeDialog.name"></v-text-field>
        </v-card-title>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="gradeDialog.open = false">Cancel</v-btn>
        <v-btn @click="addGrade()">Add</v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="skillsDialog.open"
      @keydown.esc="skillsDialog.open = false"
      max-width="650"
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
                <td style="width: 50%">

                </td>
                <td v-for="i in [1,2,3,4,5]" :key="i"
                  class="text-xs-center">
                  {{ `E${i}` }}
                </td>
              </tr>
            </tbody>
          </table>
          <table class="skillRow" v-for="competence in skillsDialog.filteredSkills" :key="competence.id">
            <tbody>
              <tr>
                <td style="width: 50%">
                  <v-checkbox
                    v-model="skillsDialog.selected"
                    :value="competence.id"
                    :hide-details="true"
                    :label="competence.name"
                    :disabled="!skillsDialog.selected.includes(competence.id)"></v-checkbox>
                  <!-- {{ competence.name }} -->
                </td>
                <td v-for="i in [1,2,3,4,5]" :key="i"
                  class="competenceLevelFill text-xs-center"
                  style="width: 10%"
                  :class="{
                    'required': competence.roleLevel === i,
                    'available': competence.levels[i],// && i < competence.roleLevel
                    'selected': i == competence.roleLevel
                  }"
                  @click="competence.roleLevel = i; !skillsDialog.selected.includes(competence.id) && skillsDialog.selected.push(competence.id)"
                  >
                  <v-icon style="color: #B5D6EC" small v-if="!competence.levels[i]">block</v-icon>
                </td>
              </tr>
            </tbody>
          </table>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="skillsDialog.open = false">Cancel</v-btn>
          <v-btn primary @click="saveSkills()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import axios from 'axios'
import EcfCompetenceRow from '@/components/EcfCompetenceRow.vue'

export default {
  components: {
    EcfCompetenceRow
  },
  data: () => ({
    roleDialog: {
      open: false,
      name: null,
    },
    gradeDialog: {
      open: false,
      role: null,
      name: null,
    },
    skillsDialog: {
      open: false,
      grade: null,
      allSkills: null,
      filteredSkills: null,
      selected: [],
      showAll: false
    },
    roles: [
      {
        id: 1,
        name: 'Developer',
        grades: [
          {name: 'Junior Developer', order: 1, competences: []},
          {name: 'Middle Developer', order: 2, competences: []},
          {name: 'Senior Developer', order: 3, competences: []},
          {name: 'Team/Tech Lead', order: 4, competences: []},
          {name: 'Architect', order: 5, competences: []},
        ]
      },
      {
        id: 2,
        name: 'QA',
        grades: [
          {name: 'Junior QA', order: 1, competences: []},
          {name: 'Middle QA', order: 2, competences: []},
          {name: 'Senior QA', order: 3, competences: []},
          {name: 'Team/Tech Lead QA', order: 4, competences: []},
        ]
      },
      {
        id: 3,
        name: 'QA Automation',
        grades: [
          {name: 'Junior QA Automation', order: 1, competences: []},
          {name: 'Middle QA Automation', order: 2, competences: []},
          {name: 'Senior QA Automation', order: 3, competences: []},
          {name: 'Team/Tech Lead Automation QA', order: 4, competences: []},
        ]
      },
      {
        id: 4,
        name: 'Manager',
        grades: [
          {name: 'Project Coordinator', order: 1, competences: []},
          {name: 'Project Manager', order: 2, competences: []},
          {name: 'Product Manager', order: 3, competences: []},
          {name: 'Portfolio Manager', order: 4, competences: []},
        ]
      }
    ]
  }),

  async created(){

  },

  methods: {
    expandCollapseRole(role){
      this.$set(role, "expanded", !role.expanded);// {expanded: !role.expanded });
    },
    addRole() {
      this.roles.push({name: this.roleDialog.name, id: this.roles[this.roles.length-1].id + 1, grades: []})
      this.roleDialog.name = ''
      this.roleDialog.open = false;
    },
    addGrade(){
      this.gradeDialog.role.grades.push({name: this.gradeDialog.name});
      this.gradeDialog.name = '';
      this.gradeDialog.open = false;
    },
    async openSkillsConfigurationDialog(role, grade) {
      this.skillsDialog.grade = grade;
      this.skillsDialog.open = true;

      const res = await axios.get(this.$backendUrl + `api/Competences/rows`);
      this.skillsDialog.allSkills = res.data;
      this.skillsDialog.filteredSkills = this.skillsDialog.allSkills;

      const competences = grade.competences.length || grade.order == 1
        ? grade.competences
        : role.grades.filter(g => g.order == grade.order-1)[0].competences;
      this.skillsDialog.selected = competences.map(c => c.id)
      this.skillsDialog.allSkills.forEach(c => {
        if (this.skillsDialog.selected.includes(c.id)) {
          c.roleLevel = competences.filter(gc => gc.id == c.id)[0].roleLevel
        }
      })
    },
    showSelected(checked) {
      this.skillsDialog.filteredSkills = checked
        ? this.skillsDialog.allSkills.filter(c => this.skillsDialog.selected.includes(c.id))
        : this.skillsDialog.allSkills;
    },
    saveSkills(){
      this.skillsDialog.grade.competences = this.skillsDialog.allSkills.filter(c => this.skillsDialog.selected.includes(c.id))
      // this.skillsDialog.grade.competences = this.skillsDialog.selected;
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
