// src/app/models/login-response.model.ts
import { UserDTO } from './User-dto.model';  // Adjust the import path as necessary

export interface LoginResponse {
  token: string;
  role: string;
  // Ajouter d'autres champs selon la réponse du backend si nécessaire
  user?: {
    id: number;
    email: string;
    name: string;
  };
}
