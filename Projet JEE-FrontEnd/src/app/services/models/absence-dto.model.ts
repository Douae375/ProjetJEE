export interface AbsenceDTO {
  id: number;
  employeeId: number;
  startDate: string;
  endDate: string;
  reason?: string;
}
