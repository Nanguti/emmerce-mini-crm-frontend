<template>
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
const notes = ref([]);
const leads = ref([]);

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
    console.error("Error fetching notes:", error);
  }
});

const onCreateItem = async (newItem) => {
  const apiRequestData = {
    lead: newItem.lead_name,
    content: newItem.content,
  };
  const createdNote = await createNote(apiRequestData);
  notes.value = [...notes.value, createdNote];
};

const onUpdateItem = async ({ index, item }) => {
  const apiRequestData = {
    lead_id: item.lead_name,
    content: item.content,
  };

  try {
    const response = await updateNote(Number(item.id), apiRequestData);
    notes.value[index] = response;
    notes.value = [...notes.value];
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

const onDeleteItem = async (deletedItem) => {
  await deleteNote(deletedItem.id);
  notes.value = notes.value.filter((note) => note.id !== deletedItem.id);
};
</script>
