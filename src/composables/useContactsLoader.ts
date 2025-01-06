import { defineBasicLoader } from "unplugin-vue-router/data-loaders/basic";
import axiosClient from "@/libs/axiosClient";
import { API_ENDPOINTS } from "@/libs/endpoints";
import type { Contact, ContactInput, ApiResponse } from "@/types/contacts";

// Get all contacts
export const getContacts = defineBasicLoader(
  API_ENDPOINTS.contacts,
  async (): Promise<Contact[]> => {
    const response = await axiosClient.get<Contact[]>(API_ENDPOINTS.contacts);
    return response.data; // Return the array of contacts
  }
);

// Create a new contact
export const createContact = async (
  contactData: ContactInput
): Promise<Contact> => {
  try {
    const response = await axiosClient.post<Contact>(
      API_ENDPOINTS.contacts,
      contactData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating contact:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update an existing contact
export const updateContact = async (
  contactId: number,
  contactData: Partial<ContactInput>
): Promise<Contact> => {
  try {
    const response = await axiosClient.put<Contact>(
      `${API_ENDPOINTS.contacts}${contactId}/`,
      contactData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating contact:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Delete a contact
export const deleteContact = async (contactId: number): Promise<boolean> => {
  try {
    await axiosClient.delete(`${API_ENDPOINTS.contacts}${contactId}/`);
    return true; // Return success
  } catch (error: any) {
    console.error(
      "Error deleting contact:",
      error.response?.data || error.message
    );
    throw error;
  }
};
