import React, { useState } from "react";
import "../styles/Accordion.css";

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
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h5>GAIN MORE CLARITY</h5>
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <span>{faq.question}</span>
              <span className="faq-icon">{activeIndex === index ? "−" : "+"}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
