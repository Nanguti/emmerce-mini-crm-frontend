<template>
  <v-alert :type="type" dismissible>
    <template #title>{{ title }}</template>
    {{ text }}
  </v-alert>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "info",
  },
});
</script>
