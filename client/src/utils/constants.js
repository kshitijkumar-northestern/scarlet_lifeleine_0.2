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
  ADMIN_REGISTER: "/admins/register",
  ADMIN_BLOODBANKS: "/admins/bloodbanks",
  ADMIN_APPOINTMENTS: "/admins/appointments",

  // Donor endpoints
  DONOR_LOGIN: "/donors/login",
  DONOR_REGISTER: "/donors/register",
  DONOR_APPOINTMENTS: "/appointments",

  // Blood bank endpoints
  BLOODBANKS: "/bloodbanks",

  // Appointment endpoints
  APPOINTMENTS: "/appointments",

  // Dynamic endpoints (for reference)
  // GET /bloodbanks/{id}
  // GET /bloodbanks/{id}/appointments
  // PUT /admins/bloodbanks/{id}/inventory
  // GET /donors/{id}/appointments
  // GET /appointments/{id}
};
