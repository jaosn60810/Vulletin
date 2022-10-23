<template>
  <div class="card p-4 mb-5" :class="`has-background-${bgColor}-dark`">
    <div class="field">
      <div class="control">
        <label v-if="label" class="label has-text-white">{{ label }}</label>
        <textarea
          v-auto-focus
          class="textarea"
          :placeholder="placeholder"
          ref="textAreaRef"
          :value="modelValue"
          @input="
            $emit(
              'update:modelValue',
              ($event.target as HTMLTextAreaElement).value
            )
          "
          maxlength="100"
        ></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { vAutoFocus } from '@/directives/vAutoFocus';

// =================================================================

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: 'success',
  },
  placeholder: {
    type: String,
    default: 'Add a new note',
  },
  label: {
    type: String,
  },
});
const emits = defineEmits(['update:modelValue']);

// =================================================================

const textAreaRef = ref<HTMLTextAreaElement | null>(null);

// =================================================================

const focusTextArea = () => textAreaRef.value?.focus();

// =================================================================

defineExpose({
  focusTextArea,
});
</script>

<style scoped></style>
