export type Guide = {
    id:number
    name: string,
    image:string,
    role:string
}

export type Thing = {
    id:number,
    image:string,
    name:string,
    desc:string,
}

export type ServiceCardProps = {
  name: string;
  img: string;
  description: string;
  index: number;
}

export type Review = {
    name:string,
    email:string,
    text:string,
    rate:number
}
export type KenyaImageDetails = { 
    placeName: string;
    path: string;
    location: string; 
}; 

export type Event = {
    id: number;
    name: string;
    description: string;
    mainImage: string;
}
export type Option  = {
    id:number,
    optionName:string,
    description:string
}
export type TravelInfo = {
    infoId:number,
    title:string,
    text:string,
    icon:string,
    options:Option[]
}

export type FamousDest = {
    name:string,
    countryFlag:string,
    image:string
}
export type City = {
  name: string;
  image: string;
  description: string;
};

export type Car = {
  name:string,
  image:string,
  features:string[],
  numberOfPassengers:number,
  numberOfBags:number,
  price:number,
  type:string,
  location:string,
  available:boolean
}

