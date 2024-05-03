const BASEURL = process.env.NEXT_PUBLIC_BACKENDURL;

export const getStockData = async ({ page = 1, size = 5 }) => {
  const URL = `${BASEURL}/stock?page=${page}&size=${size}`;
  try {
    const res = await fetch(URL);
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
