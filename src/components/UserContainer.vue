<template>
  <div>
    <div>{{ error }}</div>
    <form :key="userData._id" :id="userData._id" @submit.prevent="validateForm">
      <button v-if="!editing" @click="toggleEdit">Edit</button>
      <button v-if="!editing" @click="onDelete">Delete</button>
      <button v-if="editing" type="submit">Save</button>
      <SwitchComponentType
        v-for="(value, propertyName) in computedUser"
        :propertyName="String(propertyName)"
        :editable="editing"
        :value="value"
        @update:value="(newValue) => (userData[propertyName] = newValue)"
      />
    </form>
  </div>
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
  data(): { userData: User; editing: boolean; error: string } {
    return {
      userData: {
        ...this.user
      },
      editing: !this.user?._id,
      error: ''
    }
  },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    },
    editable: Boolean
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
      this.user?._id ? users.update(this.user?._id, this.userData) : users.create(this.userData)
      return (this.error = '')
    },
    toggleEdit() {
      this.editing = !this.editing
    },
    onDelete() {
      if (this.user?._id) users.delete(this.user?._id)
    }
  }
}
</script>
