import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "GoCart kya hai?",
    answer: "GoCart ek digital platform hai jo street vendors, transporters aur consumers ko connect karta hai.",
  },
  {
    question: "Kaise register karein?",
    answer: "Aap 'Sign Up' page par jaakar apni category select karke easily register kar sakte hain.",
  },
  {
    question: "Delivery ka time kitna hota hai?",
    answer: "Vendors aur transporters ka depend karta hai. Generally, local delivery 30-60 minutes me ho sakti hai.",
  },
  {
    question: "Payment kaise kar sakte hain?",
    answer: "Aap cash, UPI, ya digital wallets ka use kar ke payment kar sakte hain.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 md:px-16 bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Aapke common sawalon ke jawab yahan hain!
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
            <button
              className="w-full text-left p-4 flex justify-between items-center font-medium text-lg"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? <FaMinus className="text-green-700" /> : <FaPlus className="text-green-700" />}
            </button>
            {openIndex === index && (
              <div className="p-4 border-t text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <p className="text-lg text-gray-700">Still have questions?</p>
        <a
          href="/contact"
          className="mt-4 inline-block px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default FAQSection;
