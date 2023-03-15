<template>
    <v-expansion-panels v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-title>
          <v-chip class="ma-2" color="info" variant="outlined">
            <v-icon start icon="mdi-account"></v-icon>
            {{ userData.email }}
          </v-chip>
          <v-chip class="ma-2" color="info" variant="outlined">
            <v-icon start icon="mdi-identifier"></v-icon>
            ({{ userData._id }})
          </v-chip>
          <v-chip v-if="error" class="ma-2" color="red" text-color="white">
            {{ error }}
          </v-chip>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <form :key="userData._id" :id="userData._id" @submit.prevent="validateForm">
            <v-container>
              <v-row justify="space-between" class="text-center">
                <v-col sm="4">
                  <v-btn v-if="!editing" @click="toggleEdit" icon="mdi-pencil" color="info"></v-btn>
                </v-col>

                <v-col sm="4">
                  <v-btn v-if="!editing" @click="onDelete" icon="mdi-delete" color="info"></v-btn>
                </v-col>

                <v-col sm="4">
                  <v-btn v-if="editing" type="submit" icon="mdi-content-save" color="info"></v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col v-for="(value, propertyName) in computedUser" cols="12" sm="6" md="4" lg="3">
                  <SwitchComponentType
                    :propertyName="String(propertyName)"
                    :editable="editing"
                    :value="value"
                    @update:value="(newValue) => (userData[propertyName] = newValue)"
                  />
                </v-col>
              </v-row>
            </v-container>
          </form>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
</template>

<script lang="ts">
import SwitchComponentType from './SwitchComponentType.vue'
import type { User } from '../api/systemUsers'
import { users } from '../api/systemUsers'
import { configFields } from '../api/configUsers'
import type { PropType } from 'vue'

export default {
  components: {
    SwitchComponentType
  },
  data(): { userData: User; editing: boolean; error: string; panel: any } {
    return {
      userData: {
        ...this.user
      },
      editing: !this.user?._id,
      error: '',
      panel: !this.user?._id ? [0] : []
    }
  },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    },
    editable: Boolean,
    onUserRemoved: Function
  },
  computed: {
    computedUser() {
      const tempUser = { ...this.user }
      const user: User = { _id: this.user?._id }
      for (const field in configFields) {
        user[field] = this.userData[field]
        delete tempUser[field]
      }
      return { ...user, ...tempUser }
    }
  },
  methods: {
    validateForm() {
      for (const field in configFields) {
        if (configFields[field].mandatory && !this.userData[field])
          return (this.error = 'Please fill all mandatory fields')
      }
      if (this.user?._id) users.update(this.user?._id, this.userData).then(this.toggleEdit)
      else users.create(this.userData).then(() => this.$router.push('/'))
      return (this.error = '')
    },
    toggleEdit() {
      this.editing = !this.editing
    },
    onDelete() {
      if (this.user?._id)
        users
          .delete(this.user?._id)
          .then(() => (this.onUserRemoved ? this.onUserRemoved(this.user?._id) : null))
    }
  }
}
</script>
