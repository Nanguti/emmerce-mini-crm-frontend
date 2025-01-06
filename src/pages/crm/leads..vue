<template>
  <div>
    <Alert
      v-if="alert.visible"
      :text="alert.text"
      :type="alert.type"
      :title="alert.title"
    />
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
  </div>
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
import Alert from "@/components/Alert.vue";

const leads = ref([]);

// Alert state
const alert = ref({
  visible: false,
  text: "",
  title: "",
  type: "",
});

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
    showAlert("Error fetching leads", error.message, "error");
    console.error("Error fetching leads:", error);
  }
});

const showAlert = (title, text, type) => {
  alert.value = { visible: true, title, text, type };
  setTimeout(() => {
    alert.value.visible = false;
  }, 3000); // Hide alert after 3 seconds
};

const onCreateItem = async (newItem) => {
  try {
    const createdLead = await createLead(newItem);
    leads.value = [...leads.value, createdLead];
    showAlert("Success", "Lead created successfully!", "success");
  } catch (error) {
    showAlert("Error", "Failed to create lead", "error");
  }
};

const onUpdateItem = async ({ index, item }) => {
  try {
    await updateLead(item.id, item);
    leads.value[index] = item;
    leads.value = [...leads.value];
    showAlert("Success", "Lead updated successfully!", "success");
  } catch (error) {
    showAlert("Error", "Failed to update lead", "error");
  }
};

const onDeleteItem = async (deletedItem) => {
  try {
    await deleteLead(deletedItem.id);
    leads.value = leads.value.filter((lead) => lead.id !== deletedItem.id);
    showAlert("Success", "Lead deleted successfully!", "success");
  } catch (error) {
    showAlert("Error", "Failed to delete lead", "error");
  }
};
</script>
