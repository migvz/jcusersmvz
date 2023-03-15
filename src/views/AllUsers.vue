<template>
  <UserContainer v-for="user in users" :user="user" />
  <!-- <UserContainer :user="{_id:''}" /> -->
</template>

<script lang="ts">
import { users } from '../api/systemUsers'
import type { User } from '../api/systemUsers'
import UserContainer from '@/components/UserContainer.vue'
export default {
  components: {
    UserContainer
  },
  data(): { users: User[] } {
    return {
      users: [],
    }
  },
  methods: {
    getUsers() {
      users.getAll().then((users) => {
        this.users = users
      })
    }
  },
  mounted() {
    this.getUsers()
  }
}
</script>
