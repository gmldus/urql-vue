<template>
  <template v-if="fetching">
    Loading...
  </template>
  <template v-else-if="error">
    Error !
  </template>
  <template v-else-if="data && data.people">
    <div
      v-for="person in data.people"
      :key="person.id"
    >
      {{ person.name }} ({{ person.age }})
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery } from '@urql/vue';

export default defineComponent({
  name: 'App',
  setup() {
    const { fetching, data, error } = useQuery({
      query: `
        {
          people {
            id
            name
            age
          }
        }
      `
    });

    return {
      fetching,
      data,
      error,
    };
  },
});
</script>