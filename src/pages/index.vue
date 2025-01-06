<!-- src/pages/index.vue -->
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  beforeRouteEnter(to, from, next) {
    next("/crm/dashboard");
  },
});
</script>

<template>
  <div />
</template>
