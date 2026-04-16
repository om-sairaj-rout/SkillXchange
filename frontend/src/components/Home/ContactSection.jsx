import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { useState } from "react";
import { sendContactMessage } from "../../API/contactAPI";

const ContactSection = () => {
  const primaryOrangeBg = "bg-orange-500 hover:bg-orange-600";
  const primaryOrangeText = "text-orange-500";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendContactMessage(formData);
      alert("Message sent successfully ✅");

      // reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Contact Hero Section */}
      <section className="text-center py-1 mb-2">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Get in <span className={primaryOrangeText}>Touch</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          We'd love to hear from you! Whether you have a question, feedback, or
          just want to say hello.
        </p>
      </section>

      {/* Contact Form & Info Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 py-2">
        {/* Contact Form */}

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 outline-none"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 outline-none"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 outline-none"
                placeholder="Topic of your message"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 outline-none"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className={`w-full px-6 py-3 text-lg font-semibold text-white rounded-lg transition duration-150 ${primaryOrangeBg}`}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-100 p-8 rounded-2xl shadow-lg flex flex-col">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:omsairajraut@gmail.com"
                  className="text-orange-600 hover:underline"
                >
                  omsairajraut@gmail.com
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:+91 9319670744"
                  className="text-orange-600 hover:underline"
                >
                  +91 9319670744{" "}
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Placeholder Social Icons */}
              <a
                href="https://www.linkedin.com/in/om-sairaj-rout-4847672b9/"
                className="text-gray-500 hover:text-orange-500 text-4xl"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactSection;
