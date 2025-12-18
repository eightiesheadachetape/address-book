export function validateRequired(value) {
  return value.trim().length > 0;
}

export function requiredMessage(fieldLabelLower) {
  return `The ${fieldLabelLower} is required`;
}
