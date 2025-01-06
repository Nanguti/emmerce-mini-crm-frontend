<template>
  <Table
    :headers="leadHeaders"
    :items="leads"
    :createItem="createLead"
    :updateItem="updateLead"
    :deleteItem="deleteLead"
    :fetchItems="getLeads"
    @create="onCreateItem"
    @update="onUpdateItem"
    @delete="onDeleteItem"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} from "@/composables/useLeadsLoader";

import Table from "@/components/Table.vue";

const leads = ref([]);

// Define your headers for the table
const leadHeaders = [
  { title: "Name", key: "name", align: "start", type: "text" },
  { title: "Email", key: "email", align: "start", type: "text" },
  { title: "Phone", key: "phone", align: "start", type: "text" },
];

// Fetch leads on mount
onMounted(async () => {
  try {
    leads.value = await getLeads();
  } catch (error) {
    console.error("Error fetching leads:", error);
  }
});

const onCreateItem = async (newItem) => {
  const createdLead = await createLead(newItem);
  leads.value = [...leads.value, createdLead];
};

const onUpdateItem = async ({ index, item }) => {
  await updateLead(item.id, item);
  leads.value[index] = item;
  leads.value = [...leads.value];
};

const onDeleteItem = async (deletedItem) => {
  await deleteLead(deletedItem.id);
  leads.value = leads.value.filter((lead) => lead.id !== deletedItem.id);
};
</script>
