import { motion } from 'framer-motion'
import { FaInstagram, FaFacebook, FaTiktok, FaPhone } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import GoTopAndShare from './GoTopAndShare'
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const socialIcons = [
    { name: 'Instagram', icon: <FaInstagram />, link: '', color: 'hover:text-pink-600' },
    { name: 'Facebook', icon: <FaFacebook />, link: '', color: 'hover:text-sky-400' },
    { name: 'Tiktok', icon: <FaTiktok />, link: '', color: 'hover:text-black' },
  ]

  const quickLinks: { name: string; to: string; state?: { scrollTo: string } }[] = [
    { name: 'Home', to: '/' },
    { name: 'Destination', to: '/destinations' },
    { name: 'Hotels', to: '/hotels' },
    { name: 'Cars', to: '/cars' },
    { name: 'About Us', to: '/', state: { scrollTo: 'about' } },
    { name: 'Partner With Us', to: '/', state: { scrollTo: 'partner' } },
    { name: 'Contact', to: '/', state: { scrollTo: 'contact' } },
  ]

  return (
    <footer className="w-full bg-black  border-t bg-no-repeat border-gray-300 relative overflow-hidden">
      {/* Background image with gentle parallax */}
      <motion.img
        src="/footer_image.jpg"
        className="absolute w-full h-full object-cover brightness-40"
        initial={{ scale: 1.02 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.8 }}
        alt="footer background"
      />

      {/* decorative floating shapes */}
      <div className="pointer-events-none">
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute -left-6 top-8 w-24 h-24 bg-green-500/10 rounded-full blur-3xl" />
        <motion.div animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 8 }} className="absolute -right-6 bottom-24 w-32 h-32 bg-red-500/8 rounded-full blur-3xl" />
      </div>

      <div className="w-full flex py-10 z-100 flex-col items-center relative">
        <GoTopAndShare />
        {/* Footer Main Content */}
        <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-between  gap-12 px-6 lg:px-8">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 0, scale: 1.03 }} transition={{ type: 'spring', stiffness: 260 }} className="relative">
              <motion.img
                alt="perlica-logo"
                className="w-64"
                src="/Perlica_logo.png"
              />
            </motion.div>
            <div className="flex flex-col gap-4 text-gray-100">
              <div className="flex items-center gap-3">
                <MdEmail size={30} />
                <span className='text-md xl:text-lg'>admin@perlicatoursandtravel.com</span>
              </div>
              <div className="flex  items-center gap-3">
                <FaPhone size={30}/>
                <span className='text-xl'>
                Canadian :  0715001992
                <br />
                Kenyan :  254721452639

                </span>
              </div>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-5 items-center"
          >
            <div>
              <img
                className='w-90 hover:translate-x-3 transition-transform ease-linear duration-200'
                src="/tour-car.png" alt=""
              />
            </div>
            <div className='flex-col flex items-center '>
              <h3 className="text-4xl title-font font-bold text-red-600 mb-6">
                Follow Our Journey
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {socialIcons.map((iconDetail, index) => (
                  <motion.a
                    key={index}
                    initial={{ scale: 0, rotate: -60, opacity: 0 }}
                    whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.45, delay: index * 0.08, type: 'spring' }}
                    whileHover={{ scale: 1.18, y: -6, rotate: 0, textShadow: '0 6px 18px rgba(0,0,0,0.25)' }}
                    href={iconDetail.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={iconDetail.name}
                    aria-label={iconDetail.name}
                    className={`text-3xl text-gray-100 ${iconDetail.color} transition-all duration-300 bg-white/6 p-3 rounded-2xl shadow-md border border-white/10 backdrop-blur-sm`}
                  >
                    {iconDetail.icon}
                  </motion.a>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center lg:items-end"
          >
            <h3 className="text-3xl title-font font-bold text-red-600 mb-6">
              Quick Links
            </h3>
            <div className="flex flex-col gap-5">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 * index }}
                >
                  <Link
                    className="text-gray-100 hover:text-white text-lg font-medium transition-all duration-300 flex items-center gap-2 group"
                    to={link.to}
                    state={link.state}
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative overflow-hidden">
                      <span className="inline-block transform transition-transform duration-300 hover:text-green-400">{link.name}</span>
                      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-green-400 to-black group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Divider */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '80%' }}
          transition={{ duration: 1, delay: 0.6 }}
          className="w-4/5 h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent my-12 relative overflow-hidden"
        >
          <motion.div className="absolute inset-0 bg-gradient-to-r from-green-400 via-transparent to-red-500 opacity-20" animate={{ x: [-60, 60] }} transition={{ repeat: Infinity, duration: 6 }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full flex items-center text-center justify-center"
        >
          <h1 className="text-gray-100 w-full text-lg mb-2 flex items-center justify-center gap-3">
            <span>© {new Date().getFullYear()} Perlica Tours & Travel</span>
            <span className="text-lg text-gray-300">All rights reserved</span>
          </h1>
        </motion.div>

      </div>
    </footer>
  )
}

export default Footer