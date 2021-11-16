import Head from 'next/head'
import styles from '../styles/index.module.css'

export default function IndexPage() {
  return (
    <div>
      <Head>
        <title>Ofori James Ayerakwa</title>
        
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="A Frontend developer with a strong eye for innovative design and a keen understanding of
          techniques geared toward optimum user experience. I'm passionate about continuously
          learning in the tech industry and supporting people to solve their technical problems."
        />
        <meta property="og:title" content="Ofori James Ayerakwa" />
        <meta
          property="og:description"
          content="A Frontend developer with a strong eye for innovative design and a keen understanding of
          techniques geared toward optimum user experience. I'm passionate about continuously
          learning in the tech industry and supporting people to solve their technical problems."
        />
        <meta property="og:image" content='https://ofori-james-ayerakwa.me/pictures/new-pic.jpg' />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className={`relative h-auto md:h-screen ${styles.bgImage}`}>
          <nav className="h-24 sm:h-32 text-center md:flex md:items-center md:z-30 md:w-full">
            <div className="md:container mx-auto px-6 md:flex md:items-center md:justify-between">
              <div className="uppercase text-gray-800 font-semibold text-xl pt-10 md:pt-0 md:flex md:items-center">
                Ofori James Ayerakwa
              </div>
              <div className="md:flex md:items-center hidden">
                <a 
                  href="mailto:jamesofoaye@gmail.com?subject=Hi James, Found you via your website☺"
                  target="_blank"
                  title="James' email Link"
                >
                  <div className="font-sen text-gray-800 uppercase text-sm md:text-lg flex items-center">
                    <div className="uppercase text-gray-800 md:text-3xl font-semibold flex items-center">
                      <svg width="25" height="25" viewBox="0 0 1792 1792" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1664 1504v-768q-32 36-69 66-268 206-426 338-51 43-83 67t-86.5 48.5-102.5 24.5h-2q-48 0-102.5-24.5t-86.5-48.5-83-67q-158-132-426-338-37-30-69-66v768q0 13 9.5 22.5t22.5 9.5h1472q13 0 22.5-9.5t9.5-22.5zm0-1051v-24.5l-.5-13-3-12.5-5.5-9-9-7.5-14-2.5h-1472q-13 0-22.5 9.5t-9.5 22.5q0 168 147 284 193 152 401 317 6 5 35 29.5t46 37.5 44.5 31.5 50.5 27.5 43 9h2q20 0 43-9t50.5-27.5 44.5-31.5 46-37.5 35-29.5q208-165 401-317 54-43 100.5-115.5t46.5-131.5zm128-37v1088q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1472q66 0 113 47t47 113z">
                        </path>
                      </svg>
                      <span className="text-sm md:text-xl ml-3 mt-1">
                        jamesofoaye@gmail.com
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </nav>

          <div className="flex relative items-center">
            <div className="container mx-auto px-6 flex flex-col justify-between pt-4">
              <div className="flex flex-col">
                <img 
                  src="pictures/new-pic.jpg" 
                  className="rounded-full h-40 w-40 mx-auto"
                  alt="Ofori James Ayerakwa Picture"
                />
                <h1 className="text-2xl md:text-6xl my-6 font-bold text-center">
                  Hi, I&apos;m James
                </h1>
                <p className="lg:max-w-3xl text-xl md:text-3xl mx-auto text-gray-800 text-center md:py-2 pb-4">
                  A Frontend developer with a strong eye for innovative design and a keen understanding of
                  techniques geared toward optimum user experience. I'm passionate about continuously
                  learning in the tech industry and supporting people to solve their technical problems.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 pt-16 mx-auto md:px-24 lg:px-8 lg:pt-20 lg:pb-8">
          <div className="max-w-xl mb-10 mx-auto text-center lg:max-w-2xl md:mb-12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold text-gray-900 sm:text-5xl mx-auto capitalize">
              What am i good at?
            </h2>
          </div>

          <div className="relative grid gap-8 row-gap-5 mb-8 md:row-gap-8 lg:grid-cols-7 grid-cols-3">
            <div className="absolute inset-0 md:flex items-center justify-center hidden">
              <div className="w-px h-full bg-gray-300 lg:w-full lg:h-px" />
            </div>
            <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
              <img 
                src="/tools-icons/HTML.svg" 
                className="md:h-full"
                alt="HTML logo"
              />
            </div>
            <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
              <img 
                src="/tools-icons/CSS.svg" 
                className="h-full"
                alt="CSS logo"
              />
            </div>
            <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
              <img 
                src="/tools-icons/Javascript.svg" 
                className="h-full" 
                alt="JavaScript logo"
              />
            </div>
            <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
              <img 
                src="/tools-icons/JQuery.svg" 
                className="h-full"
                alt="JQuery logo" 
              />
            </div>
            <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
              <img 
                src="/tools-icons/React.svg" 
                className="h-full"
                alt="React logo" 
              />
            </div>
            <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
              <img 
                src="/tools-icons/NextJs.svg" 
                className="h-full"
                alt="NextJs logo" 
              />
            </div>
            <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
              <img 
                src="/tools-icons/Firebase.svg" 
                className="h-full"
                alt="Firebase logo" 
              />
            </div>
          </div>
        </section>

        <section className="bg-white px-4 pb-16 mx-auto md:px-24 lg:px-8">
          <div className="mb-10 mx-auto text-center lg:max-w-2xl md:mb-12">
            <h2 className="mb-4 font-sans text-3xl font-bold text-gray-900 sm:text-5xl mx-auto capitalize">
              Where have i worked?
            </h2>
            <p className="text-2xl text-gray-900">
              Freelancing is liberating, but working for different companies surrounded by
              genius colleagues has helped me grow a lot.
            </p>
          </div>

          <div className="relative grid gap-8 row-gap-5 mb-8 md:row-gap-8 lg:grid-cols-5 sm:grid-cols-2">
            <div className="absolute inset-0 flex items-center justify-center sm:hidden lg:flex">
              <div className="w-px h-full bg-gray-300 lg:w-full lg:h-px" />
            </div>
            <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
              <img 
                src="/company-logos/seguah.jpg" 
                className="h-24 mx-auto md:h-auto"
                alt="Seguah logo"
              />
              <a 
                href="https://seguah.com" 
                target="_blank"
                title="Seguah Website Link"
              >
                <h3 className="text-center text-gray-900 py-3 text-xl font-bold">Seguah</h3>
              </a>
              <p className="text-md text-gray-900 text-center">
                Here, I worked on a book swap community web app during my internship.
              </p>
            </div>
            <div className="p-5 duration-300 transform bg-black border rounded shadow-sm hover:-translate-y-2">
              <img 
                src="/company-logos/mcat-global.svg" 
                className="mt-10 h-24 mx-auto md:h-auto"
                alt="MCAT Global logo"
              />
              <a 
                href="https://mcatglobal.com" 
                target="_blank"
                title="MCAT Global Website Link"
              >
                <h3 className="text-center text-white py-3 text-xl font-bold">
                  MCAT <span className="text-red-600">Global</span>
                </h3>
              </a>
              <p className="text-md text-white text-center">
                For MCAT Global, I developed and maintained their website.
              </p>
            </div>
            <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
              <img 
                src="/company-logos/dawurobo.png" 
                className="h-24 mx-auto md:h-auto"
                alt="Dawurobo logo"
              />
              <a 
                href="https://dawurobo.com" 
                target="_blank"
                title="Dawurobo Website Link"
              >
                <h3 className="text-center text-gray-900 py-3 text-xl font-bold">Dawurobo</h3>
              </a>
              <p className="text-md text-gray-900">
                At Dawurobo, I develop {""}
                <a 
                  href="https://safe.dawurobo.com" 
                  target="_blank" 
                  className="text-blue-600"
                  title="Dawurobo Safe Website Link"
                >
                  Dawurobo Safe,
                </a> a web app that help individuals engage in a safe transaction.
                I also maintain Dawurobo's Game and Main website.
              </p>
            </div>
            <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
              <img 
                src="/company-logos/hexlen.svg" 
                className="h-24 mx-auto md:h-auto"
                alt="Hexlen logo"
              />
              <a 
                href="https://hexlen.com" 
                target="_blank"
                title="Hexlen Website Link"
              >
                <h3 className="text-center text-gray-900 py-3 text-xl font-bold">Hexlen</h3>
              </a>
              <p className="text-md text-gray-900 text-center">
                In Hexlen, I help develop an ecommerce website and reviews frontend codes.
              </p>
            </div>
            <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
              <img 
                src="/company-logos/skinplus-medspa.png" 
                className="mt-10 h-24 mx-auto md:h-auto"
                alt="SkinPlus MedSpa logo"
              />
              <a 
                href="https://skinplusofficial.com" 
                target="_blank"
                title="SKinPlus MedSpa Website Link"
              >
                <h3 className="text-center text-gray-900 py-3 text-xl font-bold">SkinPlus Medspa</h3>
              </a>
              <p className="text-md text-gray-900 text-center">
                For SkinPlus Medspa, I developed and maintained their website.
              </p>
            </div>
          </div>
        </section>

        <footer className="bg-black">
          <div className="container mx-auto px-6 py-4">
            <div className="md:flex text-center md:justify-between md:items-center">
              <div>
                <div className="text-white">&copy; Ofori James Ayerakwa - {new Date().getFullYear()}</div>
              </div>

              <div className="flex items-center -mx-2 justify-center my-3">
                <a
                  className="flex items-center mx-2 text-white hover:text-teal-700"
                  href="https://www.linkedin.com/in/james-ayerakwa-ofori-212b9117a/"
                  target="_blank"
                  title="James' LinkedIn Profile Link"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>

                </a>

                <a
                  className="flex items-center mx-2 text-white hover:text-teal-700"
                  href="https://github.com/jamesofoaye"
                  target="_blank"
                  title="James' Github Profile Link"
                >
                  <svg className="h-5 w-5 fill-current" xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'>
                    <path
                      d='M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z' />
                  </svg>
                </a>

                <a
                  className="flex items-center mx-2 text-white hover:text-teal-700"
                  href="https://twitter.com/iamrholing"
                  target="_blank"
                  title="James' Twitter Link"
                >
                  <svg className="h-5 w-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                  </svg>
                </a>

                <a
                  className="flex items-center mx-2 text-white hover:text-teal-700"
                  href="https://api.whatsapp.com/send?phone=233555175699&text=Hello%20James%2C%20I%20found%20your%20number%20via%20your%20website."
                  target="_blank"
                  title="James' WhatsApp Link"
                >
                  <svg className="h-5 w-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>

                <a
                  className="flex items-center mx-2 text-white hover:text-teal-700"
                  href="mailto:jamesofoaye@gmail.com?subject=Hi James, Found you via your website☺"
                  target="_blank"
                  title="James' email Link"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 1792 1792" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1664 1504v-768q-32 36-69 66-268 206-426 338-51 43-83 67t-86.5 48.5-102.5 24.5h-2q-48 0-102.5-24.5t-86.5-48.5-83-67q-158-132-426-338-37-30-69-66v768q0 13 9.5 22.5t22.5 9.5h1472q13 0 22.5-9.5t9.5-22.5zm0-1051v-24.5l-.5-13-3-12.5-5.5-9-9-7.5-14-2.5h-1472q-13 0-22.5 9.5t-9.5 22.5q0 168 147 284 193 152 401 317 6 5 35 29.5t46 37.5 44.5 31.5 50.5 27.5 43 9h2q20 0 43-9t50.5-27.5 44.5-31.5 46-37.5 35-29.5q208-165 401-317 54-43 100.5-115.5t46.5-131.5zm128-37v1088q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1472q66 0 113 47t47 113z">
                    </path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
