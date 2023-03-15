<template>
  <v-progress-linear v-if="loading" indeterminate color="blue"></v-progress-linear>
  <v-container v-else>
    <v-container>
      <v-btn icon="mdi-plus" :to="'/create'" color="info"></v-btn>
    </v-container>
    <UserContainer
      v-for="user in users"
      :user="user"
      :onUserRemoved="onUserRemoved"
      :key="user._id"
    />
  </v-container>
</template>

<script lang="ts">
import { users } from '../api/systemUsers'
import type { User } from '../api/systemUsers'
import UserContainer from '@/components/UserContainer.vue'
export default {
  components: {
    UserContainer
  },
  data(): { users: User[]; loading: boolean } {
    return {
      users: [],
      loading: true
    }
  },
  methods: {
    getUsers() {
      users.getAll().then((users) => {
        this.users = users
        this.loading = false
      })
    },
    onUserRemoved(id: string) {
      this.users = this.users.filter((user) => user._id !== id)
    }
  },
  mounted() {
    this.getUsers()
  }
}
</script>
