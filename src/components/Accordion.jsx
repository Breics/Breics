import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "How long does it take to get a home",
    answer:
      "Getting a home on Breics is very easy and quick depending on your choice. When you book an inspection and you're pleased with the listing, we place resources you're getting for. When payment has been made and you’ve been duly vetted, you’re onboard.",
  },
  {
    question: "Do I need to pay before making an inspection?",
    answer: "No, inspection is free. Payment is only required after you choose a property.",
  },
  {
    question: "Does Breics handle house disputes during the course of my rent?",
    answer: "Yes, Breics provides mediation support if disputes arise between tenants and landlords.",
  },
  {
    question: "For Shared Spaces, are the co-tenants vetted too?",
    answer: "Yes, all co-tenants are thoroughly vetted to ensure a safe and trustworthy environment.",
  },
  {
    question: "Is installment payments allowed?",
    answer: "Yes, we offer flexible installment plans depending on the property and landlord agreement.",
  },
];

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white w-full py-12 px-4 md:px-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <motion.h5
          className="text-gray-400 uppercase text-sm tracking-widest mb-2"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Gain more clarity
        </motion.h5>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              onClick={() => toggleFAQ(index)}
              className={`border rounded-lg cursor-pointer overflow-hidden transition-colors ${
                activeIndex === index
                  ? 'bg-gray-200 text-black border-gray-300'
                  : 'bg-black text-white border-gray-700'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center p-5 text-lg font-semibold">
                <span>{faq.question}</span>
                <span className="text-xl">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </div>

              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    className="px-5 pb-5 text-sm text-gray-700"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
