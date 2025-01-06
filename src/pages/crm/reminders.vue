<template>
  <div>
    <Alert
      v-if="alert.visible"
      :text="alert.text"
      :type="alert.type"
      :title="alert.title"
    />

    <Table
      :headers="remindersHeaders"
      :items="reminders"
      :createItem="createReminder"
      :updateItem="updateReminder"
      :deleteItem="deleteReminder"
      :fetchItems="getReminders"
      @create="onCreateItem"
      @update="onUpdateItem"
      @delete="onDeleteItem"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder,
} from "@/composables/useRemindersLoader";
import { getLeads } from "@/composables/useLeadsLoader";
import { getContacts } from "@/composables/useContactsLoader";
import Table from "@/components/Table.vue";
import Alert from "@/components/Alert.vue";

// Reactive state
const reminders = ref([]);
const leads = ref([]);
const contacts = ref([]);
const alert = ref({
  visible: false,
  text: "",
  title: "",
  type: "",
});

// Table headers with dynamic select options for leads and contacts
const remindersHeaders = ref([
  {
    title: "Lead Name",
    key: "lead_name",
    type: "select",
    options: leads,
    itemText: "label",
    itemValue: "value",
  },
  {
    title: "Contact Name",
    key: "contact_name",
    type: "select",
    options: contacts,
    itemText: "label",
    itemValue: "value",
  },
  { title: "Message", key: "message", type: "text" },
  { title: "Remind At", key: "remind_at", type: "date" },
]);

// Fetch data on component mount
onMounted(async () => {
  try {
    const [reminderData, leadData, contactData] = await Promise.all([
      getReminders(),
      getLeads(),
      getContacts(),
    ]);

    reminders.value = reminderData.map((reminder) => ({
      ...reminder,
      remind_at: reminder.remind_at ? new Date(reminder.remind_at) : new Date(),
    }));

    leads.value = leadData.map((lead) => ({
      value: lead.id,
      label: lead.name,
    }));

    contacts.value = contactData.map((contact) => ({
      value: contact.id,
      label: contact.name,
    }));

    showAlert("Success", "Data loaded successfully!", "success");
  } catch (error) {
    showAlert("Error", "Failed to fetch data.", "error");
    console.error("Error fetching data:", error);
  }
});

// Alert helper function
const showAlert = (title, text, type) => {
  alert.value = { visible: true, title, text, type };
  setTimeout(() => {
    alert.value.visible = false;
  }, 3000); // Auto-hide after 3 seconds
};

// Handlers for creating, updating, and deleting reminders
const onCreateItem = async (newItem) => {
  const apiRequestData = {
    lead: newItem.lead_name,
    contact: newItem.contact_name,
    message: newItem.message,
    remind_at: newItem.remind_at ? new Date(newItem.remind_at) : null,
  };

  try {
    const response = await createReminder(apiRequestData);
    reminders.value = [...reminders.value, response];
    showAlert("Success", "Reminder created successfully!", "success");
  } catch (error) {
    showAlert("Error", "Failed to create reminder.", "error");
    console.error("Error creating reminder:", error);
  }
};

const onUpdateItem = async ({ index, item }) => {
  const apiRequestData = {
    lead_id: item.lead_name,
    contact_id: item.contact_name,
    message: item.message,
    remind_at: item.remind_at ? new Date(item.remind_at) : null,
  };

  try {
    const response = await updateReminder(item.id, apiRequestData);
    reminders.value[index] = response;
    reminders.value = [...reminders.value];
    showAlert("Success", "Reminder updated successfully!", "success");
  } catch (error) {
    showAlert("Error", "Failed to update reminder.", "error");
    console.error("Error updating reminder:", error);
  }
};

const onDeleteItem = async (deletedItem) => {
  try {
    await deleteReminder(deletedItem.id);
    reminders.value = reminders.value.filter(
      (reminder) => reminder.id !== deletedItem.id
    );
    showAlert("Success", "Reminder deleted successfully!", "success");
  } catch (error) {
    showAlert("Error", "Failed to delete reminder.", "error");
    console.error("Error deleting reminder:", error);
  }
};
</script>
