const Hows = () => {
  return (
    <div className="w-full bg-white text-gray-800 px-5 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        How can I list my properties on Breics?
      </h1>
      <p className="text-center text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-10">
        Within a few steps, you can have tenants requesting to occupy your properties.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {/* Step 1 */}
        <div className="flex-1 min-w-[220px] max-w-[300px] bg-blue-50 p-5 rounded-lg shadow-md hover:-translate-y-1 transition-transform duration-300">
          <div className="w-8 h-8 border border-black rounded flex items-center justify-center font-bold text-sm mb-3">1</div>
          <h3 className="text-lg font-semibold mb-2">Sign up</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Register on Breics and Verify your <br /> Identity.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex-1 min-w-[220px] max-w-[300px] bg-blue-50 p-5 rounded-lg shadow-md hover:-translate-y-1 transition-transform duration-300">
          <div className="w-8 h-8 border border-black rounded flex items-center justify-center font-bold text-sm mb-3">2</div>
          <h3 className="text-lg font-semibold mb-2">List & verify your Property</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Fill out the listing form, follow the prompt <br /> and verify that you have administration <br /> over the property.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex-1 min-w-[220px] max-w-[300px] bg-blue-50 p-5 rounded-lg shadow-md hover:-translate-y-1 transition-transform duration-300">
          <div className="w-8 h-8 border border-black rounded flex items-center justify-center font-bold text-sm mb-3">3</div>
          <h3 className="text-lg font-semibold mb-2">Accept Bookings</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Register on Breics and Verify your <br /> Identity.
          </p>
        </div>

        {/* Step 4 */}
        <div className="flex-1 min-w-[220px] max-w-[300px] bg-blue-50 p-5 rounded-lg shadow-md hover:-translate-y-1 transition-transform duration-300">
          <div className="w-8 h-8 border border-black rounded flex items-center justify-center font-bold text-sm mb-3">4</div>
          <h3 className="text-lg font-semibold mb-2">Sign up</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Register on Breics and Verify your <br /> Identity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hows;
