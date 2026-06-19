export const getLogoUrl = (domain) => {
  return `https://img.logo.dev/${domain}?token=${import.meta.env.VITE_LOGO_API_KEY}`;
};
