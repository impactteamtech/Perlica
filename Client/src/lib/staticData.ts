import type { Guide,KenyaImageDetails,Event,FamousDest, Car, City } from './types';
// Tour guides data :
export const tourGuides: Guide[] = [
  {
    id:1,
    name:'Rispa',
    role:'Tour guide',
    image:'/tour_guides/tour_guide1.jpeg'
  },
  {
    id:2,
    name:"",
    role:"Safari guide",
    image:"/tour_guides/tour_guide3.png"
  },
  {
    id:3,
    name:"",
    role:"Travel consultant",
    image:"/tour_guides/"
  },
  
];

// services data :
export const services:{
    name:string,
    description:string,
    img:string,
  }[] = [
    {
      name:"Flight & Hotel bookings",
      img:"/services/get_ticket.jpg",
      description:"Domestic and international ticketing" 
    },
    {
      name:"Corporate & Group Travel",
      img:"/services/group_travel.jpg",
      description:"We negotiate special rates and volume \
      discounts for large groups travelling together with preferred airlines."
    },
    {
      name:"Conference facilities",
      img:"/services/conference.jpg",
      description:"We organize conferences for groups of all sizes in Nairobi and beyond."
    },
    {
      name:"Perlica Tours & Logistics",
      img:"/services/customized_tour.jpg",
      description:"We provide professional travel and transfer services, along with reliable logistics for moving goods, importing, and exporting."
    },
    {
      name:"Transportation & Transfers",
      img:"/services/transportation.jpg",
      description:"Airport pickup and drop-off, Local transport arrangements and guided tours"

    },
    {
      name:"Hotel reservations",
      img:"/services/hotel_reservation.jpg",
      description:"Partnered with top airlines and hotels"
    },
  ];

// kenya places images data :
export  const kenyaImages: KenyaImageDetails[] = [
  {
    placeName:"Nairobi National Park",
    path:"/kenya_places/nairobi_national_park.jpg",
    location:"Nairobi, Kenya",
  },
  {
    placeName:"Giraffe Centre",
    path:"/kenya_places/giraffe_centre.jpg",
    location:"Duma Rd, Nairobi, Kenya",
  },
  {
    placeName:"Karen Blixen Museum",
    path:"/kenya_places/karen_blixen_museum.jpg",
    location:"Karen Rd, Nairobi, Kenya"
  },
  {
    placeName:"The Nairobi Arboretum",
    path:"/kenya_places/nairobi_arboretum.jpg",
    location:"Kilimani Arboretum Rd, off State House Rd, Nairobi, Kenya",
  },
  {
    placeName:"The Hub Karen",
    path:"/kenya_places/the_hub_karen.webp",
    location:"Dagoretti Rd, Nairobi City, Kenya"
  },
  {
    placeName:"Bomas of Kenya",
    path:"/kenya_places/bomas_of_kenya.jpg",
    location:"Langata Highway Forest Edge Road, Nairobi, Kenya",
  },
  {
    placeName:"Uhuru Park",
    path:"/kenya_places/uhuru_park.jpg",
    location:"23 Uhuru Hwy, Nairobi, Kenya",
  }
];

// festivals and event data : 

export const events: Event[] = [
  {
    id:1,
    name:"Tribal and Ethnic Tours",
    description:"Experience Kenya’s cultural heritage with immersive tours connecting you to Maasai, Samburu, Swahili, and Kikuyu communities.",
    mainImage:"public/events/maasi_tours.png",
  },
  {
    id:2,
    name:"Haller Park Mombasa",
    description:"Discover Haller Park, a peaceful wildlife sanctuary on Kenya’s coast with giraffes, hippos, birds, and scenic trails.",
    mainImage:"public/events/haller_park.png",
  },
  {
    id:3,
    name:"Nairobi Railway Museum",
    description:"Nairobi Railway Museum showcases Kenya’s railway history with vintage locomotives, historic carriages, and heritage exhibits.",
    mainImage:"public/events/nairobi_railway.png",
  },
    {
    id:4,
    name:"TGRV Circuit Naivasha",
    description:"TGRV Circuit in Naivasha offers thrilling motorsport events, scenic Rift Valley views, and adrenaline-packed activities.",
    mainImage:"public/events/go_karts.jpg",
  },
   {
    id:5,
    name:"Safari Tours",
    description:"Experience unforgettable safari tours with expert guides, wildlife encounters, and breathtaking landscapes.",
    mainImage:"public/events/safari.png",
  },
    {
    id:6,
    name:"Coffee Tours",
    description:"Join guided coffee tours to learn how coffee is grown, harvested, and brewed while tasting fresh, authentic blends.",
    mainImage:"public/events/coffee_tours.png",
  },
   {
    id:7,
    name:"Maasai Market",
    description:"Visit the Maasai Market for authentic handmade crafts, colorful jewelry, artwork, and souvenirs from local artisans.",
    mainImage:"public/events/maasai-market.jpg",
  },
   {
    id:8,
    name:"Mnarani Marine Turtles Conservation ",
    description:"Visit Mnarani Marine Turtles Conservation in Zanzibar to learn about sea turtle rescue, rehabilitation, and marine conservation efforts.",
    mainImage:"/events/zanzibar_turtle_conservation.jpg",
  },
    {
    id:9,
    name:"Nairobi National Museum",
    description:"The Nairobi National Museum showcases Kenya’s rich cultural, historical, and natural heritage through engaging exhibits and artifacts.",
    mainImage:"/events/nairobi_national_museum.png",
  },
];

export const famousDestinations:FamousDest[] = [
    {
      name:"Nairobi",
      countryFlag:"/popular_destinations/kenya.png",
      image:"/popular_destinations/nairobi.jpg",
    },
    {
      name:"Mombasa",
      countryFlag:"/popular_destinations/kenya.png",
      image:"/popular_destinations/mombasa.jpg",
    },
    {
      name:"Kampala",
      countryFlag:"/popular_destinations/uganda.png",
      image:"/popular_destinations/kampala.jpg",
    },
    {
      name:"Dar es Salam",
      countryFlag:"/popular_destinations/tanzania.png",
      image:"/popular_destinations/dar_salaam.jpg",
    }
  ];

export  const destinations: {
    country: string;
    cities: City[];
  }[] = [
    {
      country: 'Kenya',
      cities: [
        {
          name: "Nairobi",
          image: "/popular_destinations/countries/kenya/nairobi.jpg",
          description: "The bustling capital city of Kenya, known for its vibrant culture and wildlife."
        },
        {
          name: "Maasai Mara National Reserve",
          image: "/popular_destinations/countries/kenya/maasai_mara_national_reserve.jpg",
          description: "A world-renowned wildlife reserve in Kenya, famous for the Great Migration."
        },
        {
          name: "Mombasa",
          image: "/popular_destinations/countries/kenya/mombasa.jpg",
          description: "A coastal city famous for its beautiful beaches and historical sites."
        },
        {
          name: "Mount Kenya National Park",
          image: "/popular_destinations/countries/kenya/mount_kenya_national_park.jpg",
          description: "Home to Africa's second-highest mountain, great for hiking and adventure."
        },
        {
          name: "Lake Nakuru",
          image: "/popular_destinations/countries/kenya/lake_nakuru.jpg",
          description: "Famous for its flamingos and beautiful pink-colored lake views."
        },
        {
          name: "Hell's Gate National Park",
          image: "/popular_destinations/countries/kenya/hells_gate_national_park.jpg",
          description: "Known for rock formations, geothermal features, and cycling between giraffes!"
        }
      ]
    },
    {
      country: 'Uganda',
      cities: [
        {
          name: "Bwindi Impenetrable National Park",
          description: "Famous for mountain gorilla trekking, one of the most unique experiences in Africa.",
          image: "/popular_destinations/countries/uganda/bwindi_impenetrable_national_park.jpg"
        },
        {
          name: "Murchison Falls National Park",
          description: "Where the Nile River explodes through a narrow gorge — breathtaking waterfall.",
          image: "/popular_destinations/countries/uganda/murchison_falls_national_park.jpg"
        },
        {
          name: "Kampala",
          description: "The capital city lively markets, culture, and great nightlife.",
          image: "/popular_destinations/countries/uganda/kampala.jpg"
        },
        {
          name: "Queen Elizabeth National Park",
          description: "Diverse wildlife including tree-climbing lions and beautiful landscapes.",
          image: "/popular_destinations/countries/uganda/queen_elizabeth_national_park.jpg"
        },
        {
          name: "Lake Bunyonyi",
          description: "A serene lake surrounded by hills, perfect for relaxation and birdwatching.",
          image: "/popular_destinations/countries/uganda/lake_bunyonyi.jpg",
        },
        {
          name: "Rwenzori Mountains National Park",
          description: "Known as the 'Mountains of the Moon,' great for trekking and stunning scenery.",
          image: "/popular_destinations/countries/uganda/rwenzori_mountains_national_park.jpg",
        }
      ]
    },
    {
      country: "Tanzania",
      cities: [
        {
          name: "Zanzibar Island (Stone Town)",
          description: "A UNESCO site with Arab-Swahili architecture, spice markets, and rich culture.",
          image: "/popular_destinations/countries/tanzania/zanzibar_island_stone_town.jpg",
        },
        {
          name: "Nungwi Beach",
          description: "Stunning sunsets, clear waters, and perfect for diving and relaxation.",
          image: "/popular_destinations/countries/tanzania/nungwi_beach.jpg",
        },
        {
          name: "Mnemba Atoll",
          description: "Famous for snorkeling, dolphins, and crystal-clear coral reefs.",
          image: "/popular_destinations/countries/tanzania/mnemba_atoll.jpg"
        }
      ]
    }
  ];

export const perlcaCars: Car[] = [
  {
    name:"Mercedes G-Wagon",
    image:"https://rendezvous-dubai.com/wp-content/uploads/2023/04/G-class-Rendez-vous-dubai-1.jpg",
    features:[
      "Leather seats",
      "Climate control",
      "WiFi available",
      "Bottled water",
      "Phone chargers",
      "Privacy glass"
    ],
    numberOfBags:3,
    numberOfPassengers:3,
    price:100,
    type: "Luxury SUV (Mercedes G-Wagon)",
    location: "Jomo Kenyatta International (NBO)",
    available: true
  },
  {
    name:"Range Rover Vogue",
    image:"https://static.oneclickdrive.com/car-for-rent/mobile/Land-Rover_Range-Rover-Vogue_2024_32170_32170_26192132044-1_small.jpg",
    features:[
      "Premium leather seats",
      "4WD capability",
      "Wifi available",
      "Panoramic roof",
      "Phone chargers",
      "Extra space"
    ],
    numberOfBags:4,
    numberOfPassengers:4,
    price:150,
    type: "Luxury SUV (Mercedes G-Wagon)",
    location: "Moi International Airport (MBA)",
    available: true
  },
  {
    name:"Toyota Corolla",
    image:"https://journalauto.com/wp-content/uploads/2023/04/Toy.jpg",
    features:["Air conditioning",
    "Compact and fuel efficient",
    "Easy to maneuver in city traffic",
    "Bluetooth connectivity",
    "AM/FM radio with USB port",
    "Spacious trunk for luggage"
    ],
    numberOfBags:2,
    numberOfPassengers:3,
    price:50,
    type: "Economy Sedan (Toyota Corolla)",
    location: "Eldoret International Airport (EDL)",
    available: true
  },
  {
    name:"Toyota Voxy",
    image:"https://i.ytimg.com/vi/skKUfVUqWGE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD31MsvlfTpruBZP0BMcr_DFIjS6g",
    features:[
      "Spacious interior with seating for up to 7 passengers",
      "Sliding doors for easy access",
      "Air conditioning for all rows",
      "Rearview camera for easier parking"],
    numberOfBags:5,
    numberOfPassengers:7,
    price:80,
    type: "7-Seater Van (Toyota Hiace)",
    location: "Jomo Kenyatta International (NBO)",
    available: true
  }
];

