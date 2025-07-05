import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currency(value?: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
}
export function percent(value?: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value || 0);
};

export function formatPhoneNumber(phoneNumber: string): string {
    const cleaned = phoneNumber.replace(/\D/g, '');

    if (cleaned.length === 11) {
        return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (cleaned.length === 10) {
        return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }

    return cleaned;
}
