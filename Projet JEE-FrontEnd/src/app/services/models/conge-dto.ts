export interface CongeDTO {
  id?: number; // Optional for creation; populated when the record is saved in the database.
  employeeId: number; // Required: The ID of the employee requesting the leave.
  departmentId: number; // Required: The ID of the department the employee belongs to.
  startDate: string; // Required: The start date of the leave.
  endDate: string; // Required: The end date of the leave.
  duration?: number; // Optional: Automatically calculated based on startDate and endDate.
  status: 'PENDING' | 'APPROVED' | 'REJECTED'; // Enum to represent the leave request's current status.
}
