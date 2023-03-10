import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Slider from "../components/Slider";
import { db } from "../firebase";

const Home = () => {
  const [offerListings, setOfferListings] = useState(null);
  const [rentListings, setRentListings] = useState(null);
  const [saleListings, setSaleListings] = useState(null);

  //listings with the offer
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  // Places for rent
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  // Places for sale
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  console.log(offerListings);
  console.log(rentListings);
  console.log(saleListings);

  return (
    <>
      <Slider />
      <div className="flex">
        <div className="max-w-6xl mx-auto pt-4 space-y-6">
          <Link to="/create-listing">
            <div className="bg-blue-500 max-w-xs mx-auto rounded-md items-center">
              <button
                type="button"
                className="w-full bg-green-500 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-green-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-green-800"
              >
                (+) Create a Listing
              </button>
            </div>
          </Link>

          <div>
            {/* Offer listings */}
            {offerListings && offerListings.length > 0 && (
              <div className="m-2 mb-6">
                <h2 className="px-3 text-2xl mt-6 font-semibold">
                  Recent offers
                </h2>
                <Link to="/offers">
                  <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                    Show more offers
                  </p>
                </Link>
                <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                  {offerListings.map((listing) => (
                    <ListingItem
                      key={listing.id}
                      listing={listing.data}
                      id={listing.id}
                    />
                  ))}
                </ul>
              </div>
            )}

            {/* Rent listings */}
            {rentListings && rentListings.length > 0 && (
              <div className="m-2 mb-6">
                <h2 className="px-3 text-2xl mt-6 font-semibold">
                  Places for rent
                </h2>
                <Link to="/category/rent">
                  <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                    Show more places for rent
                  </p>
                </Link>
                <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                  {rentListings.map((listing) => (
                    <ListingItem
                      key={listing.id}
                      listing={listing.data}
                      id={listing.id}
                    />
                  ))}
                </ul>
              </div>
            )}

            {/* Sale listings */}
            {saleListings && saleListings.length > 0 && (
              <div className="m-2 mb-6">
                <h2 className="px-3 text-2xl mt-6 font-semibold">
                  Places for sale
                </h2>
                <Link to="/category/sale">
                  <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                    Show more places for sale
                  </p>
                </Link>
                <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                  {saleListings.map((listing) => (
                    <ListingItem
                      key={listing.id}
                      listing={listing.data}
                      id={listing.id}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
