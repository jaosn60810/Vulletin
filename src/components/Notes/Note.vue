<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light">
          <small>{{ characterLength }} </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Edit</a>
      <a
        href="#"
        class="card-footer-item"
        @click.prevent="handleDeleteNoteClicked(note.id)"
        >Delete</a
      >
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['deleteNoteClicked']);

const handleDeleteNoteClicked = (noteId: string) => {
  emit('deleteNoteClicked', noteId);
};

const characterLength = computed(
  () =>
    `${props.note.content.length} ${
      props.note.content.length <= 1 ? `character` : `characters`
    }`
);
</script>

<style scoped></style>
