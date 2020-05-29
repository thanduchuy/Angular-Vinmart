export class User {
  name: string;
  email: string;
  phone: string;
  birthDay: string;
  gender: string;
  constructor(
    email: string,
    name: string,
    phone: string,
    birthDay: string,
    gender: string
  ) {
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.birthDay = birthDay;
    this.gender = gender;
  }
}
