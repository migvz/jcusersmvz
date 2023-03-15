<template>
  <div>
    <v-chip v-if="calculatedType === 'TBH'"> ToBeHandledArray({{ calculatedLabel }}) </v-chip>
    <v-expansion-panels v-else-if="calculatedType === 'expand'">
      <v-expansion-panel>
        <v-expansion-panel-title>
          {{ calculatedLabel }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <SwitchComponentType
            v-for="(v, p) in value"
            :propertyName="String(p)"
            :value="v"
            :deep="deep - 1"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-checkbox
      v-else-if="calculatedType === 'checkbox'"
      :label="calculatedLabel"
      :checked="!!value"
      :disabled="calculatedDisable"
      @input="changeHandler"
    />
    <v-text-field
      v-else
      :label="calculatedLabel"
      :disabled="calculatedDisable"
      :model-value="value"
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
        case 'object':
          if (this.value == null) return 'text'
          return this.deep > 0 ? 'expand' : 'TDB'
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
