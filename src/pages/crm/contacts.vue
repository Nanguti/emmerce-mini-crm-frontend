<template>
  <div>
    <Alert
      v-if="alert.visible"
      :text="alert.text"
      :type="alert.type"
      :title="alert.title"
    />
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
  </div>
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
import Alert from "@/components/Alert.vue";

// Reactive state
const contacts = ref([]);
const alert = ref({
  visible: false,
  text: "",
  title: "",
  type: "",
});

// Table headers for contacts
const contactsHeaders = [
  { title: "Name", key: "name", align: "start", type: "text" },
  { title: "Email", key: "email", align: "start", type: "text" },
  { title: "Phone", key: "phone", align: "start", type: "text" },
];

// Fetch contacts on component mount
onMounted(async () => {
  try {
    contacts.value = await getContacts();
  } catch (error) {
    showAlert("Error", "Failed to fetch contacts.", "error");
    console.error("Error fetching contacts:", error);
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
  try {
    const contact = await createContact(newItem);
    contacts.value = [...contacts.value, contact];
    showAlert("Success", "Contact created successfully!", "success");
  } catch (error) {
    showAlert("Error", "Failed to create contact.", "error");
    console.error("Error creating contact:", error);
  }
};

// Handle item update
const onUpdateItem = async ({ index, item }) => {
  try {
    await updateContact(item.id, item);
    contacts.value[index] = item;
    contacts.value = [...contacts.value];
    showAlert("Success", "Contact updated successfully!", "success");
  } catch (error) {
    showAlert("Error", "Failed to update contact.", "error");
    console.error("Error updating contact:", error);
  }
};

// Handle item deletion
const onDeleteItem = async (deletedItem) => {
  try {
    await deleteContact(deletedItem.id);
    contacts.value = contacts.value.filter(
      (contact) => contact.id !== deletedItem.id
    );
    showAlert("Success", "Contact deleted successfully!", "success");
  } catch (error) {
    showAlert("Error", "Failed to delete contact.", "error");
    console.error("Error deleting contact:", error);
  }
};
</script>
