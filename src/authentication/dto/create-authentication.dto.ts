export class CreateAuthenticationDto {
    authType!: 'CELLPHONE' | 'WEB';
    siglaApp!: string;
    userId!: string;
    password!: string;
}
