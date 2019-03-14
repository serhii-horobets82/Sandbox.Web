<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md8
      >
        <v-card primary-title>
          <v-card-title>
            <div>
              <div class="headline">Edit Profile</div>
              <span>Complete your profile</span>
            </div>
          </v-card-title>
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="Company (disabled)"
                    disabled/>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    class="purple-input"
                    label="User Name"
                    v-model="profile.fullName"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="Email Address"
                    v-model="profile.email"
                    />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    label="First Name"
                    v-model="profile.firstName"
                    />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    label="Last Name"
                    v-model="profile.lastName"
                    />
                </v-flex>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    label="Adress"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-text-field
                    label="City"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-text-field
                    label="Country"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-text-field
                    class="purple-input"
                    label="Postal Code"
                    type="number"/>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    value=""
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                  >
                    Update Profile
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
      <v-flex
        xs12
        md4
      >
        <v-card class="v-card-profile">
          <v-card-title>
            <v-avatar
              class="mx-auto d-block"
              size="130"
            >
              <img
                v-bind:src="profile.pictureUrl"
                v-bind:alt="profile.fullName">
            </v-avatar>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {mapGetters} from 'vuex';

  @Component({
    computed: mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      profile: 'user/profile',
    }),
  })
  export default class UserProfile extends Vue {
  }
</script>
