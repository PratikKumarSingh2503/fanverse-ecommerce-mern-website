import React from 'react';

const Clients = () => {
  return (
    <div className="p-6 bg-gray-100">
      {/* Subscription Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide text-gray-800">
            {Array.from("SUBSCRIBE NOW").map((letter, index) => (
              <span
                key={index}
                className="inline-block m-1 p-2 rounded-md bg-gray-300 text-gray-800"
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>
        <p className="text-gray-700 mb-6">
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit..." <br />
          "There is no one who loves pain itself, who seeks after it and wants
          to have it, simply because it is pain..."
        </p>
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <input
            type="hidden"
            name="access_key"
            value="b207f59b-f227-43e6-8dc5-e7f4de80eed8"
          />
          <input
            type="email"
            name="email"
            placeholder="abc123@gmail.com"
            required
            className="w-full sm:w-auto px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-green-700 text-white hover:bg-green-600 transition-all"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Client Section */}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Our Happy Clients
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {["client1.webp", "client2.png", "client3.png", "client4.png"].map(
            (client, index) => (
              <img
                key={index}
                src={require(`../Image/Client/${client}`)} // Adjust path as needed
                alt={`Client ${index + 1}`}
                className="w-36 h-36 md:w-48 md:h-48 object-cover rounded-full border border-gray-300 shadow-lg"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;