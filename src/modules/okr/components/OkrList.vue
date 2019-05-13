<template>
  <v-card flat color="accent">
    <v-card-title class="pa-0 pb-2">
      <h2>{{$t('OKR.myListTitle')}}</h2>
      <v-spacer></v-spacer>
      <v-btn color="info--text">
        <v-icon left>visibility</v-icon>
        {{$t('OKR.companyOKR')}}
      </v-btn>
      <v-btn color="primary">
        <v-icon left>add</v-icon>
        {{$t('OKR.addOKR')}}
      </v-btn>
    </v-card-title>
    <v-card flat>
      <v-expansion-panel class="elevation-0" elevation-0 v-for="(item, index) in data" :key="index">
        <v-expansion-panel-content class="pa-0">
          <template v-slot:actions>
            <v-btn color="accent" icon>
              <v-icon small color="secondary">fa-chevron-down</v-icon>
            </v-btn>
            <div
              class="okr-total pl-2 pt-4 headline font-weight-bold secondary--text"
            >{{item.value}}</div>
          </template>
          <template v-slot:header>
            <v-list three-line>
              <template>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <span
                        class="tertiary--text text-uppercase"
                      >{{$t('OKR.objeciveLabel')}} {{item.id}}</span> |
                      <span class="secondary--text">{{item.count}} {{$t('OKR.krLabel')}}</span>
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      <h2>{{ item.title }}</h2>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-subheader class="mx-3 pa-0">
                  <v-progress-linear :color="item.color" height="15" :value="item.value * 100"></v-progress-linear>
                </v-subheader>
              </template>
            </v-list>
          </template>
          <v-list class="child-list pl-4" three-line>
            <v-list-tile v-for="(subItem, index) in item.items" :key="index">
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-icon
                    v-if="subItem.progress.value > thresholdValue"
                    :color="subItem.progress.color"
                  >check</v-icon>
                  <v-icon v-else color="secondary">create</v-icon>
                  {{ subItem.title }}
                </v-list-tile-title>
                <v-list-tile-sub-title class="pt-1">
                  <v-progress-linear
                    :color="subItem.progress.color"
                    height="10"
                    :value="subItem.progress.value * 100"
                  ></v-progress-linear>
                </v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action class="pt-1 ml-1 mr-3">
                <v-list-tile-action-text>
                  <v-icon
                    v-if="subItem.progress.value > thresholdValue"
                    large
                    :color="subItem.progress.color"
                  >toggle_on</v-icon>
                  <v-icon v-else large :color="subItem.progress.color">toggle_off</v-icon>
                </v-list-tile-action-text>
                <span
                  :class="'pt-0 pr-1 title font-weight-bold ' + subItem.progress.color + '--text'"
                >{{subItem.progress.value | formatNumber}}</span>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      thresholdValue: 0.7,
      selectedPanel: 0,
      data: [
        {
          action: "check",
          id: 1,
          count: 3,
          title: "Design and launch internal Employee Academy",
          active: true,
          value: 0.6,
          color: "blue",
          items: [
            {
              title: "Survey 15 team leaders on our educational needs and gaps",
              progress: { color: "green", value: 1 }
            },
            {
              title: "Survey 15 team leaders on our educational needs and gaps",
              progress: { color: "red", value: 0.3 }
            },
            {
              title: "Survey 15 team leaders on our educational needs and gaps",
              progress: { color: "red", value: 0.5 }
            }
          ]
        },
        {
          action: "check",
          id: 2,
          count: 2,
          title: "Design and launch internal Employee Academy",
          active: false,
          value: 0.5,
          color: "red",
          items: [
            {
              title: "Survey 15 team leaders on our educational needs and gaps",
              progress: { color: "green", value: 1 }
            },
            {
              title: "Survey 15 team leaders on our educational needs and gaps",
              progress: { color: "red", value: 0.5 }
            }
          ]
        },
        {
          action: "check",
          id: 3,
          count: 2,
          title: "Design and launch internal Employee Academy",
          active: false,
          value: 0.8,
          color: "green",
          items: [
            {
              title: "Survey 15 team leaders on our educational needs and gaps",
              progress: { color: "green", value: 1 }
            },
            {
              title: "Survey 15 team leaders on our educational needs and gaps",
              progress: { color: "red", value: 0.5 }
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
.okr-total {
  margin-top: 10px;
}

.theme--light.v-sheet {
  background-color: #F5F9FC;
}

.v-expansion-panel {
  border: 2px solid #B5D6EC;
  margin-bottom: 20px;
}

.v-progress-linear {
  &__bar__determinate {
    border-radius: 10px;
  }

  border-radius: 10px;
}

.v-expansion-panel__header {
  padding-bottom: 0;
  padding-top: 0;
}

.v-list__tile__action--stack {
  justify-content: unset;
}

.child-list .v-list__tile {
  border-bottom: 3px solid #f5f9fc;
}
</style>
