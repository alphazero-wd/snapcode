// at least 6 characters, 1 lowercase, 1 uppercase letters, 1 number and 1 special character
export const PASSWORD_REGEX = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*].{6,}$/;
export const VALID_USERNAME_REGEX = /^[0-9a-zA-Z_]*$/;
export const POSTS_LIMIT = 10;
