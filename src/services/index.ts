import axios from "axios";

export const APIUpdater = async <PayloadType>(
  url: string,
  data: PayloadType
) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const APIFetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const APIRemover = async (url: string) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const APIPartialUpdater = async <PayloadType>(
  url: string,
  data: PayloadType
) => {
  try {
    const response = await axios.patch(url, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
