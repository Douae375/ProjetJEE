export interface Salaire {
    id?: number;
    employeId: number;
    montant?: number;
    overtimeHours: number;
    absenceDays: number;
    bonuses: number;
    detailsCalcul?: string;
    datePaiement: string;
    baseSalary: number;
  }
  