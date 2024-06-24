export const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID!;
export const AVATARS_FOLDER = process.env.NEXT_PUBLIC_AVATARS_FOLDER!;

// at least 6 characters, 1 lowercase, 1 uppercase letters, 1 number and 1 special character
export const PASSWORD_REGEX = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*].{6,}$/;
export const VALID_USERNAME_REGEX = /^[0-9a-zA-Z_]*$/;
export const PAGE_LIMIT = 10;

export const NAME_MAX_LENGTH = 30;
export const BIO_MAX_LENGTH = 200;
export const LOCATION_MAX_LENGTH = 100;
