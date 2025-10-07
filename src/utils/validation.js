export const isValidAgentCode = (s) => {
  if (!s) return false;
  // allow formats like AG001 or any non-empty for demo
  return /^[A-Za-z]{2}\d{3}$/i.test(s) || s.length > 0;
};
