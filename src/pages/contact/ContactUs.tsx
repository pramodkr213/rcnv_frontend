const ContactUs = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-8 lg:px-16" id="contact">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-8 border-b-2 border-blue-500 inline-block">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-3 items-start">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">Address</h3>
            <p className="text-gray-600 leading-relaxed">
              Plor 17/1, Amar Plaza,
              <br />
              Salt Lake SMS India Road,
              <br />
              IT Park Rd., Beside Persistent,
              <br />
              Nagpur, Maharashtra - 440022
            </p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700">Email</h3>
              <p className="text-gray-600">info@yourcompany.com</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
              <p className="text-gray-600">+91 9923587842</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
