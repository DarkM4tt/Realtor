import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import ListingItem from "../components/ListingItem";

const Search = () => {
  const [listings, setListings] = useState([]);
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [isOffer, setIsOffer] = useState(false);
  const [filteredListings, setFilteredListings] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [priceRangeOptions, setPriceRangeOptions] = useState([
    { label: "₹8,000 - ₹10,000", value: "8000-10000" },
    { label: "₹10,000 - ₹12,000", value: "10000-12000" },
    { label: "₹12,000 - ₹15,000", value: "12000-15000" },
    { label: "₹15,000 - ₹18,000", value: "15000-18000" },
    { label: "₹18,000 - ₹20,000", value: "18000-20000" },
  ]);

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef);
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  const handleTypeChange = (event) => {
    setPropertyType(event.target.value);
    if (event.target.value === "rent") {
      setPriceRangeOptions([
        { label: "₹8,000 - ₹10,000", value: "8000-10000" },
        { label: "₹10,000 - ₹12,000", value: "10000-12000" },
        { label: "₹12,000 - ₹15,000", value: "12000-15000" },
        { label: "₹15,000 - ₹18,000", value: "15000-18000" },
        { label: "₹18,000 - ₹20,000", value: "18000-20000" },
      ]);
    } else if (event.target.value === "sale") {
      setPriceRangeOptions([
        { label: "Below 10000000", value: "8000-10000" },
        { label: "Greater", value: "10000-12000" },
      ]);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const filteredListings = listings.filter((listing) => {
      if (
        location &&
        !listing.data.address.toLowerCase().includes(location.toLowerCase())
      ) {
        setIsFiltered(true);
        return false;
      }

      if (priceRange) {
        const [min, max] = priceRange.split("-");
        if (
          listing.data.discountedPrice < +min ||
          listing.data.discountedPrice > +max
        ) {
          setIsFiltered(true);
          return false;
        }
      }

      if (propertyType && listing.data.type !== propertyType) {
        setIsFiltered(true);
        return false;
      }

      // if (isOffer && !listing.data.offer) {
      //   setIsFiltered(true);
      //   return false;
      // }

      if (!location && !propertyType && !priceRange) {
        setIsFiltered(false);
      }
      return true;
    });
    setFilteredListings(filteredListings);
    setLocation("");
    setPriceRange("");
    setIsOffer(false);
  };

  return (
    <div className="w-[100vw] h-[100vh]">
      {/* Searching Div */}
      <div className="flex items-center justify-center py-6">
        <form
          onSubmit={handleFilter}
          className="flex items-center justify-center bg-white p-6 rounded-xl space-x-5"
        >
          <label className="text-gray-500 w-full border-r-2">
            Location
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full font-semibold text-black border-none"
            />
          </label>
          <label className="text-gray-500 w-full border-r-2 pr-2">
            Property Type
            <select
              className="w-full block font-semibold text-black outline-none border-none"
              id="property-type"
              value={propertyType}
              // onChange={(e) => setPropertyType(e.target.value)}
              onChange={handleTypeChange}
            >
              <option value="">Select Type</option>
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </select>
          </label>
          <label className="text-gray-500 w-full border-r-2 pr-2">
            Price
            <select
              className="w-full block font-semibold text-black outline-none border-none"
              id="price-filter"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              {priceRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
              {/* <option value="">Set price</option>
              <option value="8000-10000">₹8,000 - ₹10,000</option>
              <option value="10000-12000">₹10,000 - ₹12,000</option>
              <option value="12000-15000">₹12,000 - ₹15,000</option>
              <option value="15000-18000">₹15,000 - ₹18,000</option>
              <option value="18000-20000">₹18,000 - ₹20,000</option> */}
            </select>
          </label>
          <label className="text-gray-500 w-full border-r-2 pr-1">
            Listings
            <select
              className="w-full block font-semibold text-black outline-none border-none"
              id="is-offered"
              value={isOffer}
              onChange={(e) => setIsOffer(e.target.value)}
            >
              <option value="false">All</option>
              <option value="true">In Offer</option>
            </select>
          </label>
          <button
            type="submit"
            onClick={handleFilter}
            className="bg-red-500 text-white font-semibold py-3 px-7 mt-1 rounded-xl"
          >
            Search Here
          </button>
        </form>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-3">
        <main>
          <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {isFiltered
              ? filteredListings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    id={listing.id}
                    listing={listing.data}
                  />
                ))
              : listings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    id={listing.id}
                    listing={listing.data}
                  />
                ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default Search;
