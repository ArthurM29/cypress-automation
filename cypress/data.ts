export interface Address {
    fullname: string;
    telephone: string;
    address: string;
    city: string;
    country: string;
    province: string;
    postcode: string;
}

export interface User {
    email: string;
    password: string;
    address: Address;
}

export const user: User = {
    email: 'arthur.m1199@gmail.com',
    password: 'Passo123!',
    address: {
        fullname: 'John Doe',
        telephone: '(555) 123-4567',
        address: '1500 Pennsylvania Avenue NW',
        city: 'Austin',
        country: 'United States',
        province: 'Texas',
        postcode: '20500',
    }
}