import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { FaSpinner } from "react-icons/fa";
import UserDashboard from './usercomponents/UserDashboard'
import Navbar1 from '../Navbar/NavbarDark'
import { useSelector } from 'react-redux'
import { chooseColor, chooseStyle, getDate } from '../../utility/orderhelper'
import { BASE_URL } from '../../constants'


// const orders = [
//   {
//     number: 'WU88191111',
//     href: '#',
//     invoiceHref: '#',
//     createdDate: 'Jul 6, 2021',
//     createdDatetime: '2021-07-06',
//     deliveredDate: 'July 12, 2021',
//     deliveredDatetime: '2021-07-12',
//     total: '160.00',
//     products: [
//       {
//         id: 1,
//         name: 'Micro Backpack',
//         description:
//           'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
//         href: '#',
//         price: '70.00',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg',
//         imageAlt:
//           'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
//       },
//       {
//         id: 1,
//         name: 'Micro Backpack',
//         description:
//           'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
//         href: '#',
//         price: '70.00',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg',
//         imageAlt:
//           'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
//       },
//       {
//         id: 1,
//         name: 'Micro Backpack',
//         description:
//           'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
//         href: '#',
//         price: '70.00',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg',
//         imageAlt:
//           'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
//       },
//       // More products...
//     ],
//   },
//   // More orders...
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function OrderHistoryInvoicePanel() {


  const [order,setOrder]=useState([])
 

  useEffect(()=>{
    const fetchuserOrder=async()=>{
      const token = JSON.parse(localStorage.getItem('userData')).userToken;

      try {
 
        const resp=await fetch(`${BASE_URL}/orders`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data=await resp.json()
        console.log(data)
        // setOrder(data.orders)
        setOrder(data.orders.reverse());
        
      } catch (error) {
        console.error('Error fetching order',error.message)

      }

    }
    fetchuserOrder()
  },[])
  // console.log('order',order)
  // const { colorClass, iconClass } = chooseStyle(order.status);
  const style = chooseStyle(order.status); // Get the style object
  return (
    <>
      <Navbar1 />
      <div className="bg-white w-full overflow-y-auto">
        <div className="py-2">
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Order history
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Check the status of recent orders, manage returns, and discover
                similar products.
              </p>
            </div>
          </div>

          {order ? (
            <div className="mt-16">
              <h2 className="sr-only">Recent orders</h2>
              <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
                <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                  {order.map((order) => (
                    <div
                      key={order.number}
                      className="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                    >
                      <h3 className="sr-only">
                        Order placed on{" "}
                        <time dateTime={order.createdDatetime}>
                          {order.createdDate}
                        </time>
                      </h3>

                      <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                        <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                          <div>
                            <dt className="font-medium text-gray-900">
                              Order number
                            </dt>
                            <dd className="mt-1 text-gray-500">
                              {order.orderId}
                            </dd>
                          </div>
                          <div className="hidden sm:block">
                            <dt className="font-medium text-gray-900">
                              Date placed
                            </dt>
                            <dd className="mt-1 text-gray-500">
                              {/* <dd className="mt-1 text-gray-500">{order.date}</dd> */}
                              <dd className="mt-1 text-gray-500">
                                {getDate(order.createdAt)}
                              </dd>
                              {/* <time dateTime={order.createdDatetime}>{order.createdDate}</time> */}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-900">
                              Total amount
                            </dt>
                            <dd className="mt-1 font-medium text-gray-900">
                              ₹{order.totalAmount}
                            </dd>
                          </div>
                        </dl>

                        <Menu
                          as="div"
                          className="relative flex justify-end lg:hidden"
                        >
                          <div className="flex items-center">
                            <Menu.Button className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                              <span className="sr-only">
                                Options for order {order.orderId}
                              </span>
                              {/* <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" /> */}
                            </Menu.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            {/* <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href={order.href}
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                View
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href={order.invoiceHref}
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                Invoice
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items> */}
                          </Transition>
                        </Menu>

                        <div className=" lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                          {/* <a
                      href={order.href}
                      className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span>View Order</span>
                      <span className="sr-only">{order.orderId}</span>
                    </a>
                    <a
                      href={order.invoiceHref}
                      className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span>View Invoice</span>
                      <span className="sr-only">for order {order.orderId}</span>
                    </a> */}
                          {order.status === "delivered" ? (
                            <div className="flex items-center">
                              <CheckCircleIcon
                                className="h-5 w-5 text-green-500"
                                aria-hidden="true"
                              />
                              <p className="ml-2 text-sm font-medium text-gray-500">
                                Delivered on{" "}
                                <span>{getDate(order.updatedAt)}</span>
                                {/* <time dateTime={order.deliveredDatetime}>{order.updatedAt}</time> */}
                              </p>
                            </div>
                          ) : (
                            <div className={`mt-1 font-medium text-gray-900 flex items-center ${chooseStyle(order.status).colorClass}`}>
                            {chooseStyle(order.status).icon}
                            <span className="pl-2 text-sm">{order.status}</span>
                          </div>
                          )}
                        </div>
                      </div>

                      {/* Products */}
                      <h4 className="sr-only">Items</h4>
                      <ul role="list" className="divide-y divide-gray-200">
                        {order.items.map((product) => (
                          <li key={product.id} className="p-4 sm:p-6">
                            <div className="flex items-center sm:items-start">
                              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                                <img
                                  src={product.product.thumbnail}
                                  alt={product.imageAlt}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="ml-6 flex-1 text-sm">
                                <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                  <h5>{product.product.name}</h5>
                                  <p className="mt-2 sm:mt-0">
                                    ₹{product.product.price}
                                  </p>
                                </div>
                                <p className="hidden text-gray-500 sm:mt-2 sm:block">
                                  {product.product.description}
                                </p>
                              </div>
                            </div>

                            {/* <div className="mt-6 sm:flex sm:justify-between">
                        <div className="flex items-center">
                          <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                          <p className="ml-2 text-sm font-medium text-gray-500">
                            Delivered on
                            <span className="mt-1 font-medium text-gray-900">{order.status}</span>
                             <time dateTime={order.deliveredDatetime}>{order.deliveredDate}</time>
                          </p>
                        </div>

                        <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                          <div className="flex flex-1 justify-center">
                            <a
                              href={product.href}
                              className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                            >
                              View product
                            </a>
                          </div>
                          <div className="flex flex-1 justify-center pl-4">
                            <a href="#" className="whitespace-nowrap text-indigo-600 hover:text-indigo-500">
                              Buy again
                            </a>
                          </div>
                        </div>

                      </div> */}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>You do not have Order yet from Yingkiong store</p>
          )}
        </div>
      </div>
    </>
  );
}