<template>
  <v-container>
    <v-data-table-server
      :items-per-page.sync="itemsPerPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      item-value="name"
      @update:options="loadItems"
    >
      <!-- Top Toolbar -->
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <!-- Add New Item Button & Dialog -->
          <v-dialog v-model="dialog" max-width="500px">
            <template #activator="{ props }">
              <v-btn color="primary" dark v-bind="props" class="mb-2">
                New Item
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      v-for="header in editableHeaders"
                      :key="header.key"
                    >
                      <!-- Dynamically Render Inputs -->
                      <template v-if="header.type === 'text'">
                        <v-text-field
                          v-model="editedItem[header.key]"
                          :label="header.title"
                        ></v-text-field>
                      </template>
                      <template v-if="header.type === 'select'">
                        <v-select
                          v-model="editedItem[header.key]"
                          :label="header.title"
                          :items="header.options"
                          :item-title="header.itemText"
                          :item-value="header.itemValue"
                        ></v-select>
                      </template>
                      <template v-if="header.type === 'date'">
                        <v-date-picker
                          v-model="editedItem[header.key]"
                          :label="header.title"
                          :value="
                            editedItem[header.key] instanceof Date
                              ? editedItem[header.key]
                              : new Date()
                          "
                        ></v-date-picker>
                      </template>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Delete Confirmation Dialog -->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">
                Are you sure you want to delete this item?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="closeDelete"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="deleteItemConfirm"
                >
                  OK
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <!-- Actions Column -->
      <template v-slot:item="{ item }">
        <tr>
          <!-- Render table data for each column -->
          <td v-for="header in editableHeaders" :key="header.key">
            {{ item[header.key] }}
          </td>

          <!-- Actions column with edit and delete icons -->
          <td>
            <v-icon size="small" class="me-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table-server>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Data Table",
  },
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

// Add emit for CRUD operations
const emit = defineEmits(["create", "update", "delete"]);

// Table state
const itemsPerPage = ref(5);
const search = ref("");
const loading = ref(false);
const totalItems = ref(0);
const serverItems = ref([]);

// Dialog state
const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const editedItem = ref({});

// Get headers without the actions column
const editableHeaders = computed(() =>
  props.headers.filter((header) => header.key !== "actions")
);

// Default structure for new item
const defaultItem = computed(() => {
  const item = {};
  editableHeaders.value.forEach((header) => {
    item[header.key] = header.type === "date" ? new Date() : ""; // Default date type fields to now
  });
  return item;
});

// Computed for dialog title
const formTitle = computed(() => {
  return editedIndex.value === -1 ? "New Item" : "Edit Item";
});

// Watch for props changes
watch(
  () => props.items,
  (newItems) => {
    serverItems.value = newItems;
    totalItems.value = newItems.length;
  },
  { immediate: true }
);

// CRUD Operations
const editItem = (item) => {
  editedIndex.value = serverItems.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
};

const deleteItem = (item) => {
  editedIndex.value = serverItems.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
};

const deleteItemConfirm = () => {
  emit("delete", editedItem.value);
  closeDelete();
};

const close = () => {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
};

const closeDelete = () => {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
};

const save = () => {
  if (editedIndex.value > -1) {
    emit("update", { index: editedIndex.value, item: editedItem.value });
  } else {
    emit("create", editedItem.value);
  }
  close();
};

// Server-side operations
const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  serverItems.value = props.items.slice(start, end);
  totalItems.value = props.items.length;

  loading.value = false;
};
</script>
