export const apiRequest = async (url, method = "GET", body = null, token = null) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      const errorData = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();
      throw new Error(errorData.message || errorData || "API 요청 실패");
    }

    return contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

  } catch (error) {
    console.error("API 요청 오류:", error);
    throw error;
  }
};
