<template>
  <div>
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

// Reactive state
const reminders = ref([]);
const leads = ref([]);
const contacts = ref([]);

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
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// Handlers for creating, updating, and deleting reminders
const onCreateItem = async (newItem) => {
  const apiRequestData = {
    lead: newItem.lead_name,
    contact: newItem.contact_name,
    message: newItem.message,
    remind_at: newItem.remind_at ? new Date(newItem.remind_at) : null,
  };

  const response = await createReminder(apiRequestData);
  reminders.value = [...reminders.value, response];
};

const onUpdateItem = async ({ index, item }) => {
  const apiRequestData = {
    lead_id: item.lead_name,
    contact_id: item.contact_name,
    message: item.message,
    remind_at: item.remind_at ? new Date(item.remind_at) : null,
  };
  const response = await updateReminder(item.id, apiRequestData);
  reminders.value[index] = response;
  reminders.value = [...reminders.value];
};

const onDeleteItem = async (deletedItem) => {
  await deleteReminder(deletedItem.id);
  reminders.value = reminders.value.filter(
    (reminder) => reminder.id !== deletedItem.id
  );
};
</script>
