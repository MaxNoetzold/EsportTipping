import axios from "axios";
import { getAPI } from ".";
import { GroupTips, TippingGroup } from "../types/TippingGroup";

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

export const createGroupApi = async (name: string) => {
  try {
    const api = getAPI();
    const response = await api.post("/api/groups", {
      name,
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

export const updateGroupApi = async (groupId: string, name: string) => {
  try {
    const api = getAPI();
    const response = await api.put(`/api/groups/${groupId}`, { name });
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

export const getGroupInfoApi = async (groupId: string) => {
  try {
    const api = getAPI();
    const response = await api.get(`/api/groups/${groupId}`);
    return response.data as TippingGroup;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw error;
    }
  }
};

export const getGroupTipsApi = async (
  groupId: string,
  { league, tournament }: { league?: string; tournament?: string }
) => {
  try {
    if (!league || !tournament) {
      throw new Error("League or tournament are required");
    }
    const query: { league?: string; tournament?: string } = {};
    if (league) {
      query.league = league;
    }
    if (tournament) {
      query.tournament = tournament;
    }

    const api = getAPI();
    const response = await api.get(`/api/groups/${groupId}/tips`, {
      params: query,
    });
    return response.data as GroupTips;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw error;
    }
  }
};

export const addMemberToGroupApi = async (
  groupId: string,
  username: string
) => {
  try {
    const api = getAPI();
    const response = await api.post(`/api/groups/${groupId}/members`, {
      username,
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
