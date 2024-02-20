
const TestProducList = ({data,key}) => {
// console.log(data)


  return (
    <>
      <h1>Test Product Lsit</h1>
      <div className=" grid grid-cols-2 lg:grid-cols-4 gap-4 ">
              {data.map((product) => (
              <div
                key={key}
                className=" group relative px-2 py-2 shadow-md rounded-md flex flex-col justify-between"
              >
                {/* <Link to={`/shop/${product.id}`}> */}
                <a href={`/shop/${product.id}`}>
                  <div className="h-40 w-40 aspect-h-1 aspect-w-1  overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-48">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                </a>

                <div className="mt-4 flex flex-col">
                  <a href={`/shop/${product.id}`}>
                    <p className=" font-medium text-gray-900">
                      {product.title}
                    </p>
                  </a>
                  <p className="text-sm font-medium text-gray-900 flex items-center justify-between">
                    <span className="font-semibold text-lg">
                      ₹{product.price}
                    </span>
                    <span className="text-green-500">
                      {product.discountPercentage}% off
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
            ))}
          </div>
    </>
  );
};

export default TestProducList