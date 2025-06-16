import React from 'react';
import bedroomImg from '../image/bedroom.jpg';
import keyImg from '../image/key.jpg';
import { FaSearch, FaCalendarAlt, FaCreditCard, FaTools } from 'react-icons/fa';
import { motion } from 'framer-motion';

const benefitVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: 'easeOut' },
  }),
};

const RentWithBreics = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-10 items-start px-5 md:px-10 py-12 bg-white text-[#0e010162] rounded-2xl overflow-hidden">
      
      {/* Text Content */}
      <div className="flex-1">
        <p className="text-xs uppercase text-gray-400 mb-2">Limitless Benefits</p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#fca311] mb-4">Rent with Breics</h2>
        <p className="text-base leading-relaxed mb-6">
          Think of it, finding and managing a property these days is a lot of work.
          Let Breics help you manage all of that the way you'd love.
        </p>

        {/* Benefits with animation */}
        <div className="space-y-6">
          {[ 
            { icon: <FaSearch />, title: "Search your preferred property", text: "Select from a wide range of vetted properties in our extensive and robust catalogue." },
            { icon: <FaCalendarAlt />, title: "Book for Inspection", text: "Make reservations to physically visit or opt for a virtual tour from anywhere." },
            { icon: <FaCreditCard />, title: "Pay for a property", text: "Make secure payments for properties of your choice with a flexible plan." },
            { icon: <FaTools />, title: "Manage your property", text: "Track, manage and organize your rent, amenities and enquiries in one place." }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              variants={benefitVariants}
            >
              <div className="text-[#fca311] text-xl mt-1">{item.icon}</div>
              <div>
                <h4 className="text-base font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Section with animation */}
      <motion.div
        className="flex-1 relative w-full lg:w-auto mt-10 lg:mt-0"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <img
          src={bedroomImg}
          alt="Property bedroom"
          className="w-full rounded-xl shadow-xl"
        />
        <motion.img
          src={keyImg}
          alt="Key handover"
          className="hidden sm:block absolute lg:bottom-[-20px] lg:left-5 w-4/5 max-w-[220px] rounded-lg border-4 border-white shadow-2xl sm:static sm:mt-6 sm:mx-auto lg:mt-0"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        />
      </motion.div>
    </section>
  );
};

export default RentWithBreics;
