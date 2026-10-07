import { config } from './config';

type OrderLike = { number: string; created_at: Date | string };

/** Zahlungszweck: nur die Bestellnummer, damit er in allen Sprachen gleich ist und im Bankauszug eindeutig zugeordnet werden kann. */
export function paymentMessage(o: { number: string }): string {
  return o.number;
}

export function dueDate(o: OrderLike): Date {
  const d = new Date(o.created_at);
  d.setDate(d.getDate() + config.shop.paymentDays);
  return d;
}
