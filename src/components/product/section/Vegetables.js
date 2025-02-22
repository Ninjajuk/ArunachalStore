import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../API/productAPI";
import CategoryCard from "../componentsProducts/CardCategoryProduct";
import LoaderCircle from "../../common/LoaderCircle";
import DummySkeletonCategoryCard from "../../skeleton/DummySkeletonCategoryCard";

const Vegetables = () => {
  const [currentindex, setCurrentindex] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [itemsPerpage, setItemsPerPage] = useState(4); // Default to 4

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const vegData = await fetchDataFromAPI("vegetables");
        if (!Array.isArray(vegData)) throw new Error("Invalid data format");
        setData(vegData.length > 8 ? vegData.slice(0, 8) : vegData);
      } catch (error) {
        setError("Error in fetching data");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  // Adjust itemsPerpage based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 640 ? 2 : 4); // 2 items for small screens, 4 for larger screens
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const handleNext = () => {
    if (currentindex + itemsPerpage < data.length) {
      setCurrentindex(currentindex + itemsPerpage);
    }
  };

  const handlePrev = () => {
    if (currentindex - itemsPerpage >= 0) {
      setCurrentindex(currentindex - itemsPerpage);
    }
  };

  const visibleCards = data.slice(currentindex, currentindex + itemsPerpage);

  return (
    <section className="w-full">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 pb-4">
        <div className="flex justify-between">
          <h1 className="text-xl lg:text-2xl px-2 font-bold py-4 text-purple-800">
            Vegetables
          </h1>

          <div className="flex items-center space-x-4">
            <button
              disabled={currentindex === 0}
              onClick={handlePrev}
              className={`hover:rounded-full ${
                currentindex === 0
                  ? "opacity-25 pointer-events-none"
                  : "opacity-1 hover:bg-gray-400 cursor-pointer"
              }`}
            >
              <FaAngleLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentindex + itemsPerpage >= data.length}
              className={`cursor-pointer hover:rounded-full ${
                currentindex + itemsPerpage >= data.length
                  ? "opacity-25 pointer-events-none"
                  : "opacity-1 hover:bg-gray-400 cursor-pointer"
              }`}
            >
              <FaAngleRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {error ? (
          <div className="text-red-800">Server Error: {error}</div>
        ) : (
          <p>Find fresh and organic vegetables for your meals.</p>
        )}

        <div className="my-4">
          {loading ? (
            <DummySkeletonCategoryCard />
          ) : error ? (
            <div className="text-red-800 flex items-center justify-center">
              Server Error: {error}
            </div>
          ) : (
            <CategoryCard visibleCards={visibleCards} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Vegetables;
