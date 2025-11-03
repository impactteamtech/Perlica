import type { Guide,KenyaImageDetails,Event } from './types';
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