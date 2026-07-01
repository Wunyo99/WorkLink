import { useState } from "react";
import { Plus, Minus } from "lucide-react";
const FaqsAccordion = () => {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);

  const toggleAccordion = (id) => {
    setActiveAccordionIndex(activeAccordionIndex === id ? null : id);
  };
  const faqs = [
    {
      id: 1,
      question: "How do I apply for a job?",
      answer:
        "Create an account, browse available job listings, and click the 'Apply Now' button on any job that matches your skills and interests.",
    },
    {
      id: 2,
      question: "How can I save jobs to view later?",
      answer:
        "Click the bookmark icon on any job listing to save it to your profile. You can access all your saved jobs anytime from the Saved Jobs section on your profile page.",
    },
    {
      id: 3,
      question: "Can I edit my profile after registering?",
      answer:
        "Yes. You can update your profile information, including your name, phone number, bio, and profile picture, from your Profile page at any time.",
    },
    {
      id: 4,
      question: "Do I need an account to view job details?",
      answer:
        "You can browse available jobs without an account, but you'll need to sign in to view detailed job information, save jobs, and submit applications.",
    },
    {
      id: 5,
      question: "How do I contact support if I have an issue?",
      answer:
        "Visit our Contact page and complete the contact form. Our support team will review your message and respond as soon as possible.",
    },
  ];
  return (
    <section>
      <h1 className="font-bold text-gray-800 text-2xl md:text-4xl mb-8 text-center">
        Frequently Asked Questions
      </h1>{" "}
      <div className="flex flex-col gap-5">
        {faqs.map((faq, id) => (
          <div
            key={faq.id}
            className={` flex flex-col border-2 w-full lg:w-180 mx-auto rounded-lg p-5 ${activeAccordionIndex === id ? "border-purple-800 " : "border-gray-200"}`}
          >
            <div className="flex justify-between gap-6">
              <p className="font-semibold text-xl">{faq.question}</p>
              <button
                className="text-purpl-800 w-8 h-8 p-2 flex items-center justify-center bg-red-100 rounded-full cursor-pointer"
                onClick={() => toggleAccordion(id)}
              >
                {activeAccordionIndex === id ? (
                  <Minus className="w-6 h-6 text-purple-800 " />
                ) : (
                  <Plus className="w-6 h-6 text-purple-800" />
                )}
              </button>
            </div>
            {activeAccordionIndex === id && (
              <div className="p-2 flex flex-col">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqsAccordion;
