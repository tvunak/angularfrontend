import { IRole } from '../shared/userrole.model';

export class Role implements IRole{
    username: string;
    authority: string;

    Role(username: string, authority: string){
        this.username = username;
        this.authority = authority;
    }
}