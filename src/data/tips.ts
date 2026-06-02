export const tips = [
  "Never share your password with anyone — not even friends or family.",
  "Always check the sender's email address before clicking links in emails.",
  "Enable two-factor authentication on all your important accounts.",
  "Use a different, unique password for every online account.",
  "Check for HTTPS in the URL before entering any personal information.",
  "Be suspicious of messages that create urgency or panic.",
  "Regularly update your software and apps to patch vulnerabilities.",
  "Never use unsecured public Wi-Fi for banking or shopping.",
  "If something online seems too good to be true, it probably is a scam.",
  "Review your social media privacy settings regularly.",
  "Use a password manager to create and store complex passwords safely.",
  "Always log out of accounts on shared or public computers.",
  "Keep your address, phone number, and bank details private online.",
  "Report cyberbullying to the platform and a trusted adult.",
  "Back up your important data regularly to protect against ransomware.",
];

export function getTodaysTip(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return tips[dayOfYear % tips.length];
}
