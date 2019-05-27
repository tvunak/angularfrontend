export interface IUserDetails{
    username: string;
    email: string;
    password: string;

    name: string;
    middleName: string;
    lastName: string;
    authorities: string[];
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    enabled: boolean;
    accountNonLocked: boolean;

}

