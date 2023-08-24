export type RegistrationRequest = {
    email: string,
    password: string,
    passConfirm: string,
    name: string,
    surname: string,
    phone: string,
    country: string,
    city: string,
    street: string,
    postCode: string,
}

export type LoginRequest = {
    email: string,
    password: string,
}