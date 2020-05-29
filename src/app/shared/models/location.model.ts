export class Location {
  name: string;
  phone: string;
  email: string;
  addressCorporeal: string;
  address: string;
  active: boolean;
  constructor(
    name: string,
    phone: string,
    email: string,
    active: boolean,
    addressCorporeal: string,
    address: string
  ) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.active = active;
    this.addressCorporeal = addressCorporeal;
    this.address = address;
  }
}
