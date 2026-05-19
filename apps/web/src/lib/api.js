const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";
async function request(path) {
    const response = await fetch(`${API_BASE_URL}${path}`);
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
}
export const api = {
    getOverview: () => request("/api/overview"),
    getWorkflows: () => request("/api/workflows"),
    getAgents: () => request("/api/agents"),
    getAlerts: () => request("/api/alerts"),
    getMeta: () => request("/api/meta")
};
