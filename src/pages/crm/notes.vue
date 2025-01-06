<template>
  <div>
    <Alert
      v-if="alert.visible"
      :text="alert.text"
      :type="alert.type"
      :title="alert.title"
    />

    <Table
      :headers="notesHeaders"
      :items="notes"
      :createItem="createNote"
      :updateItem="updateNote"
      :deleteItem="deleteNote"
      :fetchItems="getNotes"
      @create="onCreateItem"
      @update="onUpdateItem"
      @delete="onDeleteItem"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "@/composables/useNotesLoader";
import { getLeads } from "@/composables/useLeadsLoader";

import Table from "@/components/Table.vue";
import Alert from "@/components/Alert.vue";

// Reactive data
const notes = ref([]);
const leads = ref([]);
const alert = ref({
  visible: false,
  text: "",
  title: "",
  type: "",
});

// Headers for notes table
const notesHeaders = ref([
  {
    title: "Lead Name",
    key: "lead_name",
    type: "select",
    options: [],
    itemText: "label",
    itemValue: "value",
  },
  { title: "Content", key: "content", align: "start", type: "text" },
]);

// Fetch data on mount
onMounted(async () => {
  try {
    const [notesData, leadsData] = await Promise.all([getNotes(), getLeads()]);

    notes.value = notesData;

    leads.value = leadsData.map((lead) => ({
      value: lead.id,
      label: lead.name,
    }));

    notesHeaders.value[0].options = leads.value; // Dynamically set options
  } catch (error) {
    showAlert("Error", "Failed to fetch notes or leads.", "error");
    console.error("Error fetching notes:", error);
  }
});

// Alert helper function
const showAlert = (title, text, type) => {
  alert.value = { visible: true, title, text, type };
  setTimeout(() => {
    alert.value.visible = false;
  }, 3000); // Auto-hide after 3 seconds
};

// Handle item creation
const onCreateItem = async (newItem) => {
  const apiRequestData = {
    lead: newItem.lead_name,
    content: newItem.content,
  };

  try {
    const createdNote = await createNote(apiRequestData);
    notes.value = [...notes.value, createdNote];
    showAlert("Success", "Note created successfully!", "success");
  } catch (error) {
    showAlert("Error", "Failed to create note.", "error");
    console.error("Error creating note:", error);
  }
};

// Handle item update
const onUpdateItem = async ({ index, item }) => {
  const apiRequestData = {
    lead_id: item.lead_name,
    content: item.content,
  };

  try {
    const response = await updateNote(Number(item.id), apiRequestData);
    notes.value[index] = response;
    notes.value = [...notes.value];
    showAlert("Success", "Note updated successfully!", "success");
  } catch (error) {
    showAlert("Error", "Failed to update note.", "error");
    console.error("Error updating note:", error);
  }
};

// Handle item deletion
const onDeleteItem = async (deletedItem) => {
  try {
    await deleteNote(deletedItem.id);
    notes.value = notes.value.filter((note) => note.id !== deletedItem.id);
    showAlert("Success", "Note deleted successfully!", "success");
  } catch (error) {
    showAlert("Error", "Failed to delete note.", "error");
    console.error("Error deleting note:", error);
  }
};
</script>
