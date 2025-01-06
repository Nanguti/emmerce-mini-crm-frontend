<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuth } from "../composables/useAuth";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const route = useRoute();
const { requireAuth } = useAuth();

// Check auth on initial load
onMounted(() => {
  requireAuth(route);
});

// Watch for route changes
watch(
  () => route.path,
  () => requireAuth(route)
);
</script>

<template>
  <v-app>
    <Sidebar />

    <v-main>
      <Navbar />
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>
