import type { JSX } from "react";
import ReviewCard from "./ReviewCard";
import type { Review } from "../../lib/types";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";

const Reviews = (): JSX.Element => {
    const reviews: Review[] = [
        {
            name:"Yassine Ben Kacem",
            email:"yassine@gmail.com",
            text:"Amazing experience! The safari was well-organized and the guides were knowledgeable.",
            rate:4
        },
        {
            name:"Rae Mungai",
            email:"rae@gmail.com",
            text:"The safari was a once-in-a-lifetime experience! Highly recommend.",
            rate:5
        },
        {
            name:"Yuri Munyua",
            email:"yuri@gmail.com",
            text:"Great value for the price. The accommodations were comfortable and the food was delicious.",
            rate:4
        },
        // {
        //     name:"Reda",
        //     email:"reda@gmail.com",
        //     text:"The safari exceeded my expectations. The wildlife sightings were incredible and the guides were fantastic.",
        //     rate:3
        // },
        // {
        //     name:"Mohamed",
        //     email:"mohamed@gmail.com",
        //     text:"thank you for your services, i will be glade to visit kneya again",
        //     rate:4
        // }
    ];
  return (
    <section className="background-color flex flex-col gap-8 px-15 py-10 min-h-screen">
        <div className="w-full flex items-center justify-between">
           <h1 className="text-6xl font-mono title-font color-primary">WHAT PEOPLE SAY</h1>
          <div className="flex gap-4">
            <button title="Previous Review" 
            className="border-black/70 border-1 cursor-pointer hover:scale-105 rounded-full duration-150 transition-transform p-4">
                <IoMdArrowBack size={20}/>
               
            </button>
            <button title="Next Review" className="border-black/70 border-1 cursor-pointer hover:scale-105 rounded-full duration-150 transition-transform p-4">
                <IoMdArrowForward size={20}/>
            </button>
          </div>
        </div>
        <div className="flex gap-4">
            {reviews.map((review, index)=>
              <ReviewCard review={review} key={index} />
            )}
        </div>
    </section>
  )
}

export default Reviews