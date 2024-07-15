const rules = {
  required: value => !!value || 'This field is mandatory!',
  minLength: (value, length) => (value && value.length >= length) || `Minimum length of this field must be ${length} characters!`,
  maxLength: (value, length) => (value && value.length <= length) || `Maximum length of this field must be ${length} characters!`,
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address',
  password: [
    value => !!value || 'This field is mandatory!',
    value => value.length >= 8 || 'Password must be at least 8 characters long',
    value => /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
    value => /[!@#$%^&*]/.test(value) || 'Password must contain at least one special character',
    value => /[0-9]/.test(value) || 'Password must contain at least one digit',
    value => /[a-z]/.test(value) || 'Password must contain at least one lowercase letter'
  ],
  editPassword: [
    value => value.length >= 8 || 'Password must be at least 8 characters long',
    value => /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
    value => /[!@#$%^&*]/.test(value) || 'Password must contain at least one special character',
    value => /[0-9]/.test(value) || 'Password must contain at least one digit',
    value => /[a-z]/.test(value) || 'Password must contain at least one lowercase letter'
  ],
  confirmPassword: password => value => value === password || 'Passwords do not match!!',
  number: value => /^\d+$/.test(value) || 'This field must be numeric!'
}

export default rules
