<template>
  <form @submit.prevent="">
    <input v-model="inputValue" placeholder="Enter city" />
    <button @click="onClick">Search</button>
  </form>
</template>

<script>
export default {
  name: 'WeatherInput',
  data: () => ({
    inputValue: ''
  }),
  props: {
    search: Function,
  },
  methods: {
    onClick() {
      this.$emit('search', this.inputValue);
    }
  }
}
</script>

<style scoped>
  form {
    height: 60px;
  }
  input {
    padding: 12px;
    margin: 4px;
    /* border-radius: 4px; */
    border: 0;
    font-size: 20px;
    box-shadow: 0px 0px 12px 4px rgba(0,0,0,0.6);
  }
  button {
    padding: 12px;
    font-size: 20px;
    border-radius: 4px;
    background-color: #008000ba;
  }
  button:hover {
    background-color: green;
    color: white;
  }
</style>
