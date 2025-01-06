<template>
  <v-navigation-drawer
    :model-value="true"
    :rail="!expanded"
    @mouseenter="expanded = true"
    @mouseleave="expanded = true"
    class="bg-grey-darken-4"
  >
    <v-list-item
      prepend-icon="mdi-menu"
      :title="expanded ? 'Menu' : ''"
      class="border-b border-grey-darken-3"
    />

    <v-list nav class="mt-4">
      <v-list-item
        v-for="item in menuItems"
        :key="item.id"
        :to="item.path"
        :prepend-icon="item.icon"
        :title="expanded ? item.label : ''"
        :active="activeItem === item.id"
        @click="activeItem = item.id"
        :class="{ 'bg-primary': activeItem === item.id }"
        class="mb-1 transition-all"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const expanded = ref(true);
const activeItem = ref("dashboard");

const menuItems = [
  {
    id: "dashboard",
    icon: "mdi-home",
    label: "Dashboard",
    path: "/crm/dashboard",
  },
  {
    id: "leads",
    icon: "mdi-account-multiple",
    label: "Leads",
    path: "/crm/leads",
  },
  {
    id: "contacts",
    icon: "mdi-email",
    label: "Contacts",
    path: "/crm/contacts",
  },
  {
    id: "notes",
    icon: "mdi-file-document",
    label: "Notes",
    path: "/crm/notes",
  },
  {
    id: "reminders",
    icon: "mdi-bell",
    label: "Reminders",
    path: "/crm/reminders",
  },
];
</script>

<style scoped>
.v-list-item--active:hover {
  background-color: #4f55c1 !important;
}

.v-list-item:not(.v-list-item--active):hover {
  background-color: rgb(var(--v-theme-grey-darken-3));
}
</style>
