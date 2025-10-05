import type { Guide,KenyaImageDetails,Thing } from './types';
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


export const services:{
    name:string,
    description:string,
    img:string,
  }[] = [
    {
      name:"Ticketing",
      img:"/services_icons/ticket.png",
      description:"We will provide the most direct\
      cost effective flight schedules and special fares two to three booking \
      options will be emailed to help you make an informed decision"
    },
    {
      name:"Corporate group discounts",
      img:"/services_icons/group.png",
      description:"We negotiate special rates and volume \
      discounts for large groups travelling together with preferred airlines \
      Groups of  10 or more adults qualify for special rates."
    },
    {
      name:"Conference facilities",
      img:"/services_icons/conference.png",
      description:"We organize conferences for groups of all sizes in Nairobi and beyond \
      Partnering with reputable hotel lodges."
    },
    {
      name:"Hotel reservations",
      img:"/services_icons/hotel.png",
      description:"We proudly maintain strong, collaborative partnerships with hotel chains throught kenya, \
      East Africa, and worldwid. Leveraging negotiated contract rates with leading hotel groups."
    },
    {
      name:"Safaris and tour packages",
      img:"/services_icons/safari.png",
      description:"Our Tours Department offers unique, tailor-made adventure and luxurt safaris, prioritizing \
      priotizing client comfort end sefty with well-maintained vehicles equipped with 24-hour VHF communication. \
      We specialize in game viewing.beach holiday."
    }
  ];

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