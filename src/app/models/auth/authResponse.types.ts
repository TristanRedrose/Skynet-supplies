export type AuthResponse = {
    username: string;
    expireDate : string;
    token: string;
    role: string;
}

export type ErrorResponse = {
    message: string;
    errors: string[];
}