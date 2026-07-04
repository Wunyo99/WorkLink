import { MdMail } from "react-icons/md";
import { MapPin, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import FaqsAccordion from "../../components/FaqsAccordion";
const Contact = () => {
  return (
    <>
      <section className="section-padding">
        <div className="text-center">
          <h1 className="font-bold text-gray-800 text-3xl md:text-5xl mb-2">
            Contact Us
          </h1>
          <p className="text-gray-500 font-medium">
            {" "}
            We'd love to hear from you.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center md:flex-row gap-8 py-12">
          <div className="w-60 py-5 border-2 border-gray-200 hover:border-purple-800 rounded-2xl shadow-lg flex flex-col items-center gap-3 justify-center duration-200">
            <MdMail size={35} className="text-purple-800" />
            <p className="font-medium text-gray-800">worklink@gmail.com</p>
          </div>
          <div className="w-60 py-5 border-2 border-gray-200 hover:border-purple-800 rounded-2xl shadow-lg flex flex-col gap-3 items-center justify-center duration-200">
            <Phone size={35} className="text-purple-800" />
            <p className="font-medium text-gray-800">(+233) 245 494 534</p>
          </div>
          <div className="w-60 py-5 border-2 border-gray-200 hover:border-purple-800 rounded-2xl shadow-lg flex flex-col gap-3 items-center justify-center duration-200">
            <MapPin size={35} className="text-purple-800" />
            <p className="font-medium text-gray-800">Accra, Ghana</p>
          </div>
        </div>
      </section>
      <section>
        <ContactForm />
      </section>
      <section className="section-padding">
        <div>
          <FaqsAccordion />
        </div>
      </section>
    </>
  );
};

export default Contact;
