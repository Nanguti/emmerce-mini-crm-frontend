// composables/useNotification.js
import { ref } from "vue";

const notifications = ref([]);

export function useNotification() {
  const showNotification = ({ type, message }) => {
    // You can integrate this with your preferred notification library
    // For example: Vue Toastification, Vue Notification, etc.
    // This is just a basic example
    alert(`${type}: ${message}`);
  };

  return {
    notifications,
    showNotification,
  };
}
