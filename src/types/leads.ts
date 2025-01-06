export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export type LeadInput = Omit<Lead, "id" | "created_at" | "updated_at">;

// Generic API response
export interface ApiResponse<T> {
  data: T;
  message?: string;
}
