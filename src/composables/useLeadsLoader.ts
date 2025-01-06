import { defineBasicLoader } from "unplugin-vue-router/data-loaders/basic";
import axiosClient from "@/libs/axiosClient";
import { API_ENDPOINTS } from "@/libs/endpoints";
import type { Lead, LeadInput, ApiResponse } from "@/types/leads";

export const getLeads = defineBasicLoader(
  API_ENDPOINTS.leads,
  async (): Promise<Lead[]> => {
    const response = await axiosClient.get<Lead[]>(API_ENDPOINTS.leads);
    return response.data;
  }
);

// Create a new lead
export const createLead = async (leadData: LeadInput): Promise<Lead> => {
  try {
    const response = await axiosClient.post<Lead>(
      API_ENDPOINTS.leads,
      leadData
    );
    console.log("Lead data -> ", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating lead:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update an existing lead
export const updateLead = async (
  leadId: number,
  leadData: Partial<LeadInput>
): Promise<Lead> => {
  try {
    const response = await axiosClient.put<Lead>(
      `${API_ENDPOINTS.leads}${leadId}/`,
      leadData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating lead:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Delete a lead
export const deleteLead = async (leadId: number): Promise<boolean> => {
  try {
    await axiosClient.delete(`${API_ENDPOINTS.leads}${leadId}/`);
    return true; // Return success
  } catch (error: any) {
    console.error(
      "Error deleting lead:",
      error.response?.data || error.message
    );
    throw error;
  }
};
