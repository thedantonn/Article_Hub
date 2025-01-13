'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {  signOut } from "firebase/auth";
import { auth } from '../utils/firebase'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const user = useSelector((store) => store?.user)
  console.log(user)
  const navigate = useNavigate()

  const handleSignout = () => {
    signOut(auth).then(() => {
        navigate("/login")
      }).catch((error) => {
      });
}
  return (
    <header className="bg-gray-100">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to={"/browse"} className="-m-1.5 p-1.5">
            <img
              alt="logo"
              src="https://www.pngfind.com/pngs/m/564-5646320_hd-png-psd-free-download-ah-logo-graphic.png"
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <h1 className='text-3xl font-bold'><span className='text-blue-400 text-4xl'>A</span>rticle<span className='text-orange-500 text-4xl'>H</span>ub</h1>
        </PopoverGroup>
        {!user ? (<div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to={"/login"} className="text-sm/6 font-semibold text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>) : (<div className="hidden lg:flex lg:flex-1 lg:justify-end"><button onClick={handleSignout} className='text-sm/6 font-semibold text-gray-900'>Logout</button></div>)}
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Article Hub</span>
              <img
                alt="logo"
                src="https://www.pngfind.com/pngs/m/564-5646320_hd-png-psd-free-download-ah-logo-graphic.png0"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Product 
                  </DisclosureButton>
                </Disclosure>
              </div>
              <div className="py-6">
              <Link to={"/login"}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
