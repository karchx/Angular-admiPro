import { Usuario } from '../models/usuarios.model';

export interface LoginForm{
    email: string;
    password: string;
    remember: boolean;
}

export interface RegisterForm {
    nombre: string;
    email: string;
    password: string;
    password2: string;
    terminos: boolean;
}

export interface CargarUsuarios {
    total: number;
    usuarios: Usuario[];
}