<template>
  <div>
    <span>{{ calculatedLabel }}</span>
    <SwitchComponentType
      v-if="typeof value === 'object' && deep > 0"
      v-for="(v, p) in value"
      :propertyName="String(p)"
      :value="v"
      :deep="deep - 1"
    />
    <input
      v-else
      :type="calculatedType"
      :checked="!!value"
      :disabled="calculatedDisable"
      :value="value"
      @input="changeHandler"
    />
  </div>
</template>

<script lang="ts">
import { configFields } from '../api/configUsers'

export default {
  name: 'SwitchComponentType',
  emits: ['update:value'],
  props: {
    value: [String, Number, Boolean, Object],
    propertyName: String,
    editable: Boolean,
    deep: {
      type: Number,
      default() {
        return 3
      }
    }
  },
  computed: {
    calculatedType(): string {
      switch (typeof this.value) {
        case 'number':
          return 'number'
        case 'boolean':
          return 'checkbox'
        default:
          return 'text'
      }
    },
    calculatedLabel(): string {
      const key = this.propertyName as string
      if (configFields[key] && configFields[key].label) {
        return configFields[key].label
      }
      return key ?? ''
    },
    calculatedDisable(): boolean {
      const key = this.propertyName as string
      if (configFields[key] && configFields[key].editable) {
        return !this.editable
      }
      return true
    }
  },
  methods: {
    changeHandler(ev: Event) {
      const el = ev.target as HTMLInputElement
      this.$emit('update:value', typeof this.value === 'boolean' ? el.checked : el.value)
    }
  }
}
</script>
