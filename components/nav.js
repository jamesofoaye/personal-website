import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
  return (
    <nav>
      <ul className="lg:flex lg:justify-between lg:items-center p-2">
        <li className="lg:hidden">
          <Link href="/" >
            <Image
              src="/my-logo.jpg"
              alt="My Logo"
              width={250}
              height={70}
              layout="responsive"
            />
          </Link>
        </li>
        <li className="hidden lg:block lg:pl-2">
          <Link href="/" >
            <Image
              src="/my-logo.jpg"
              alt="My Logo"
              width={250}
              height={70}
            />
          </Link>
        </li>
        <ul className="flex justify-between items-center space-x-4 px-12 pb-8 lg:p-6">
          <li>
            <button className="bg-teal-700 hover:bg-teal-900 text-white font-normal lg:font-bold py-2 px-4 rounded-full">
              <Link href="./Ofori James Ayerakwa Resume.pdf">Resume / CV</Link>
            </button>
          </li>
          <li>
            <button className="bg-teal-700 hover:bg-teal-900 text-white font-normal lg:font-bold py-2 px-4 rounded-full">
              <Link href="./portfolio">Portfolio</Link>
            </button>
          </li>
        </ul>
      </ul>
    </nav>
  )
}
