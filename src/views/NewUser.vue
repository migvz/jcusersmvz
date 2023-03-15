<template>
  <UserContainer :user="{ _id: '' }" />
</template>

<script lang="ts">
import { users } from '../api/systemUsers'
import type { User } from '../api/systemUsers'
import UserContainer from '@/components/UserContainer.vue'
export default {
  components: {
    UserContainer
  }
}
</script>
