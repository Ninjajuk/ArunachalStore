import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { Circles } from "react-loader-spinner";

const InfiniteScrollExample1 = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products?offset=0&limit=12")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  const fetchMoreData = () => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products?offset=${index}0&limit=12`)
      .then((res) => {
        setItems((prevItems) => [...prevItems, ...res.data]);

        res.data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={        <div className="flex items-center justify-center h-screen">
      <Circles
        height="80"
        width="80"
        color="#7b09e7"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>}
    >
      <div className='container'>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {items &&
            items.map((item) => <>
              <div
            
                className=" group relative px-2 py-2 shadow-md rounded-md flex flex-col justify-between"
              >
                {/* <Link to={`/shop/${product.id}`}> */}
                <a href={`/shop/${item.id}`}>
                  <div className="h-40 w-40 aspect-h-1 aspect-w-1  overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-48">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                </a>

                <div className="mt-4 flex flex-col">
                  <a href={`/shop/${item.id}`}>
                    <p className=" font-medium text-gray-900">
                      {item.title}
                    </p>
                  </a>
                  <p className="text-sm font-medium text-gray-900 flex items-center justify-between">
                    <span className="font-semibold text-lg">
                      ₹{item.price}
                    </span>
                    <span className="text-green-500">
                      {item.discountPercentage}% off
                    </span>
                  </p>
                  <div className="py-2">
                    {/* {product.category in categoryOptionsMap && (
                      <select className="block w-full p-2 border border-gray-300 rounded-md mt-1">
                        {categoryOptionsMap[product.category].map(
                          (weight, weightIndex) => (
                            <option key={weightIndex} value={weight}>
                              {weight} kg
                            </option>
                          )
                        )}
                      </select>
                    )} */}
                  </div>
                </div>

                <div className="text-center py-3 mb-3">
                  <button
                    // onClick={() => handleAddToCart(product)}
                    className={`w-full text-white bg-purple-700  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                  >
                    <span className={`inline-block w-18 `}>
                      {/* {isItemInCart(product._id, cartItems)
                        ? "Remove"
                        : "Add to Cart"} */}
                      Add
                    </span>
                  </button>
                </div>
                {/* </Link> */}
              </div>
            </>)}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollExample1;

// import React, { useEffect, useState } from 'react'
// import {getallProducts} from '../../../API/productAPI'



// import { NavLink } from 'react-router-dom';
// import {addOrRemoveFromCart,isItemInCart} from '../../../utility/cartUtils'
// import { useDispatch, useSelector } from 'react-redux';

// const categoryOptionsMap = {
//   vegetables: [1, 2, 3, 5],
//   grocery: [0.5, 1, 2],
//   // Add more categories and their options as needed
// };
// const ProducList = ({ data, uniqueCategories }) => {

//   const dispatch=useDispatch()
//   const cartItems=useSelector((state)=>state.cart)

//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');



//   const handleFilter = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleFilterSelect = (e) => {
//     setSortBy(e.target.value);
//   };


//     // Filter products based on the selected category and search term
//     const filteredProducts = data.filter((product) =>
//     (selectedCategory ? product.category === selectedCategory : true) 
//     // &&
//     // (searchTerm ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) : true)
//   );
  

//     const handleAddToCart = (product) => {
//       addOrRemoveFromCart(dispatch, product, cartItems);
//       console.log(product._id)
//     };

//   return (
//     <>


//       <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6  lg:max-w-7xl lg:px-8">
//         <div className="overflow-x-auto  bg-black rounded-lg shadow-lg">
//           <ul className="flex items-center lg:justify-center whitespace-nowrap overflow-x-auto">
//             <li className={`inline-block px-4 py-2  hover:bg-gray-600 cursor-pointer rounded-md text-gray-300 font-medium font-sans ${!selectedCategory ? 'bg-gray-600' : ''}`}onClick={() => setSelectedCategory('')}>
//               All
//             </li>
//             {uniqueCategories.map((item, index) => (
//               <li
//                 key={index}
//                 value={sortBy}
//                 onClick={() => setSelectedCategory(item)}
//                 className={`inline-block px-4 py-2  hover:bg-gray-600 cursor-pointer rounded-md text-gray-300 font-medium font-sans ${selectedCategory === item ? 'bg-gray-600' : ''}`}
//               >
//                   {item}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">
//           Customers also purchased
//         </h2> */}
//         {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {filteredProducts.slice(0, 20).map((product) => (
//             <div
//               key={product._id}
//               className="group relative px-2 py-2 shadow-md rounded-md"
//             >
     

//               <div className="w-64 h-64 aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
//                 <img
//                   src={product.thumbnail}
//                   alt={product.title}
//                   className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                 />
//               </div>

//               <div className="mt-4 flex flex-col">
//                 <p className="text-sm font-medium text-gray-900">
//                   {product.title}
//                 </p>

//                 <p className="text-sm font-medium text-gray-900 flex items-center justify-between">
//                   <span className="font-semibold text-lg">
//                     ₹{product.price}
//                   </span>
//                   <span className="text-green-500">
//                     {product.discountPercentage}% off
//                   </span>
//                 </p>
//               </div>

//               <div className="text-center py-3 mb-3">
//                 <button
//                   onClick={() =>addOrRemoveFromCart(dispatch, product, cartItems)}
//                   className={`w-full text-white bg-purple-700 hover:bg-purple-900  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
//                 >
//                   <span className={`inline-block w-18 `}>
//                     {isItemInCart(product._id, cartItems)
//                       ? "Remove"
//                       : "Add to Cart"}
            
//                   </span>
//                 </button>
//               </div>
     
//             </div>
//           ))}
//         </div> */}
//               <div className=" grid grid-cols-2 lg:grid-cols-4 gap-4 ">
//               {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className=" group relative px-2 py-2 shadow-md rounded-md flex flex-col justify-between"
//               >
//                 {/* <Link to={`/shop/${product.id}`}> */}
//                 <a href={`/shop/${product.id}`}>
//                   <div className="h-40 w-40 aspect-h-1 aspect-w-1  overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-48">
//                     <img
//                       src={product.thumbnail}
//                       alt={product.title}
//                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                     />
//                   </div>
//                 </a>

//                 <div className="mt-4 flex flex-col">
//                   <a href={`/shop/${product.id}`}>
//                     <p className=" font-medium text-gray-900">
//                       {product.title}
//                     </p>
//                   </a>
//                   <p className="text-sm font-medium text-gray-900 flex items-center justify-between">
//                     <span className="font-semibold text-lg">
//                       ₹{product.price}
//                     </span>
//                     <span className="text-green-500">
//                       {product.discountPercentage}% off
//                     </span>
//                   </p>
//                   <div className="py-2">
//                     {/* {["vegetables", "grocery"].includes(product.category) && (
//                       <select className="block w-full p-2 border border-gray-300 rounded-md mt-1">
//                         {weightOptions.map((weight, weightIndex) => (
//                           <option key={weightIndex} value={weight}>
//                             {weight} kg
//                           </option>
//                         ))}
//                       </select>
//                     )} */}
//                     {product.category in categoryOptionsMap && (
//                       <select className="block w-full p-2 border border-gray-300 rounded-md mt-1">
//                         {categoryOptionsMap[product.category].map(
//                           (weight, weightIndex) => (
//                             <option key={weightIndex} value={weight}>
//                               {weight} kg
//                             </option>
//                           )
//                         )}
//                       </select>
//                     )}
//                   </div>
//                 </div>

//                 <div className="text-center py-3 mb-3">
//                   <button
//                     onClick={() => handleAddToCart(product)}
//                     className={`w-full text-white bg-purple-700  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
//                   >
//                     <span className={`inline-block w-18 `}>
//                       {isItemInCart(product._id, cartItems)
//                         ? "Remove"
//                         : "Add to Cart"}
//                       {/* Add */}
//                     </span>
//                   </button>
//                 </div>
//                 {/* </Link> */}
//               </div>
//             ))}
//           </div>
//       </div>
//     </>
//   );
// };

// export default ProducList