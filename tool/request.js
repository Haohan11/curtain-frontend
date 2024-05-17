import { toFormData } from "./lib";

const BASEURL = process.env.NEXT_PUBLIC_BACKENDURL;

export const getStockData = async (
  token,
  { page = 1, size = 5, resolvedUrl }
) => {
  const URL = `${BASEURL}/stock?page=${page}&size=${size}&onlyEnable=&${resolvedUrl.replace(
    "/?",
    ""
  )}`;
  try {
    const res = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
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

export const createCombination = async (token, values) => {
  const URL = `${BASEURL}/combination`;

  const formData = toFormData(values);

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const updateCombination = async (token, values) => {
  const URL = `${BASEURL}/combination`;

  const formData = toFormData(values);

  try {
    const res = await fetch(URL, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) return false;
    const result = await res.json();
    return result.status;
  } catch (error) {
    console.log("Update combination error:", error);
    return false;
  }
};

export const getCombinations = async (token, { page, size }) => {
  const URL = `${BASEURL}/combination?page=${page}&size=${size}`;

  try {
    const res = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return false;
    const {
      data: { total, totalPages, list },
    } = await res.json();
    return { total, totalPages, list };
  } catch (error) {
    console.log("Failed to get combination:", error);
    return false;
  }
};

export const deleteCombination = async (token, values) => {
  const URL = `${BASEURL}/combination`;

  const formData = new FormData();
  formData.append("id", values.id);

  try {
    const res = await fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) return false;
    const { status } = await res.json();
    return status;
  } catch (error) {
    console.log("Failed to get combination:", error);
    return false;
  }
};

export const getColorSchemeData = async (token) => {
  const URL = `${BASEURL}/color-scheme?onlyEnable=`;
  try {
    const res = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const getDesignData = async (token) => {
  const URL = `${BASEURL}/design?onlyEnable=`;
  try {
    const res = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const getMaterialData = async (token) => {
  const URL = `${BASEURL}/material?onlyEnable=`;
  try {
    const res = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const getAccountData = async (token) => {
  const URL = `${BASEURL}/account`;
  try {
    const res = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return false;

    const { data } = await res.json();
    return data
  } catch (error) {
    console.log(error);
    return false;
  }
};
