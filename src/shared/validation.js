export const checkValidity = (value, { required, minLength, maxLength }) => {
  let isValid = true
  if (required)
    isValid = value.trim() !== '' && isValid
  if (minLength)
    isValid = value.length >= minLength && isValid
  if (maxLength)
    isValid = value.length <= maxLength && isValid
  return isValid
}