<template>
  <v-layout fluid fill-height align-center justify-center>
    <v-flex lg4 md6 xs10>
      <v-card flat>
        <v-card-title>
          <h2>{{$t('Register.welcome')}}</h2>
        </v-card-title>
        <v-form ref="form" lazy-validation>
          <v-card-text class="pa-2">
            <v-text-field
              class="mb-2"
              outline
              prepend-inner-icon="person"
              name="firstName"
              type="text"
              required
              v-model="credentials.firstName"
              :rules="[requireRule]"
              :label="$t('Register.firstName')"
              :counter="50"
            ></v-text-field>
            <v-text-field
              class="mb-2"
              outline
              prepend-inner-icon="person"
              name="lastName"
              type="text"
              required
              v-model="credentials.lastName"
              :rules="[requireRule]"
              :label="$t('Register.lastName')"
              :counter="50"
            ></v-text-field>
            <v-text-field
              id="password"
              class="mb-2"
              outline
              prepend-inner-icon="lock"
              name="password"
              type="password"
              v-model="credentials.password"
              required
              :rules="[requireRule]"
              :counter="16"
              :label="$t('Register.password')"
            ></v-text-field>
            <v-text-field
              id="confirm-password"
              class="mb-2"
              outline
              prepend-inner-icon="lock"
              name="confirm-password"
              type="password"
              v-model="credentials.confirmPassword"
              required
              :label="$t('Register.confirm-password')"
              :counter="16"
              :rules="[requireRule]"
            ></v-text-field>
            <v-select :items="genderList" label="Gender" v-model="credentials.gender"></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="tryRegister">{{ $t('Register.register')}}</v-btn>
          </v-card-actions>
          <v-alert :value="isError" type="error">{{ errorMessage }}</v-alert>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { requiredRule } from "@/util/validators";
import axios from "axios";
import { GENDER } from "@/constants";
import toast from "@/services/toast";

@Component({
  methods: {}
})
export default class RegisterComponet extends Vue {
  requireRule: any = null;
  genderList: any = [
    { text: "Unknown", value: 0 },
    { text: "Male", value: 1 },
    { text: "Female", value: 2 }
  ];

  //Object.keys(GENDER).map((key:string) => ({ id: GENDER[key], name: key }));

  credentials = {
    email: "",
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
    gender: GENDER.Unknown,
    confirmPassword: ""
  };
  isError = false;
  errorMessage = "";

  constructor() {
    super();
    const test = () => "";
    this.requireRule = requiredRule(test);
  }

  get form() {
    return this.$refs.form as Vue & { validate: () => boolean };
  }

  tryRegister() {
    const isValid = this.form.validate();
    if (!isValid) {
      return;
    }
    const id = this.$route.params.pathMatch;
    const code = this.$route.query.code;
    axios
      .post(`api/account/activate${id}`, { ...this.credentials, code })
      .then(res => {
        if (res.data.succeeded) {
          this.$router.push("/logout");
        } else toast.error(res.data.errors);
      })
      .catch(err => {
        console.log(err);
        toast.error(err);
      });
  }
}
</script>