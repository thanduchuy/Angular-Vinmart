export class Cart {
  img: string;
  name: string;
  price: number;
  quanlity: number;
  constructor(img: string, name: string, price: number, quanlity: number) {
    this.quanlity = quanlity;
    this.name = name;
    this.price = price;
    this.img = img;
  }
}
