export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  emoji: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "parfaits",
    name: "Parfaits",
    emoji: "🍨",
    items: [
      {
        id: "p1",
        name: "700ml Parfait",
        price: 4000,
        description: "Layers of cream, granola & fresh fruit",
        category: "Parfaits",
        image: "/images/parfait%202.png",
      },
      {
        id: "p2",
        name: "1000ml Parfait",
        price: 6000,
        description: "Our jumbo-size parfait, fully loaded",
        category: "Parfaits",
        image: "/images/parfait%202.png",
      },
      {
        id: "p3",
        name: "Parfait Cup",
        price: 3000,
        description: "Perfect single-serve cup of joy",
        category: "Parfaits",
        image: "/images/parfait%201.png",
      },
      {
        id: "p4",
        name: "Premium Parfait 700ml",
        price: 6000,
        description: "Elevated toppings & premium ingredients",
        category: "Parfaits",
        image: "/images/parfait%202.png",
      },
      {
        id: "p5",
        name: "Premium Parfait 1000ml",
        price: 8000,
        description: "The ultimate premium parfait experience",
        category: "Parfaits",
        image: "/images/parfait%202.png",
      },
    ],
  },
  {
    id: "shawarma",
    name: "Shawarma",
    emoji: "🌯",
    items: [
      {
        id: "s1",
        name: "Regular Shawarma",
        price: 3500,
        description: "Classic seasoned wrap with fresh veggies",
        category: "Shawarma",
        image: "/images/regular%20sharwama.png",
      },
      {
        id: "s2",
        name: "Classic Shawarma",
        price: 4000,
        description: "Extra fillings with our signature sauce",
        category: "Shawarma",
        image: "/images/classic%20sharwama.png",
      },
      {
        id: "s3",
        name: "Royale Shawarma",
        price: 6000,
        description: "Double-stuffed premium shawarma experience",
        category: "Shawarma",
        image: "/images/royal%20shawarma.png",
      },
    ],
  },
  {
    id: "meals",
    name: "Meals",
    emoji: "🍽️",
    items: [
      {
        id: "m1",
        name: "Rice + Pepper Soup",
        price: 4000,
        description: "Fluffy rice served with rich peppery broth",
        category: "Meals",
        image: "/images/pepper%20soup.png",
      },
      {
        id: "m2",
        name: "Swallow + Soup",
        price: 3500,
        description: "Your choice of swallow with delicious soup",
        category: "Meals",
        image: "/images/swallow.png",
      },
      {
        id: "m3",
        name: "White Soup",
        price: 4000,
        description: "Creamy, fragrant Ofe Onugbu experience",
        category: "Meals",
        image: "/images/White%20soup.png",
      },
    ],
  },
  {
    id: "blends",
    name: "Fresh Blends",
    emoji: "🥤",
    items: [
      {
        id: "b1",
        name: "Smoothie",
        price: 2500,
        description: "Fresh blended fruits with a creamy finish",
        category: "Fresh Blends",
        image: "/images/smoothie.png",
      },
      {
        id: "b2",
        name: "Fresh Juice",
        price: 2500,
        description: "Cold-pressed seasonal fruit juice",
        category: "Fresh Blends",
        image: "/images/fresh%20juice.png",
      },
    ],
  },
];
