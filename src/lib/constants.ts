// Mirrors app/core/constants.py — keep in sync with the backend.

export const PARTNER_ROLES = ["lead", "first", "second"] as const;
export type PartnerRole = (typeof PARTNER_ROLES)[number];

export const ROLE_PREFIXES: Record<PartnerRole, string> = {
  lead: "LEAD",
  first: "FIRST",
  second: "SECOND",
};

export const PERCENTAGE_KEYS: Record<PartnerRole, string> = {
  lead: "L_PER",
  first: "F_PER",
  second: "S_PER",
};

export const ATTACHMENT_CATEGORIES = [
  "experience",
  "registration",
  "audits",
  "bank_guarantee",
  "line_of_credit",
] as const;
export type AttachmentCategory = (typeof ATTACHMENT_CATEGORIES)[number];

/** Partner profile columns ↔ role-prefixed bid field suffixes (e.g. partner_name ↔ LEAD_PARTNER_NAME). */
export const PROFILE_FIELD_MAP = [
  ["partner_name", "PARTNER_NAME"],
  ["partner_short", "PARTNER_SHORT"],
  ["address", "ADDRESS"],
  ["partner_ceo", "PARTNER_CEO"],
  ["partner_md1", "PARTNER_MD1"],
  ["partner_md2", "PARTNER_MD2"],
] as const;
export type ProfileFieldKey = (typeof PROFILE_FIELD_MAP)[number][0];

export function roleImageKeys(role: PartnerRole) {
  const p = ROLE_PREFIXES[role];
  return {
    ceoSig: `${p}_CEO_SIG`,
    stamp: `${p}_STAMP`,
    md1: `${p}_PARTNER_MD1`,
    md2: `${p}_PARTNER_MD2`,
  };
}

export function roleFieldKey(role: PartnerRole, field: string) {
  return `${ROLE_PREFIXES[role]}_${field}`;
}
