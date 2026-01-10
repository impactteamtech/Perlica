import { IoArrowForward } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { useState, type JSX } from "react";
import { toast } from "react-hot-toast";
import PingDot from "../AboutUs/PingDot";

interface ContactFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

const ContactUs = (): JSX.Element => {
  const subjects = [
    "General Inquiry",
    "Support",
    "Partnership",
    "Booking",
    "Feedback",
    "Other",
  ];

  const backendBaseUrl = import.meta.env.VITE_BACKEND_URL || "https://perlica-backend.onrender.com";

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";

    if (formData.phoneNumber.trim() && !/^\+?[\d\s\-()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${backendBaseUrl}/send-contact-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let message = "We could not submit your message. Please try again.";
        try {
          const errorBody = await response.json();
          if (typeof errorBody?.detail === "string") {
            message = errorBody.detail;
          } else if (Array.isArray(errorBody?.detail)) {
            message = errorBody.detail
              .map((entry: unknown) => {
                if (typeof entry === "string") return entry;
                if (entry && typeof entry === "object" && "msg" in entry) {
                  return (entry as { msg: string }).msg;
                }
                return "";
              })
              .filter(Boolean)
              .join(", ");
          }
        } catch (parseError) {
          console.error("Failed to parse contact error response", parseError);
        }
        throw new Error(message);
      }

      toast.success("Thank you! We have received your message.");
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error submitting your message.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact-section"
      className="relative px-6 lg:px-15 overflow-hidden scroll-mt-32"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="flex items-center  gap-2"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        viewport={{ once: true }}
      >
        <PingDot />
        <h4 className="text-lg md:text-2xl w-[40%] md:w-[25%] lg:w-[10%] title-font font-medium ">CONTACT US</h4>
        <div className="w-[60%] md:w-[75%] lg:w-[90%] h-[1px] bg-black " />
      </motion.div>

      <div className="flex gap-3 flex-wrap lg:flex-nowrap justify-between   py-16 relative z-10">
        {/* Left content */}
        <motion.div
          className="w-full lg:w-[48%] "
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl 2xl:text-6xl color-primary font-mono title-font leading-tight">
              LET'S
              <br />
              GET IN TOUCH
              <br />
              <span className="font-light text-black">AND COLLABORATE</span>
            </h1>
            <p className="text-font">
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
                <p className="text-lg font-[Rubik]">A dedicated team you can rely on</p>
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
          <form className="p-6 md:p-8 flex flex-col  gap-8" onSubmit={handleSubmit}>
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
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
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
                name="message"
                value={formData.message}
                onChange={handleChange}
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
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                aria-label="Subject"
                className="w-full bg-transparent outline-none border-none focus:ring-0 text-gray-800 pb-3 text-lg appearance-none cursor-pointer"
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
                disabled={isSubmitting}
                className="group inline-flex items-center hover:text-white bg-black border-white gap-3 px-4 py-2 text-white transition-all duration-200 hover:gap-4 focus:outline-none border-1 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="text-2xl  tracking-wide">
                  {isSubmitting ? "Sending..." : "Submit"}
                </span>
                <IoArrowForward className="text-xl transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Bottom text */}
      <motion.div
        className="w-full text-center py-4 border-t border-gray-100 mt-8 md:mt-1"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.55 }}
        viewport={{ once: true }}
      >
        <p className="text-2xl font-light text-gray-600 font-[Rubik] max-w-4xl mx-auto px-6 leading-relaxed">
          Your next adventure with Perlica starts now! Contact us today and get ready to explore.
        </p>
      </motion.div>
    </motion.section>
  );
};

export default ContactUs;
