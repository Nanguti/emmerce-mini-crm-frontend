<template>
  <Table
    :headers="contactsHeaders"
    :items="contacts"
    :createItem="createContact"
    :updateItem="updateContact"
    :deleteItem="deleteContact"
    :fetchItems="getContacts"
    @create="onCreateItem"
    @update="onUpdateItem"
    @delete="onDeleteItem"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "@/composables/useContactsLoader";

import Table from "@/components/Table.vue";
const contacts = ref([]);

const contactsHeaders = [
  { title: "Name", key: "name", align: "start", type: "text" },
  { title: "Email", key: "email", align: "start", type: "text" },
  { title: "Phone", key: "phone", align: "start", type: "text" },
];

onMounted(async () => {
  try {
    contacts.value = await getContacts();
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
});
const onCreateItem = async (newItem) => {
  const contact = await createContact(newItem);
  contacts.value = [...contacts.value, contact];
};

const onUpdateItem = async ({ index, item }) => {
  await updateContact(item.id, item);
  contacts.value[index] = item;
  contacts.value = [...contacts.value];
};

const onDeleteItem = async (deletedItem) => {
  await deleteContact(deletedItem.id);
  contacts.value = contacts.value.filter(
    (contact) => contact.id !== deletedItem.id
  );
};
</script>
