import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

import useAlert from "../hooks/useALert.jsx";
import Alert from "../Components/Alert.jsx";

const Contact = () => {
  const formRef = useRef();

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "sujata@jsmastery.pro",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: "Thank you for your message 😃",
            type: "success",
          });

          setTimeout(() => {
            hideAlert(false);
            setForm({
              name: "",
              email: "",
              message: "",
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);

          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: "danger",
          });
        }
      );
  };

  return (
    <section className="sm:px-10 px-5 my-20" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <img
          src="/assets/terminal.png"
          alt="terminal-bg"
          className="absolute inset-0 min-h-screen"
        />

        <div className="max-w-xl relative z-10 sm:px-10 px-5 mt-20 rounded-xl shadow-lg">
          <h3 className="sm:text-4xl text-3xl font-semibold text-white">Let's talk</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col space-y-7"
          >
            <label className="space-y-3">
              <span className="text-lg text-white">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 px-5 py-2 min-h-14 rounded-lg placeholder:text-gray-400 text-lg text-gray-900 shadow-black-200 shadow-2xl focus:outline-none"
                placeholder="ex., John Doe"
              />
            </label>

            <label className="space-y-3">
              <span className="text-lg text-white">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 px-5 py-2 min-h-14 rounded-lg placeholder:text-gray-400 text-lg text-gray-900 shadow-black-200 shadow-2xl focus:outline-none"
                placeholder="ex., johndoe@gmail.com"
              />
            </label>

            <label className="space-y-3">
              <span className="text-lg text-white">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-gray-100 px-5 py-2 min-h-14 rounded-lg placeholder:text-gray-400 text-lg text-gray-900 shadow-black-200 shadow-2xl focus:outline-none"
                placeholder="Share your thoughts or inquiries..."
              />
            </label>

            <button
              className="bg-gray-900 px-5 py-2 min-h-12 rounded-lg shadow-black-200 shadow-2xl flex justify-center items-center text-lg text-white gap-3"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
              <img
                src="/assets/arrow-up.png"
                alt="arrow-up"
                className="w-5 h-5"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
