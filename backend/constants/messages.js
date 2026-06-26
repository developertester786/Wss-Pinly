const MESSAGES = {
    // Common
    INTERNAL_SERVER_ERROR: "Internal server error.",
    VALIDATION_ERROR: "Validation error.",
    NOT_FOUND: "Record not found.",
    UNAUTHORIZED: "Unauthorized access.",
    FORBIDDEN: "You are not allowed to access this resource.",

    // Roles
    ROLE_CREATED: "Role created successfully.",
    ROLE_UPDATED: "Role updated successfully.",
    ROLE_DELETED: "Role deleted successfully.",
    ROLE_FETCHED: "Role fetched successfully.",
    ROLES_FETCHED: "Roles fetched successfully.",
    ROLE_NOT_FOUND: "Role not found.",
    ROLE_ALREADY_EXISTS: "Role already exists.",
    DEFAULT_ROLE_DELETE: "Default system roles cannot be deleted.",

    // Users
    USER_CREATED: "User created successfully.",
    USER_UPDATED: "User updated successfully.",
    USER_DELETED: "User deleted successfully.",
    USER_FETCHED: "User fetched successfully.",
    USERS_FETCHED: "Users fetched successfully.",
    USER_NOT_FOUND: "User not found.",
    DEFAULT_USER_NAME: "New User",
    EMAIL_ALREADY_EXISTS: "Email already exists.",
    MOBILE_ALREADY_EXISTS: "Mobile number already exists.",

    // Authentication
    OTP_SENT: "OTP sent successfully.",
    OTP_VERIFIED: "OTP verified successfully.",
    LOGIN_SUCCESS: "Login successful.",
    REGISTER_SUCCESS: "User registered successfully.",
    INVALID_OTP: "Invalid OTP.",
    OTP_EXPIRED: "OTP expired.",
    UNAUTHORIZED: "Unauthorized.",
    INVALID_CREDENTIALS: "Invalid credentials.",
    TOKEN_REQUIRED: "Token is required.",
    TOKEN_INVALID: "Invalid or expired token.",
    PROFILE_FETCHED: "Profile fetched successfully.",
};
module.exports = MESSAGES;