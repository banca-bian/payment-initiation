/**
 * Transaction step execution status
 */
export enum StepStatus {
  PENDING = 'PENDING', // Not yet executed
  IN_PROGRESS = 'IN_PROGRESS', // Currently executing
  COMPLETED = 'COMPLETED', // Successfully completed
  FAILED = 'FAILED', // Failed
  SKIPPED = 'SKIPPED', // Skipped
}
