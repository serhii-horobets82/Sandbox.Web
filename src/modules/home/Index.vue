<template>
  <v-container>
    <v-layout row>
      <h1>My Profile</h1>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-card flat color="#F5F9FC">
          <v-card-title class="pa-0">
            <h3 class="subheading font-weight-bold">My OKR list</h3>
            <v-spacer></v-spacer>
            <v-btn>
              <v-icon left>visibility</v-icon>View company OKR
            </v-btn>
            <v-btn color="primary">
              <v-icon left>add</v-icon>Add OKR
            </v-btn>
          </v-card-title>
        </v-card>
        <v-card>
          <v-list class="pa-0" three-line>
            <v-list-group v-for="item in items" :key="item.title" v-model="item.active" no-action>
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title class="title">{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>

              <v-list-tile v-for="(subItem, index) in item.items" :key="index">
                <v-list-tile-content>
                  <v-list-tile-title>
                    <v-icon :color="subItem.progress.color">check</v-icon>
                    {{ subItem.title }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    <v-progress-linear
                      :color="subItem.progress.color"
                      height="15"
                      :value="subItem.progress.value"
                    ></v-progress-linear>
                  </v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <div class="title" color="red">0.4</div>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6></v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6>
        <h1>Just image for comparison</h1>
        <v-img :src="okr1"/>
      </v-flex>
      <v-flex xs6></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import img from "../../assets/img/okr1.png";
export default {
  data() {
    return {
      okr1: img,
      items: [
        {
          action: "check",
          title: "Design and launch internal Employee Academy",
          active: true,
          items: [
            {
              title: "Survey 15 team leaders on our educational needs and gaps",
              progress: { color: "green", value: 100 }
            },
            {
              title: "Survey 15 team leaders on our educational needs and gaps",
              progress: { color: "red", value: 25 }
            },
            {
              title: "Survey 15 team leaders on our educational needs and gaps",
              progress: { color: "red", value: 50 }
            }
          ]
        }
      ]
    };
  }
};
</script>

