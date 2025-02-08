import { Role } from "./Role";

export class LoginDTO{
    email!: string;
    password!:string;
    userRole?: Role

    constructor(email:string,password:string, role?:Role){
        this.email=email;
        this.password=password;
        this.userRole= role
    }
}