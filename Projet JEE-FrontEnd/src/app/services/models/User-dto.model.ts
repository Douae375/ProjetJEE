import { DepartementDTO } from "./Departement-dto.model";

export interface UserDTO {
    name: any;
    id?: number;
    username?: string;
    email: string;
    role: string;
    password: string;
    departement?: DepartementDTO;
}
