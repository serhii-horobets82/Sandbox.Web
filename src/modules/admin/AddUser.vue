<template>
  <v-container fluid>
    <div class="header">
      <h1>Invite new user</h1>
    </div>

    <div v-for="invite in invites" v-bind:key="invite.email">
      <v-layout row class="pb-3">
        <v-flex xs4>
          <span class="body-1">{{invite.email}}</span>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs4>
          <span class="body-1">{{invite.role}}</span>
        </v-flex>
        <v-flex xs2 class="text-xs-center">
          <v-icon medium class="material-icons-outlined">done</v-icon>
        </v-flex>
      </v-layout>
    </div>

    <v-form ref="newuser" v-model="newInvite.valid" :lazy-validation="false">
      <v-layout row class="pb-3">
        <v-flex xs4>
          <!-- return this weith removing storokha mode -->
          <!-- <v-text-field
            class="purple-input"
            label="User email"
            :rules="[emailRule]"
            v-model="newInvite.email"
            :disabled="isLoading"
            :counter="50"
          /> -->

            <v-text-field
            class="purple-input"
            label="User email"
            v-model="newInvite.email"
            :disabled="isLoading"
            :counter="50"
          />

        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs4>
          <v-select
            :items="roles"
            item-text="type"
            item-value="id"
            label="Role"
            v-model="newInvite.role"
            :rules="[requiredRule]"
            :disabled="isLoading"
          ></v-select>
        </v-flex>
        <v-flex xs2 class="text-xs-center">
          <v-btn class="primary" :loading="isLoading" @click="invite()">Invite</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import { emailRule, requiredRule } from "../../util/validators"
import { getRoles, invite, InviteResult } from "./invite.http"
import toast from "@/services/toast"

export default {
  name: "AddUser",
  data() {
    return {
      invites: [],
      newInvite: { email: undefined, valid: false, role: undefined },
      roles: [],
      isLoading: false
    }
  },
  methods: {
    async invite() {
      this.$refs.newuser.validate();
      if (!this.newInvite.valid) {
        return
      }

      this.isLoading = true

      try {
        await invite(this.newInvite)
      } catch (e) {
        const statusCode = e.response.status
        switch (statusCode) {
          case 409:
            return this.mapExists()
          default:
            return this.mapFail()
        }
      } finally {
        this.isLoading = false
      }

      this.mapSuccess()
    },
    emailRule: emailRule("Email is invalid"),
    requiredRule: requiredRule("Select role"),
    mapSuccess() {
      this.invites.push({
        ...this.newInvite,
        role: this.roles.find(x => x.id === this.newInvite.role).type
      })
      this.newInvite = { email: "", valid: true }
      this.$refs.newuser.reset()
      toast.success("Invite was sent")
    },
    mapExists() {
      toast.error("User already exists")
    },
    mapFail() {
      toast.error("Error appeared")
    }
  },
  async beforeRouteEnter(to, from, next) {
    const roles = await getRoles()
    next(component => (component.roles = roles))
  }
}
</script>

<style scoped>
.header {
  margin-bottom: 2em;
}
</style>
