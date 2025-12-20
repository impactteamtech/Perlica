import type { Guide,KenyaImageDetails,Event,FamousDest, Car } from './types';
// Tour guides data :
export const tourGuides: Guide[] = [
  {
    id:1,
    name:'Yassine Ben Kacem',
    role:'Tour guide',
    image:'/tour_guides/yassine.jpg'
  },
  {
    id:2,
    name:"Yuri Munyua",
    role:"Safari guide",
    image:"/tour_guides/yuri.jpg"
  },
  {
    id:3,
    name:"Rae Mungai",
    role:"Travel consultant",
    image:"/tour_guides/rea.jpg"
  },
  {
    id:4,
    name:"Reda",
    role:"Wildlife expert",
    image:"/tour_guides/guide1.jpg"
  },
  // {
  // id:5,
  // name:"Ahmed",
  // role:"Guide",
  // image:"/tour_guides/guide2.jpg"
  // }
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
      name:"Customized tour packages",
      img:"/services/customized_tour.jpg",
      description:"Tailor-made itineraries based on traveler interests"
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
    {
      name:"Safaris and tour packages",
      img:"/services/safari_tour_package1.jpg",
      description:"Our Tours Department offers unique, tailor-made adventure and luxury safaris."
    },
    {
      name:"Specialized Experiences",
      img:"/services/specialized_experiences.jpg",
      description:"Honeymoon packages, Adventure tours, Cultural and eco-tours"
    }
  ];

// kenya places images data :
export  const kenyaImages: KenyaImageDetails[] = [
  {
    placeName:"National parc in nairobi",
    path:"/kenya_places/nairobi_national_parc.jpg",
    location:"Nairobi, Kenya",
  },
  {
    placeName:"Giraffe centre",
    path:"/kenya_places/giraffe_centre.jpg",
    location:"Duma Rd, Nairobi, Kenya",
  },
  {
    placeName:"Karen blixen museum",
    path:"/kenya_places/karen_blixen_museum.jpg",
    location:"Karen Rd, Nairobi, Kenya"
  },
  {
    placeName:"The Nairobi Arboretum",
    path:"/kenya_places/nairobi_arboretum.jpg",
    location:"Carte de The Nairobi Arboretum Kilimani Arboretum Rd, off State House Rd, Nairobi, Kenya",
  },
  {
    placeName:"The Hub Karen",
    path:"/kenya_places/the_hub_karen.webp",
    location:"Carte de The Hub Karen, Dagoretti Rd, Nairobi City, Kenya"
  },
  {
    placeName:"Bomas of Kenya",
    path:"/kenya_places/bomas_of_kenya.jpg",
    location:"Carte de Bomas of Kenya Nairobi, Kenya",
  },
  {
    placeName:"Uhuru Park",
    path:"/kenya_places/uhuru_park.jpg",
    location:"Carte de Uhuru Park, 23 Uhuru Hwy, Nairobi, Kenya",
  }
];

// festivals and event data : 

export const events: Event[] = [
  {
    id:1,
    name:"Tobongu Lore (Lake Turkana Cultural Festival)",
    description:"A celebration of indigenous culture among communities around Lake Turkana; includes music, dance, craft, cultural exchange.",
    mainImage:"/events/tobongu/tobongu_festival_main.jpg",
  },
  {
    id:2,
    name:"Kenya Schools and Colleges Drama Festival",
    description:"Annual school‐based drama competitions (plays, dance, film, storytelling",
    mainImage:"/events/drama_festival/drama_festival_main.jpg",
  },
  {
    id:3,
    name:"Maragoli Cultural Festival in kenya",
    description:"Held in Vihiga County (Mbale town) on 26 December; features traditions, music, dance of the Maragoli and Luhya communities",
    mainImage:"/events/maragoli/maragoli_festival_main.jpg",
  },
    {
    id:4,
    name:"International Camel Derby (Maralal)",
    description:"A cultural & sporting event involving camel races in Maralal, Northern Kenya",
    mainImage:"/events/camel_derby/camel_derby_main.jpg",
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
