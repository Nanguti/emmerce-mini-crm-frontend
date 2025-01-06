import { defineBasicLoader } from "unplugin-vue-router/data-loaders/basic";
import axiosClient from "@/libs/axiosClient";
import { API_ENDPOINTS } from "@/libs/endpoints";
import type { Reminder, ReminderInput, ApiResponse } from "@/types/reminders";

// Get all reminders
export const getReminders = defineBasicLoader(
  API_ENDPOINTS.reminders,
  async (): Promise<Reminder[]> => {
    const response = await axiosClient.get<Reminder[]>(API_ENDPOINTS.reminders);
    return response.data;
  }
);

// Create a new reminder
export const createReminder = async (
  reminderData: ReminderInput
): Promise<Reminder> => {
  try {
    const response = await axiosClient.post<Reminder>(
      API_ENDPOINTS.reminders,
      reminderData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating reminder:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update an existing reminder
export const updateReminder = async (
  reminderId: number,
  reminderData: Partial<ReminderInput>
): Promise<Reminder> => {
  try {
    const response = await axiosClient.put<Reminder>(
      `${API_ENDPOINTS.reminders}${reminderId}/`,
      reminderData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating reminder:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Delete a reminder
export const deleteReminder = async (reminderId: number): Promise<boolean> => {
  try {
    await axiosClient.delete(`${API_ENDPOINTS.reminders}${reminderId}/`);
    return true; // Return success
  } catch (error: any) {
    console.error(
      "Error deleting reminder:",
      error.response?.data || error.message
    );
    throw error;
  }
};
