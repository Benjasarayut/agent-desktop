const API_BASE_URL = process.env.REACT_APP_API_URL || '';

// simple dev-friendly login that falls back to mock if backend is absent
export const loginAgent = async (agentCode) => {
  if (!API_BASE_URL) {
    // fallback (dev only): accept anything like AG001
    return Promise.resolve({
      agentCode,
      name: `Agent ${agentCode}`,
    });
  }

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentCode }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
};

export const getAgentInfo = async (agentCode) => {
  if (!API_BASE_URL) return { agentCode, name: `Agent ${agentCode}` };
  const res = await fetch(`${API_BASE_URL}/agents/${agentCode}`);
  return res.json();
};
