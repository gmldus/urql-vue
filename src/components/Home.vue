<template>
  <button v-if="!getInfo" @click="getInfo = true">Get Info</button>

  <div>
    <input v-model="name" />
    <input v-model="age" type="number" />
    <input v-model="gender" />
    <button @click="add">+ Add Person</button>
  </div>

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
import { useMutation, useQuery } from '@urql/vue';

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

    const { executeMutation: addPerson } = useMutation(`
      mutation ($name: String, $age: Int, $gender: String) {
        addPerson (name: $name, age: $age, gender: $gender) {
          id
          name
          age
        }
      }
    `);

    return {
      getInfo,
      fetching,
      data,
      error,
      addPerson,
    };
  },
  data() {
    return {
      name: '',
      age: 0,
      gender: '',
    };
  },
  methods: {
    add() {
      if (!this.name) {
        return;
      }

      this.addPerson({ name: this.name, age: this.age, gender: this.gender });

      this.name = '';
      this.age = 0;
      this.gender = '';
    },
  },
});
</script>