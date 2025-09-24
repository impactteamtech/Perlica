import type { Guide } from './types';
export const safariVideos:string[] = [
    '/video1.mov',
    '/video2.mov',
    '/video3.mov'
];
export const safariImages: string[] = [
  "/safari_image1.webp",
  "/safari_image2.webp",
  "/safari_image3.jpg",
  "/safari_image4.jpg",
  "/safari_image5.jpg",
  "/safari_image6.jpg",
  "/safari_image7.jpg",
  "/safari_image8.jpg",
  "/safari_image9.jpg",
];
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
    name:"Rea Mungai",
    role:"Travel consultant",
    image:"/tour_guides/rea.jpg"
  },
  {
    id:4,
    name:"Reda",
    role:"Wildlife expert",
    image:"/tour_guides/guide1.jpg"
  },
  {
  id:5,
  name:"Ahmed",
  role:"Guide",
  image:"/tour_guides/guide2.jpg"
  }
];
