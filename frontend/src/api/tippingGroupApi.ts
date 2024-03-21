import axios from "axios";
import { getAPI } from ".";
import { TippingGroup } from "../types/TippingGroup";

export const getGroupsApi = async () => {
  try {
    const api = getAPI();
    const response = await api.get("/api/groups");
    return response.data as TippingGroup[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw error;
    }
  }
};

export const createGroupApi = async (name: string, league: string) => {
  try {
    const api = getAPI();
    const response = await api.post("/api/groups", {
      name,
      league,
    });
    return response.data as TippingGroup;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw error;
    }
  }
};

export const deleteGroupApi = async (groupId: string) => {
  try {
    const api = getAPI();
    const response = await api.delete(`/api/groups/${groupId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw error;
    }
  }
};

export const getGroupApi = async (groupId: string) => {
  try {
    const api = getAPI();
    const response = await api.get(`/api/groups/${groupId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw error;
    }
  }
};

export const addMemberToGroupApi = async (groupId: string, userId: string) => {
  try {
    const api = getAPI();
    const response = await api.post(`/api/groups/${groupId}/members`, {
      userId,
    });
    return response.data as TippingGroup;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw error;
    }
  }
};

export const removeMemberFromGroupApi = async (
  groupId: string,
  userId: string
) => {
  try {
    const api = getAPI();
    const response = await api.delete(
      `/api/groups/${groupId}/members/${userId}`
    );
    return response.data as TippingGroup;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw error;
    }
  }
};
