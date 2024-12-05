// src/utils/helpers.js
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusColor = (status) => {
  switch (status) {
    case "ACCEPTED":
      return "success";
    case "REJECTED":
      return "error";
    case "COMPLETED":
      return "primary";
    default:
      return "warning";
  }
};

export const formatBloodGroup = (bloodGroup) => {
  return bloodGroup.replace("_", " ");
};
