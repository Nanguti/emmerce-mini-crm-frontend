export interface Reminder {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export type ReminderInput = Omit<Reminder, "id" | "created_at" | "updated_at">;

// Generic API response
export interface ApiResponse<T> {
  data: T;
  message?: string;
}
