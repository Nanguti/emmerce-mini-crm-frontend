import { defineBasicLoader } from "unplugin-vue-router/data-loaders/basic";
import axiosClient from "@/libs/axiosClient";
import { API_ENDPOINTS } from "@/libs/endpoints";
import type { Note, NoteInput, ApiResponse } from "@/types/notes";

// Get all notes
export const getNotes = defineBasicLoader(
  API_ENDPOINTS.notes,
  async (): Promise<Note[]> => {
    const response = await axiosClient.get<Note[]>(API_ENDPOINTS.notes);
    return response.data;
  }
);

// Create a new note
export const createNote = async (noteData: NoteInput): Promise<Note> => {
  try {
    const response = await axiosClient.post<Note>(
      API_ENDPOINTS.notes,
      noteData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating note:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update an existing note
export const updateNote = async (
  noteId: number,
  noteData: Partial<NoteInput>
): Promise<Note> => {
  try {
    const response = await axiosClient.put<Note>(
      `${API_ENDPOINTS.notes}${noteId}/`,
      noteData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating note:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Delete a note
export const deleteNote = async (noteId: number): Promise<boolean> => {
  try {
    await axiosClient.delete(`${API_ENDPOINTS.notes}${noteId}/`);
    return true; // Return success
  } catch (error: any) {
    console.error(
      "Error deleting note:",
      error.response?.data || error.message
    );
    throw error;
  }
};
