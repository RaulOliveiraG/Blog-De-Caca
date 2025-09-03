import { api } from './api';

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export async function requestPasswordReset(email: string): Promise<void> {
  await api.post('/password-reset/request', { email });
}

export async function resetPassword(payload: ResetPasswordPayload): Promise<void> {
  await api.post('/password-reset/reset', payload);
}