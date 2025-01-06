<template>
  <v-app-bar flat border>
    <v-spacer />

    <!-- Notifications -->
    <v-menu location="bottom end" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props" class="mr-2">
          <v-badge
            color="error"
            :content="notifications.length"
            :model-value="notifications.length > 0"
          >
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-card min-width="320" class="rounded-lg">
        <v-card-title class="text-subtitle-1 font-weight-bold pa-4">
          Notifications
        </v-card-title>
        <v-divider />
        <v-list lines="two">
          <v-list-item
            v-for="note in notifications"
            :key="note.id"
            :value="note"
          >
            <v-list-item-title class="text-body-2">
              {{ note.text }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-caption mt-1">
              {{ note.time }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <!-- User Menu -->
    <v-menu location="bottom end">
      <template v-slot:activator="{ props }">
        <v-btn variant="text" v-bind="props" class="text-none">
          <v-avatar size="32" color="grey-lighten-2" class="mr-2">
            <v-icon>mdi-account</v-icon>
          </v-avatar>
          John Doe
          <v-icon right>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list width="200" class="rounded-lg">
        <v-list-item
          prepend-icon="mdi-cog"
          title="Account Settings"
          class="text-body-2"
        />
        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          class="text-red"
        />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
const notifications = [
  { id: 1, text: "New message from Sarah", time: "5m ago" },
  { id: 2, text: "Meeting in 30 minutes", time: "10m ago" },
  { id: 3, text: "Project deadline updated", time: "1h ago" },
];
</script>
