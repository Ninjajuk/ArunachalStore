import React from 'react'
import { MdOutlineMailOutline,MdPhone } from "react-icons/md";
const footerNavigation = {
    products: [
      { name: 'Vegetables', href: '#' },
      { name: 'Local items', href: '#' },
      { name: 'Electronics', href: '#' },
      { name: 'Grocery', href: '#' },
      { name: 'Meat', href: '#' },
    ],
    customerService: [
      { name: 'Contact', href: '/contact-us' },
      { name: 'Shipping', href: '#' },
      { name: 'Returns', href: '#' },
      // { name: 'Warranty', href: '#' },
      // { name: 'Secure Payments', href: '#' },
      { name: 'FAQ', href: '#' },
      { name: 'Find a store', href: '/contact-us' },
    ],
    company: [
      { name: 'Who we are', href: '/about-us' },
      { name: 'Sustainability', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Terms & Conditions', href: '#' },
      { name: 'Privacy', href: '#' },
    ],
    legal: [
      { name: 'Terms of Service', href: '#' },
      { name: 'Return Policy', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Shipping Policy', href: '#' },
    ],
    bottomLinks: [
      { name: 'Accessibility', href: '#' },
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
    ],
  }

const Footer1 = () => {
  return (
    <footer aria-labelledby="footer-heading" className="bg-white">
    <h2 id="footer-heading" className="sr-only">
      Footer
    </h2>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
      <div className="">
        {/* <div className="pt-16 pb-20">
          <div className="md:flex md:justify-center">
            <img
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
              className="h-8 w-auto"
            />
            <h1 className='text-2xl text-purple-700 font-bold'>Yingkiong Store</h1>
          </div>
          <div className="mx-auto mt-16 max-w-5xl xl:grid xl:grid-cols-2 xl:gap-8">
            <div className="grid grid-cols-2 gap-8 xl:col-span-2">
              <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Products</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.products.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Customer Service</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.customerService.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Company</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Legal</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-6 xl:gap-x-8">
          <div className="flex items-center rounded-lg bg-gray-50 p-6 sm:p-10">
            <div className="mx-auto max-w-sm">
              <h3 className="font-semibold text-gray-900">Sign up for our newsletter</h3>
              <p className="mt-2 text-sm text-gray-500">
                The latest news, articles, and resources, sent to your inbox weekly.
              </p>
              <form className="mt-4 sm:mt-6 sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="text"
                  autoComplete="email"
                  required
                  className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <div className="mt-3 sm:mt-0 sm:ml-4 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="relative mt-6 flex items-center py-12 px-6 sm:py-16 sm:px-10 lg:mt-0">
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              {/* <img
                src="https://tailwindui.com/img/ecommerce-images/footer-02-exclusive-sale.jpg"
                alt=""
                className="h-full w-full object-cover object-center saturate-0 filter"
              /> */}
              <div className="absolute inset-0 bg-gray-100 " />
            </div>
            <div className="relative mx-auto max-w-sm text-center">
              <h3 className="text-2xl font-bold tracking-tight text-purple-700">Visit our store</h3>
              <ul className='text-center'>
                        <li className="mb-8">
                          <span>
                            Bentuk Village Near Baptism Church
                            <br /> Arunachal Pradesh 
                          </span>
                        </li>
                        <li className="flex items-center ">
                            <span><MdPhone/></span>
                          <span className='mx-2'>7629826114</span>
                        </li>
                        <li className="flex items-center">
                            <span><MdOutlineMailOutline/></span>
                          <span className='mx-2 '>
                            <a href='mailto:yingkiongstore@gmail.com'> yingkiongstore@gmail.com</a>
                           
                          </span>
                        </li>
                      </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 md:flex md:items-center md:justify-between">
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-500">&copy; 2024 All Rights Reserved Yingkiong Store</p>
        </div>

        <div className="mt-4 flex items-center justify-center md:mt-0">
          {/* <div className="flex space-x-8">
            {footerNavigation.bottomLinks.map((item) => (
              <a key={item.name} href={item.href} className="text-sm text-gray-500 hover:text-gray-600">
                {item.name}
              </a>
            ))}
          </div> */}
          <p className="text-sm text-gray-500 ">Designed and Coded by <span className='text-purple-800 font-extrabold text-md'>Samsuddin Ansari</span></p>

        </div>
      </div>
    </div>
    

  </footer>
  )
}

export default Footer1