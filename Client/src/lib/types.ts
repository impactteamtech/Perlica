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