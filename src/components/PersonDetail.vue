<template>
  <template v-if="fetching">
    Loading...
  </template>
  <template v-else-if="error">
    Error !
  </template>
  <template v-else-if="data && data.person">
    Name : {{ data.person.name }}
    Age: {{ data.person.age }}
    Gender : {{ data.person.gender }}
  </template>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuery } from '@urql/vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const id = ref(route.params.id);

    const { fetching, data, error } = useQuery({
      query: `
        query ($id: Int!) {
          person(id: $id) {
            name
            age
            gender
          }
        }
      `,
      variables: { id: Number(id.value) }
    });

    return {
      id,
      fetching,
      data,
      error,
    };
  },
});
</script>