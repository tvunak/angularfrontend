import { IAuthority } from './authority';

export class User{
    id:number;
    username:string;
    email: string;
    authorities: IAuthority[];
    name: string;
    middleName: string;
    lastName: string;

    User(username: string, email: string,  authorities: IAuthority[]){
        this.username = username;
        this.email = email;
        this.authorities = authorities;
    }

    getRole(){
        return this.authorities[0].authority;
    }
}