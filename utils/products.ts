import { Product } from "./data.interface";

const products: Product[] = [
  // !Attack on Titan
  {
    name: "Eren Jeager",
    slug: "eren-yeager",
    category: "Attack on Titan",
    image: "/images/products/eren.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Eren Jaeger is dedicated to ending the reign of terror the Titans unleash upon the world.",
  },
  {
    name: "Zeke Jeager",
    slug: "zeke-yaeger",
    category: "Attack on Titan",
    image: "/images/products/zeke.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "The fate of humanity hangs in the balance. Prepare your Attack on Titan collection for battle with Pop! Zeke Jaeger.",
  },
  {
    name: "Mikasa Ackerman",
    slug: "mikasa-ackerman",
    category: "Attack on Titan",
    image: "/images/products/mikasa.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Mikasa Ackermann has her swords drawn, ready to take the next mission in your Attack on Titan collection.",
  },
  {
    name: "Hardened Titan",
    slug: "eren-yaegar-iced",
    category: "Attack on Titan",
    image: "/images/products/eren_ice.png",
    price: 30,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "In hardened form, Pop! Deluxe Eren Jaeger can shelter and protect the heroes in your Attack on Titan collection.",
  },

  //! Naruto
  {
    name: "Naruto Uzamaki",
    slug: "naruto-uzamaki",
    category: "Naruto Shippuden",
    image: "/images/products/naruto.png",
    price: 30,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Naruto is the jinchuriki of the Nine-Tails and the son of the Uzumaki clan’s Fourth Hokage. Naruto is on a mission and powered up to become a great shinobi warrior and Hokage of the Uzumaki clan.",
  },
  {
    name: "Orochimaru",
    slug: "orochimaru",
    category: "Naruto Shippuden",
    image: "/images/products/orochimaru.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Many villains simply seek immortality out of their fear of death, although Orochimaru seeks immortality as a means to learn all of the jutsu, including the kinjutsu.",
  },
  {
    name: "Kakashi Hatake",
    slug: "kakashi-hatake",
    category: "Naruto Shippuden",
    image: "/images/products/kakashi.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Kakashi is a skilled and famed shinobi of Konoha. Bring Pop! Kakashi into your Naruto collection to help protect against another shinobi war within your collection’s ranks.",
  },
  {
    name: "Madara Uchiha",
    slug: "madara-uchiha",
    category: "Naruto Shippuden",
    image: "/images/products/madara.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "In the fight for peace, Madara Uchiha achieves Sage Mode to harness a greater level of power.",
  },
  {
    name: "Tobi",
    slug: "tobi",
    category: "Naruto Shippuden",
    image: "/images/products/tobi.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Obito Uchiha has taken on the name Tobi and dawned a mask to enact his plans to create the ideal world (as Madara had planned before him).",
  },
  {
    name: "Kurama",
    slug: "kurama",
    category: "Naruto Shippuden",
    image: "/images/products/kurama.png",
    price: 25,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Also known as the Nine-Tails, Kurama is a demon creature able to wield chakra to perform deadly attacks.",
  },
  // ! One Piece
  {
    name: "Luffy (Snake-Man)",
    slug: "luffy-snake-man",
    category: "One Piece",
    image: "/images/products/luffy.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Monkey D. Luffy is determined to become the Pirate King by finding Gol D. Roger's legendary treasure.",
  },
  {
    name: "Roronoa Zoro",
    slug: "roronoa-zoro",
    category: "One Piece",
    image: "/images/products/zoro.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Roronoa Zoro is a swordsman and ex-bounty hunter, who is looking to rejoin his crew members. ",
  },
  {
    name: "Eustass Kidd",
    slug: "eustass-kidd",
    category: "One Piece",
    image: "/images/products/eustass.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Set sail and strengthen your scurvy pirate crew with Pop! Eustass Kid!",
  },
  {
    name: "Trafalgar Law",
    slug: "trafalgar-law",
    category: "One Piece",
    image: "/images/products/law.png",
    price: 40,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Set sail on a voyage with Pop! Trafalgar Law aboard the Polar Tang! This Pop! Rides Superdeluxe collectible is modeled after the submarine serving as the ship of the Heart Pirates.",
  },
  // !NBA

  {
    name: "Lebron James",
    slug: "lebron-james",
    category: "NBA",
    image: "/images/products/lebron.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Recruit LeBron James of the NBA’s Los Angeles Lakers to your basketball collection with this Pop! LeBron James in his yellow home uniform.",
  },
  {
    name: "Michael Jordan",
    slug: "michael-jordan",
    category: "NBA",
    image: "/images/products/jordan.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Get courtside seats as Pop! Michael Jordan scores a game-winning point! Wearing his red Chicago Bulls away jersey, the Funko exclusive Pop! Michael Jordan is ready to make a slam dunk in your NBA collection. ",
  },

  // !Pokemon
  {
    name: "Growlithe",
    slug: "growlithe",
    category: "Pokemon",
    image: "/images/products/growlithe.png",
    price: 12,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Your dream of becoming a Trainer is not out of reach! Catch this Pop! of Growlithe to add to your Pokémon collection.",
  },
  {
    name: "Mewtwo",
    slug: "mewtwo",
    category: "Pokemon",
    image: "/images/products/mewtwo.png",
    price: 12,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Your dream of becoming a Trainer is not out of reach! Catch this Pop! of Mewtwo to add to your Pokémon collection.",
  },
  {
    name: "Piplup",
    slug: "piplup",
    category: "Pokemon",
    image: "/images/products/piplup.png",
    price: 12,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Your dream of becoming a Trainer is not out of reach! Catch this Pop! Piplup to add to your Pokémon collection.",
  },
  //! Avatar: the Last Airbender
  {
    name: "Aang",
    slug: "aang",
    category: "Avatar the Last Airbender",
    image: "/images/products/aang.png",
    price: 12,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Aang was told he was the next Avatar at only 12 years old. While trying to flee, Aang was encased in ice and survived to be broken out after a century to restore balance to the world. ",
  },
  {
    name: "Appa",
    slug: "appa",
    category: "Avatar the Last Airbender",
    image: "/images/products/appa.png",
    price: 12,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Avatar Aang would be lost without his loyal sky bison companion Appa. Reunite Aang and Appa in your Avatar: The Last Airbender collection with Pop! Appa. ",
  },
  {
    name: "Zuko",
    slug: "zuko",
    category: "Avatar the Last Airbender",
    image: "/images/products/zuko.png",
    price: 12,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Zuko, prince to the Fire Nation, was banished by his father for speaking out of turn. Though Zuko believes that finding and returning to the Fire Nation with the Avatar will restore his honor and place within his homeland.",
  },
  // !Marvel/DC
  {
    name: "Doctor Strange",
    slug: "dr-strange",
    category: "Marvel / DC",
    image: "/images/products/dr_strange.png",
    price: 12,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Help Spider-Man protect his identity with Pop! Dr. Strange with Spell. ",
  },
  {
    name: "The Flash",
    slug: "the flash",
    category: "Marvel / DC",
    image: "/images/products/flash.png",
    price: 12,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Pop! The Flash™ is ready to rush into action and fight alongside your favorite heroes! ",
  },
  {
    name: "Groot with Cheese Puffs",
    slug: "groot",
    category: "Marvel / DC",
    image: "/images/products/groot.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Take off on a galactic adventure with Pop! Groot with Cheese Puffs! ",
  },
  {
    name: "Spiderman",
    slug: "spiderman",
    category: "Marvel / DC",
    image: "/images/products/spiderman.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Swinging from the rooftops, Pop! Spider-Man is ready to deliver good cheer this holiday season.",
  },
  // !Jujutsu Kaisen
  {
    name: "Gojo",
    slug: "gojo",
    category: "Jujutsu Kaisen",
    image: "/images/products/gojo.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Take on cursed spirits with Pop! Satoru Gojo! Join exclusive Pop! Satoru Gojo from Jujutsu Kaisen and train under his direction. ",
  },
  {
    name: "Sukuna",
    slug: "sukuna",
    category: "Jujutsu Kaisen",
    image: "/images/products/sukuna.png",
    price: 30,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "The King of Curses awaits on his throne of skulls, but don’t look up at him as you approach. ",
  },
  {
    name: "Yuji",
    slug: "yuji",
    category: "Jujutsu Kaisen",
    image: "/images/products/yuji.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "During his downtime from classes at Tokyo Jujutsu High, Yuji watches TV with a Tsukamoto Doll. ",
  },
  // !Dragon Ball Z
  {
    name: "Goku Rose",
    slug: "goku-rose",
    category: "Dragon Ball Z",
    image: "/images/products/goku_rose.png",
    price: 20,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "As an infant, Goku was sent to destroy Earth but ended up becoming one of the planet's greatest heroes after a head injury rid the young Saiyan of his senselessly destructive nature. ",
  },
  {
    name: "Goku Super Saiyan 2",
    slug: "goku-ssj2",
    category: "Dragon Ball Z",
    image: "/images/products/gokussj2.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "As an infant, Goku was sent to destroy Earth but ended up becoming one of the planet's greatest heroes after a head injury rid the young Saiyan of his senselessly destructive nature.",
  },
  {
    name: "Jiren",
    slug: "jiren",
    category: "Dragon Ball Z",
    image: "/images/products/jiren.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Face off against Goku with Pop! Jiren. This powerful Pride Trooper is ready to battle all his enemies in your Dragon Ball Super collection.",
  },
  {
    name: "Majin Vegeta",
    slug: "vegeta",
    category: "Dragon Ball Z",
    image: "/images/products/vegeta.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Babidi has invaded Vegeta's mind and possessed him, creating Majin Vegeta.",
  },
  // !Hunter X Hunter
  {
    name: "Gon Freecss",
    slug: "gon-freecss",
    category: "Hunter X Hunter",
    image: "/images/products/gon.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Gon's father left him in the care of a childhood friend, and now it is Gon's goal to become a hunter and seek out his father.",
  },
  {
    name: "Killua Zoldyck",
    slug: "killua",
    category: "Hunter X Hunter",
    image: "/images/products/killua.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Killua runs away from his family to become a hunter instead of following the family tradition of becoming an assassin.",
  },
  // ! My Hero Academia
  {
    name: "Midoriya",
    slug: "midoriya",
    category: "My Hero Academia",
    image: "/images/products/midoriya.png",
    price: 20,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "“My motivation might seem trivial compared to yours, but I can’t lose either. I have to live up to the hopes of those who supported me.” Deku is ready for a fight and won’t back down.",
  },
  {
    name: "Todoroki",
    slug: "todoroki",
    category: "My Hero Academia",
    image: "/images/products/todoroki.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Throwing off the shroud of his abusive father, Todoroki embraces his full potential in order to become a better hero during his training at U.A. High School. ",
  },
  // !Demon Slayer
  {
    name: "Rengoku",
    slug: "rengoku",
    category: "Demon Slayer",
    image: "/images/products/rengoku.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Only two of the Kamado family survived a demon attack, and now Tanjiro and Nezuko are out for revenge.",
  },
  {
    name: "Tanjiro Eating Ramen",
    slug: "tanjiro",
    category: "Demon Slayer",
    image: "/images/products/tanjiro.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Expand your Demon Slayer collection by inviting Pop! Tanjiro with Noodles to join you for a delicious meal.",
  },

  // !Halo
  {
    name: "Master Chief",
    slug: "master-chief",
    category: "Halo",
    image: "/images/products/master-chief.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "John-117, also known by his rank as Master Chief, is a Spartan-II super soldier serving under the United Nations Space Command. ",
  },
  // !Fullmetal Alchemist
  {
    name: "Edward Elric",
    slug: "edward-elric",
    category: "Fullmetal Alchemist",
    image: "/images/products/edward.png",
    price: 25,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Alchemist, Edward Elric is searching for the Philosopher's Stone to repair his brother, Alphonse, from a failed transmutation experiment. ",
  },

  // !Harry Potter
  {
    name: "Dobby",
    slug: "dobby",
    category: "Harry Potter",
    image: "/images/products/dobby.png",
    price: 15,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "He's finally free! Welcome home one of the most well-known and lovable house-elves of the Wizarding World with this Pop! Dobby holding the diary with its hidden sock! ",
  },

  // !Disney
  {
    name: "Super Baymax",
    slug: "big-hero-6",
    category: "Disney",
    image: "/images/products/bighero6.png",
    price: 30,
    brand: "POP!",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Put Baymax in charge of your collection’s wellbeing as a Pop! Super figure. Funko-exclusive Pop! Baymax with Butterfly is programmed to offer optimal care and will only rest when patients are satisfied.",
  },

  // !Moments
  {
    name: "Tanjiro Vs. Rui",
    slug: "tanjiro-vs-rui",
    category: "Demon Slayer",
    image: "/images/products/tanjiro2.png",
    price: 35,
    brand: "POP! Moments",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Only two of the Kamado family survived a demon attack, and now Tanjiro and Nezuko are out for revenge. ",
  },
  {
    name: "Hakuna Matata",
    slug: "timon-pumbaa",
    category: "Disney",
    image: "/images/products/lionking.png",
    price: 50,
    brand: "POP! Moments",
    rating: 4.5,
    numReviews: 5,
    countInStock: 10,
    description:
      "Let your worries melt away with Pop! Simba, Pop! Pumba, and Pop! Timon. Celebrate Disney’s 100th Anniversary by completing your The Lion King collection with this exclusive Pop!",
  },
];

export default products;
