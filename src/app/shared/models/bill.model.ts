import { Cart } from "./cart.model";
import { Location } from "./location.model";
import { Payment } from "./payment.model";

export class Bill {
  item: Cart[];
  local: Location;
  payment: Payment;
  note: string;
  noteOther: string;
  date: string;
  constructor(
    item?: Cart[],
    local?: Location,
    payment?: Payment,
    note?: string,
    noteOther?: string
  ) {
    this.item = item;
    this.local = local;
    this.payment = payment;
    this.note = note;
    this.noteOther = noteOther;
  }
}
