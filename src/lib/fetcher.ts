export interface FetcherError {
  error: string;
  statusCode?: number;
  details?: unknown;
}

export function isError(response: unknown): response is FetcherError {
  return (
    typeof response === "object" && response !== null && "error" in response
  );
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  // Try cookie first, then localStorage
  const match = document.cookie.match(/(^|;)\s*accessToken\s*=\s*([^;]+)/);
  if (match) {
    return decodeURIComponent(match[2]);
  }
  return localStorage.getItem("accessToken");
}

export function setAuthSession(token: string, user: unknown) {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    document.cookie = `accessToken=${encodeURIComponent(token)}; path=/; max-age=604800; SameSite=Lax`;
  }
}

export function clearAuthSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    document.cookie = `accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

export function getStoredUser<T = unknown>(): T | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function fetcher<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  let token: string | null = null;

  if (typeof window !== "undefined") {
    token = getAccessToken();
  } else {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      token = cookieStore.get("accessToken")?.value || null;
    } catch {
      token = null;
    }
  }

  const isFormData = options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const responseText = await res.text();
  let parsedData: any = null;

  if (responseText) {
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      parsedData = { message: responseText };
    }
  }

  if (!res.ok) {
    const errorMessage =
      parsedData?.message ||
      parsedData?.error ||
      `Request failed with status ${res.status}`;
    const errorObj: FetcherError = {
      error: errorMessage,
      statusCode: res.status,
      details: parsedData,
    };
    throw errorObj;
  }

  return (parsedData?.data !== undefined ? parsedData.data : parsedData) as T;
}
