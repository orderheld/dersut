import { config } from './config';

type OrderLike = { number: string; created_at: Date | string };

export function paymentMessage(o: { number: string }): string {
  return `Bestellung ${o.number}`;
}

export function dueDate(o: OrderLike): Date {
  const d = new Date(o.created_at);
  d.setDate(d.getDate() + config.shop.paymentDays);
  return d;
}
