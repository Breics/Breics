const Rental = () => {
  return (
    <div className="w-full h-auto md:h-[250px] bg-[#2372BA] flex justify-center items-center px-4 py-10 text-center">
      <div>
        <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">
          Rental Income made easier
        </h3>
        <p className="text-white text-base md:text-lg mb-6 leading-relaxed">
          Sign up and list your property to benefit from the multi-million Naira <br className="hidden md:block" />
          worth of rental requests from the verified tenants on Breics.
        </p>
        <button className="bg-[#F89822] text-white px-6 py-2 rounded w-[200px]">
          <a href="#" className="text-white no-underline">List Your Property</a>
        </button>
      </div>
    </div>
  );
};

export default Rental;
