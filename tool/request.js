import { toFormData } from "./lib";

const BASEURL = process.env.NEXT_PUBLIC_BACKENDURL;

const mockAuthor = {
  user_id: 1,
  create_name: "han",
  create_id: "admin",
  modify_name: "han",
  modify_id: "admin",
};

export const getStockData = async ({ token, page = 1, size = 5 }) => {
  const URL = `${BASEURL}/stock?page=${page}&size=${size}&onlyEnable=`;
  try {
    const res = await fetch(URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    if (!res.ok) return false;

    const {
      data: { total, totalPages, list },
    } = await res.json();
    return { total, totalPages, data: list };
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getEnvironmentData = async (token) => {
  const URL = `${BASEURL}/environment?onlyEnable=`;
  try {
    const res = await fetch(URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    if (!res.ok) return false;

    const {
      data: { list },
    } = await res.json();
    return list;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createCombination = async (values) => {
  const URL = `${BASEURL}/combination`;

  Object.assign(values, mockAuthor);
  const formData = toFormData(values);

  try {
    const res = await fetch(URL, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) return false;
    const result = await res.json();
    return result.status;
  } catch (error) {
    console.log("Create combination error:", error);
    return false;
  }
};
