const API_BASE = import.meta.env.VITE_API_URL || "";

export async function fetchTeamMembers() {
  const res = await fetch(`${API_BASE}/api/v1/team/`);
  if (!res.ok) throw new Error("Failed to load team members");
  const data = await res.json();
  return data.results;
}

export async function submitContactInquiry(payload) {
  const res = await fetch(`${API_BASE}/api/v1/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const message = data.errors
      ? Object.values(data.errors).flat().join(" ")
      : data.message || "Failed to send inquiry";
    throw new Error(message);
  }
  return data;
}
