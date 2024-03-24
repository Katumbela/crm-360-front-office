export interface PricingBoxProps {
  name: string;
  price:  number;
  popular:  boolean;
  features: string[];
  info: string;
}

export const prices: PricingBoxProps[] = [
  {
    name: "start",
    popular: false,
    price: 0,
    features: new Array(3).fill(null).map(() => "Lorem iptsum dolor"),
    info: "Fusce purus tellus, tristique quis libero sit amet..."
  },
  {
    name: "pro",
    price: 12000,
    popular: true,
    features: new Array(4).fill(null).map(() => "Lorem iptsum dolor"),
    info: "Fusce purus tellus, tristique quis libero sit amet..."
  },
  {
    name: "business",
    price: 30000,
    popular: false,
    features: new Array(5).fill(null).map(() => "Lorem iptsum dolor"),
    info: "Fusce purus tellus, tristique quis libero sit amet..."
  },
  // {
  //   name: "special",
  //   price: 180",
  //   features: new Array(5).fill(null).map(() => "Lorem iptsum dolor"),
  //   info: "Fusce purus tellus, tristique quis libero sit amet..."
  // }
];
