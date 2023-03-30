interface Product {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
}

const products: Product[] = [
  {
    name: "Sora",
    slug: "sora",
    category: "KH",
    image: "/images/sora",
    price: 15,
    brand: "funko",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description: "Lorem ipsum dolor sit amet",
  },
  {
    name: "Naruto",
    slug: "naruto",
    category: "shonen",
    image: "/images/naruto",
    price: 15,
    brand: "funko",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description: "Lorem ipsum dolor sit amet",
  },
  {
    name: "Itachi",
    slug: "itachi",
    category: "shonen",
    image: "images/itachi",
    price: 15,
    brand: "funko",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description: "Lorem ipsum dolor sit amet",
  },
  {
    name: "Axel",
    slug: "axel",
    category: "KH",
    image: "images/axel",
    price: 15,
    brand: "funko",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description: "Lorem ipsum dolor sit amet",
  },
  {
    name: "Broly",
    slug: "broly",
    category: "shonen",
    image: "images/broly",
    price: 15,
    brand: "funko",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description: "Lorem ipsum dolor sit amet",
  },
  {
    name: "Goku",
    slug: "goku",
    category: "shonen",
    image: "images/goku",
    price: 15,
    brand: "funko",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description: "Lorem ipsum dolor sit amet",
  },
];

export default products;
