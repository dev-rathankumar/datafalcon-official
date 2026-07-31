const API_BASE = import.meta.env.VITE_API_URL || "";

function getCsrfToken() {
  const match = document.cookie.match(/(?:^|;\s*)csrftoken=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

function buildHeaders(extra = {}) {
  const headers = { ...extra };
  const csrf = getCsrfToken();
  if (csrf) headers["X-CSRFToken"] = csrf;
  return headers;
}

export async function fetchTeamMembers() {
  const res = await fetch(`${API_BASE}/api/v1/team/`, {
    credentials: "same-origin",
  });
  if (!res.ok) throw new Error("Failed to load team members");
  const data = await res.json();
  return data.results;
}

export async function submitContactInquiry(payload) {
  const res = await fetch(`${API_BASE}/api/v1/contact/`, {
    method: "POST",
    headers: buildHeaders({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(payload),
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    if (!res.ok) throw new Error(res.status === 403 ? "Request blocked. Please refresh and try again." : "Failed to send inquiry");
  }

  if (!res.ok) {
    const message = data.errors
      ? Object.values(data.errors).flat().join(" ")
      : data.detail || data.message || "Failed to send inquiry";
    throw new Error(message);
  }
  return data;
}
