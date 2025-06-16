import React from "react";
import { motion } from "framer-motion";

const SubscribeSection = () => {
  return (
    <section className="bg-neutral-900 text-white py-16 px-4 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-3">Be the First to Know</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Get Notified about Breics’ newsletter & Marketing Communication. <br />
            We promise not to spam you.
          </p>
        </motion.div>

        <motion.form
          className="flex flex-col sm:flex-row w-full max-w-md gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full px-5 py-3 rounded-lg text-black placeholder:text-gray-400 text-sm outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-b from-yellow-500 to-orange-500 text-white rounded-lg text-sm font-medium shadow-md hover:-translate-y-1 transition-transform"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default SubscribeSection;
