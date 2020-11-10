import Link from 'next/link'

export default function Nav() {
  return (
    <nav>
      <ul className="flex justify-between items-center p-8">
        <li>
          <Link href="/">
            <a className="text-xl lg:text-3xl no-underline">Home</a>
          </Link>
        </li>
        <ul className="flex justify-between items-center space-x-4">
          <li>
            <button className="bg-teal-700 hover:bg-teal-900 text-white font-normal lg:font-bold py-2 px-4 rounded-full">
              <Link href="./my-resume.pdf">Resume / CV</Link>
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
