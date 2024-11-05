import { IsNotEmpty, IsString } from 'class-validator'

export class CreateAuthenticationDto {
    @IsNotEmpty()
    @IsString()
    authType!: 'CELLPHONE' | 'WEB';

    @IsNotEmpty()
    @IsString()
    siglaApp!: string;

    @IsNotEmpty()
    @IsString()
    userId!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}
