import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../API/productAPI";
import DummySkeletonCategoryCard from "../skeleton/DummySkeletonCategoryCard";
import CategoryCard from "./componentsProducts/CardCategoryProduct";

const CategorySlider = ({ categoryName, apiEndpoint }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 640 ? 2 : 4);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const fetchedData = await fetchDataFromAPI(apiEndpoint);
        if (!Array.isArray(fetchedData)) {
          throw new Error("Invalid data format");
        }
        setData(fetchedData.length > 8 ? fetchedData.slice(0, 8) : fetchedData);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [apiEndpoint]);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 640 ? 2 : 4);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    const newIndex = currentIndex + itemsPerPage;
    if (newIndex < data.length) setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    const newIndex = currentIndex - itemsPerPage;
    if (newIndex >= 0) setCurrentIndex(newIndex);
  };

  const visibleCards = data.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="w-full">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 pb-4">
        <div className="flex justify-between">
          <h1 className="text-xl lg:text-2xl px-2 font-bold py-4 text-purple-800">
            {categoryName}
          </h1>

          <div className="flex items-center space-x-4">
            <button
              disabled={currentIndex === 0}
              onClick={handlePrev}
              className={`hover:rounded-full ${
                currentIndex === 0 ? "opacity-25 pointer-events-none" : "opacity-1 hover:bg-gray-400 cursor-pointer"
              }`}
            >
              <FaAngleLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex + itemsPerPage >= data.length}
              className={`cursor-pointer hover:rounded-full ${
                currentIndex + itemsPerPage >= data.length ? "opacity-25 pointer-events-none" : "opacity-1 hover:bg-gray-400 cursor-pointer"
              }`}
            >
              <FaAngleRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {error ? (
          <div className="text-red-800">Server Error: {error}</div>
        ) : (
          <p>Find the best {categoryName.toLowerCase()} for your needs.</p>
        )}

        <div className="my-4">
          {loading ? <DummySkeletonCategoryCard /> : <CategoryCard visibleCards={visibleCards} />}
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;
