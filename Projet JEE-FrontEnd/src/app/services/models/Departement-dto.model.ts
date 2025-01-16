import { UserDTO } from './User-dto.model';  // Adjust the import path as necessary

export interface DepartementDTO {
    id?: number;
    nom: string;
    utilisateurs?: UserDTO[];
}
