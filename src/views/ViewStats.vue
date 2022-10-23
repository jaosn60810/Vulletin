<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of Characters ( of all notes )</td>
          <td>{{ storeNotes.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <input
      v-auto-focus
      v-model="comment"
      class="input"
      type="text"
      placeholder="Do you love Vulletin?"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { userStoreNotes } from '@/stores/storeNotes';

import { vAutoFocus } from '@/directives/vAutoFocus';
import { useWatchCharacters } from '@/use/useWatchCharacters';

// =========================================

const storeNotes = userStoreNotes();

// =========================================

const comment = ref('');

// =========================================

useWatchCharacters(comment, 50);
</script>
