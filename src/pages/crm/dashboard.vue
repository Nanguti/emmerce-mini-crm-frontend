<template>
  <v-container>
    <h1>Welcome to the Admin Dashboard</h1>
    <v-row>
      <v-col cols="12" md="6" lg="3">
        <v-card outlined>
          <v-card-title>Total Leads</v-card-title>
          <v-card-text>120</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <v-card outlined>
          <v-card-title>Active Contacts</v-card-title>
          <v-card-text>45</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <v-card outlined>
          <v-card-title>Pending Reminders</v-card-title>
          <v-card-text>8</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <v-card outlined>
          <v-card-title>Notes Created</v-card-title>
          <v-card-text>52</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
</script>
