import { watch } from 'vue';
import type { Ref } from 'vue';

export function useWatchCharacters(
  valueToWatch: Ref<string>,
  maxChars: number = 100
) {
  watch(valueToWatch, (newValue) => {
    if (newValue.length >= maxChars) {
      alert(`Only ${maxChars} characters allowed!`);
    }
  });
}
