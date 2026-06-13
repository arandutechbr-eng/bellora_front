import { api, parseApiError } from './api';
import {
  AppointmentCheckout,
  AppointmentItem,
  AppointmentPayload,
  DayAvailability,
  DepositPreview,
} from '../types';

export async function getProfessionalAvailability(
  professionalId: number,
  from: string,
  to?: string
): Promise<DayAvailability[]> {
  const response = await api.get<DayAvailability[]>(`/appointments/professional/${professionalId}/availability`, {
    params: { from, to },
  });
  return response.data;
}

export const FALLBACK_DEPOSIT_PREVIEW: DepositPreview = {
  total_amount: 0,
  deposit_amount: 0,
  deposit_percent: 30,
  payments_enabled: false,
};

export async function getDepositPreview(professionalId: number): Promise<DepositPreview> {
  try {
    const response = await api.get<DepositPreview>(`/appointments/deposit-preview/${professionalId}`);
    return response.data;
  } catch (error) {
    const { status } = parseApiError(error);
    if (status === 404 || status === 503) {
      return FALLBACK_DEPOSIT_PREVIEW;
    }
    throw error;
  }
}

export async function checkoutAppointment(payload: AppointmentPayload): Promise<AppointmentCheckout> {
  try {
    const response = await api.post<AppointmentCheckout>('/appointments/checkout', payload);
    return response.data;
  } catch (error) {
    const { status } = parseApiError(error);
    if (status === 404) {
      await bookAppointment(payload);
      return {
        appointment_id: 0,
        checkout_url: null,
        deposit_amount: 0,
        total_amount: 0,
        payments_required: false,
        status: 'confirmed',
      };
    }
    throw error;
  }
}

export async function cancelAwaitingPayment(appointmentId: number) {
  const response = await api.post(`/appointments/${appointmentId}/cancel-awaiting`);
  return response.data;
}

export async function getMyAppointments(): Promise<AppointmentItem[]> {
  const response = await api.get<AppointmentItem[]>('/appointments/me');
  return response.data;
}

export async function getIncomingAppointments(): Promise<AppointmentItem[]> {
  const response = await api.get<AppointmentItem[]>('/appointments/incoming');
  return response.data;
}

/** @deprecated use checkoutAppointment */
export async function bookAppointment(payload: AppointmentPayload) {
  const response = await api.post('/appointments', payload);
  return response.data;
}
