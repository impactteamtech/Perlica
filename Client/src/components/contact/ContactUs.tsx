import { IoArrowForward } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import type { JSX } from "react";
import PingDot from "../AboutUs/PingDot";

const ContactUs = (): JSX.Element => {
  const subjects = [
    "General Inquiry",
    "Support",
    "Partnership",
    "Booking",
    "Feedback",
    "Other",
  ];

  return (
    <motion.section
      className="relative  overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="flex items-center ml-10 gap-2"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        viewport={{ once: true }}
      >
        <PingDot />
        <h4 className="text-lg md:text-2xl w-[25%] title-font font-medium ">CONTACT US</h4>
        <div className="w-[75%] md:w-[90%] h-[1px] bg-black " />
      </motion.div>

      <div className="flex gap-3 flex-wrap lg:flex-nowrap justify-between px-6 lg:px-15 py-16 relative z-10">
        {/* Left content */}
        <motion.div
          className="w-full lg:w-[48%] "
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <h1 className="text-6xl lg:text-7xl font-mono color-primary title-font leading-[1.1]">
              LET'S
              <br />
              GET IN TOUCH
              <br />
              <span className="font-light text-black">AND COLLABORATE</span>
            </h1>
            <p className="text-2xl md:text-2xl lg:text-3xl font-light text-gray-800 leading-relaxed font-[Rubik]">
              If you have any questions or inquiries, feel free to reach out to
              us!
            </p>
            <div className="space-y-4 mt-1">
              <div className="flex items-center gap-4 text-gray-600">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <p className="text-lg font-[Rubik]">Quick response within 24 hours</p>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <p className="text-lg font-[Rubik]">Professional team ready to help</p>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="text-center rounded-2xl ">
                <div className="text-3xl font-bold text-black mb-2">47</div>
                <div className="text-gray-900 font-medium">Counties Served</div>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="text-3xl font-bold text-black mb-2">24/7</div>
                <div className="text-gray-900 font-medium">Nationwide Support</div>
              </div>
              <div className="text-center ">
                <div className="text-3xl font-bold text-black mb-2">100%</div>
                <div className="text-gray-900 font-medium">Country Coverage</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right column: Form */}
        <motion.div
          className="w-full lg:w-[48%]"
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Form card wrapper */}
          <form className="p-6 md:p-8 flex flex-col  gap-8">
            {/* Full Name */}
            <motion.div
              className="group"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.25 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <FaUser
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-secondary transition-colors duration-300"
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  aria-label="Full Name"
                  className="w-full bg-transparent outline-none border-none focus:ring-0 text-gray-800 pb-3 pl-7 text-lg placeholder-gray-500 transition-all duration-300"
                />
              </div>
              <div className="h-0.5 w-full bg-black/50 overflow-hidden">
                <span className="block h-full w-full scale-x-0 origin-left bg-gradient-to-r from-secondary/60 to-secondary transition-transform duration-300 ease-out group-focus-within:scale-x-100" />
              </div>
            </motion.div>

            {/* Email + Phone Row */}
            <div className="flex gap-4">
              <motion.div
                className="group w-1/2"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <MdEmail
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-secondary transition-colors duration-300"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    aria-label="Email Address"
                    className="w-full bg-transparent ring-0 outline-none border-none focus:ring-0 text-gray-800 pb-3 pl-7 text-lg placeholder-gray-500 transition-all duration-300"
                  />
                </div>
                <div className="h-0.5 w-full bg-black/50 overflow-hidden">
                  <span className="block h-full w-full scale-x-0 origin-left bg-gradient-to-r from-secondary/60 to-secondary transition-transform duration-300 ease-out group-focus-within:scale-x-100" />
                </div>
              </motion.div>

              <motion.div
                className="group w-1/2"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.35 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <FaPhoneAlt
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-secondary transition-colors duration-300"
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    aria-label="Phone Number"
                    className="w-full bg-transparent outline-none border-none focus:ring-0 text-gray-800 pb-3 pl-7 text-lg placeholder-gray-500 transition-all duration-300"
                  />
                </div>
                <div className="h-0.5 w-full bg-black/50 overflow-hidden">
                  <span className="block h-full w-full scale-x-0 origin-left bg-gradient-to-r from-secondary/60 to-secondary transition-transform duration-300 ease-out group-focus-within:scale-x-100" />
                </div>
              </motion.div>
            </div>

            {/* Message */}
            <motion.div
              className="group"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.38 }}
              viewport={{ once: true }}
            >
              <textarea
                placeholder="Your Message"
                aria-label="Your Message"
                className="w-full h-32 resize-none bg-transparent outline-none border-none focus:ring-0 text-gray-800 pb-3 text-lg placeholder-gray-500 transition-all duration-300"
              />
              <div className="h-0.5 w-full bg-black/50 overflow-hidden">
                <span className="block h-full w-full scale-x-0 origin-left bg-gradient-to-r from-secondary/60 to-secondary transition-transform duration-300 ease-out group-focus-within:scale-x-100" />
              </div>
            </motion.div>

            {/* Subject */}
            <motion.div
              className="group"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.42 }}
              viewport={{ once: true }}
            >
              <select
                aria-label="Subject"
                className="w-full bg-transparent outline-none border-none focus:ring-0 text-gray-800 pb-3 text-lg appearance-none cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled className="text-gray-400">
                  Select Subject
                </option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject} className="text-gray-800">
                    {subject}
                  </option>
                ))}
              </select>
              <div className="h-0.5 w-full bg-black/50 overflow-hidden">
                <span className="block h-full w-full scale-x-0 origin-left bg-gradient-to-r from-secondary/60 to-secondary transition-transform duration-300 ease-out group-focus-within:scale-x-100" />
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div
              className="w-full flex justify-end pt-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
              viewport={{ once: true }}
            >
              <button
                type="submit"
                className="group inline-flex items-center hover:text-white bg-black border-white gap-3 px-4 py-2 text-white transition-all duration-200 hover:gap-4 focus:outline-none border-1 "
              >
                <span className="text-2xl  tracking-wide">Submit</span>
                <IoArrowForward className="text-xl transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Bottom text */}
      <motion.div
        className="w-full text-center py-4 border-t border-gray-100 mt-8"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.55 }}
        viewport={{ once: true }}
      >
        <p className="text-2xl font-light text-gray-600 font-[Rubik] max-w-4xl mx-auto px-6 leading-relaxed">
          Ready to explore? Contact us today, your next adventure begins here.
        </p>
      </motion.div>
    </motion.section>
  );
};

export default ContactUs;
