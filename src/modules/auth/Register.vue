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
              class="mb-4"
              outline
              prepend-inner-icon="person"
              name="userName"
              :label="$t('Register.userName')"
              type="text"
              :rules="[requireRule]"
              hide-details
              required
              v-model="credentials.userName"
            ></v-text-field>
            <v-text-field
              id="password"
              class="mb-4"
              outline
              prepend-inner-icon="lock"
              name="password"
              :label="$t('Register.password')"
              v-model="credentials.password"
              hide-details
              required
              :rules="[requireRule]"
              type="password"
            ></v-text-field>
            <v-text-field
              id="confirm-password"
              class="mb-4"
              outline
              prepend-inner-icon="lock"
              name="confirm-password"
              :label="$t('Register.confirm-password')"
              v-model="credentials.confirmPassword"
              hide-details
              required
              :rules="[requireRule]"
              type="password"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              block
              @click="tryRegister"
            >{{ $t('Register.register')}}</v-btn>
          </v-card-actions>
          <v-alert :value="isError" type="error">{{ errorMessage }}</v-alert>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { requiredRule } from '@/util/validators';

@Component({
  methods: {
  }
})
export default class RegisterComponet extends Vue {
  requireRule: any = null
  credentials = {
    userName: '',
    password: '',
    confirmPassword: ''
  };
  isError = false;
  errorMessage = '';

  constructor() {
    super();
    const test = () => '';
    this.requireRule = requiredRule(test)
  }

  get form() {
    return this.$refs.form as Vue & { validate: () => boolean };
  }

  tryRegister() {
    const isValid = this.form.validate();
    if (!isValid) { return; }
    alert('Registered')
  }
}
</script>