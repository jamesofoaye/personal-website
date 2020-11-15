import Head from 'next/head'
import Nav from '../components/nav'

export default function Portfolio() {
    return (
        <div>
            <Head>
                <title>Ofori James Ayerakwa</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://s.pageclip.co/v1/pageclip.css" media="screen"></link>
                <script src="https://s.pageclip.co/v1/pageclip.js" charset="utf-8"></script>
            </Head>

            <Nav />
            <div className="portfolio-bg">
                <span className="flex justify-center">
                    <svg className="h-12 w-16 lg:w-12 text-teal-700 ml-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                    <h2 className=" lg:text-center mt-2 text-2xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                        I'm currently working on my new portfolio. <span className="lg:hidden">You'll see all of my works soon.</span>
                    </h2>

                </span>
                <h2 className="hidden lg:block text-center mt-2 text-2xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                    You'll see all of my works soon.
                </h2>
            </div>
            <div className="text-center p-4">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
                    Keep Updated!
                </h2>
                <p className="p-4 font-light text-lg">Enter your email address and I'll let you know as soon as it's ready.</p>
                <form action="https://send.pageclip.co/ttd8Wu0NdCin8JApKZbTShVDYExnCsgA" className="pageclip-form w-full max-w-sm mx-auto" method="post">
                    <div className="flex items-center border-b border-teal-900 py-2">
                        <input id="email" name="Email" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" placeholder="Please enter your email" aria-label="Email" required />
                        <button className="pageclip-form__submit flex-shrink-0 bg-teal-700 hover:bg-teal-900 border-teal-700 hover:border-teal-900 text-base font-bold border-4 text-white py-1 px-2 rounded" type="submit">
                            <span>Notify Me</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
