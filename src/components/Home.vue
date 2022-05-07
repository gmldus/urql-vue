<template>
  <button v-if="!getInfo" @click="getInfo = true">Get Info</button>
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
      <router-link :to="{ path: `/person/${person.id}` }">{{ person.name }} ({{ person.age }})</router-link>
    </div>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useQuery } from '@urql/vue';

export default defineComponent({
  name: 'App',
  setup() {
    const getInfo = ref(false);
    const { fetching, data, error } = useQuery({
      query: `
        {
          people {
            id
            name
            age
          }
        }
      `,
      pause: computed(() => !getInfo.value)
    });

    return {
      getInfo,
      fetching,
      data,
      error,
    };
  },
});
</script>