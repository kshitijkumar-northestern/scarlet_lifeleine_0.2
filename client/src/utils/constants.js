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
  ADMIN_LOGIN: "api/admins/login",
  ADMIN_BLOODBANKS: "api/admins/bloodbanks",
  ADMIN_APPOINTMENTS: "api/admins/appointments",

  // Donor endpoints
  DONOR_LOGIN: "api/donors/login",
  DONOR_REGISTER: "api/donors/register",
  DONOR_APPOINTMENTS: "api/donors/appointments",

  // Blood bank endpoints
  BLOODBANKS: "api/bloodbanks",
  BLOODBANK_INVENTORY: "api/bloodbanks/inventory",
};
