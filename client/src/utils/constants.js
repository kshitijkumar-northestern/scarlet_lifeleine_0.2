export const BLOOD_GROUPS = [
  "A_POSITIVE",
  "A_NEGATIVE",
  "B_POSITIVE",
  "B_NEGATIVE",
  "AB_POSITIVE",
  "AB_NEGATIVE",
  "O_POSITIVE",
  "O_NEGATIVE",
];

export const APPOINTMENT_STATUS = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  COMPLETED: "Completed",
};

export const API_ENDPOINTS = {
  // Admin endpoints
  ADMIN_LOGIN: "/admins/login",
  ADMIN_BLOODBANKS: "/admins/bloodbanks",
  ADMIN_APPOINTMENTS: "/admins/appointments",

  // Donor endpoints
  DONOR_LOGIN: "/donors/login",
  DONOR_REGISTER: "/donors/register",
  DONOR_APPOINTMENTS: "/donors/appointments",

  // Blood bank endpoints
  BLOODBANKS: "/bloodbanks",
  BLOODBANK_INVENTORY: "/bloodbanks/inventory",
};
