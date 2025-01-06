export interface Note {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export type NoteInput = Omit<Note, "id" | "created_at" | "updated_at">;

// Generic API response
export interface ApiResponse<T> {
  data: T;
  message?: string;
}
