import Head from 'next/head'
import Nav from '../components/nav'
import Link from 'next/link'
import styles from '../styles/index.module.css'

export default function IndexPage() {
  return (
    <div>
      <Head>
        <title>Ofori James Ayerakwa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`relative h-screen ${styles.bgImage}`}>
        <nav className="h-24 sm:h-32 flex items-center z-30 w-full">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="uppercase text-gray-800 font-semibold text-xl flex items-center">
              Ofori James Ayerakwa
            </div>
            <div className="flex items-center">
              <a href="mailto:jamesofoaye@gmail.com?subject=Hi James, Found you via your website☺">
                <div className="font-sen text-gray-800 uppercase text-lg flex items-center">
                  <div className="uppercase text-gray-800 text-3xl font-semibold flex items-center">
                    <svg width="25" height="25" viewBox="0 0 1792 1792" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1664 1504v-768q-32 36-69 66-268 206-426 338-51 43-83 67t-86.5 48.5-102.5 24.5h-2q-48 0-102.5-24.5t-86.5-48.5-83-67q-158-132-426-338-37-30-69-66v768q0 13 9.5 22.5t22.5 9.5h1472q13 0 22.5-9.5t9.5-22.5zm0-1051v-24.5l-.5-13-3-12.5-5.5-9-9-7.5-14-2.5h-1472q-13 0-22.5 9.5t-9.5 22.5q0 168 147 284 193 152 401 317 6 5 35 29.5t46 37.5 44.5 31.5 50.5 27.5 43 9h2q20 0 43-9t50.5-27.5 44.5-31.5 46-37.5 35-29.5q208-165 401-317 54-43 100.5-115.5t46.5-131.5zm128-37v1088q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1472q66 0 113 47t47 113z">
                      </path>
                    </svg>
                    <span className="text-xl ml-3 mt-1">
                      jamesofoaye@gmail.com
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </nav>

        <div className="flex relative z-20 items-center">
          <div className="container mx-auto px-6 flex flex-col justify-between items-center relative pt-4">
            <div className="flex flex-col">
              <img src="/new-pic.jpg" className="rounded-full h-40 w-40 mx-auto" />
              <p className="text-6xl my-6 font-bold text-center">
                Hi, I&apos;m James
              </p>
              <p className="max-w-3xl text-3xl mx-auto text-gray-800 text-center py-2">
                A Frontend developer with a strong eye for innovative design and a keen understanding of
                techniques geared toward optimum user experience. I'm passionate about continuously
                learning in the tech industry and supporting people to solve their technical problems.
              </p>
            </div>
          </div>
        </div>
      </main>


      {/**<div className="max-w-4xl flex items-center flex-wrap mx-auto lg:my-0 lg:pb-12">
        <div className="w-full  lg:w-2/5">
          <img src="./mypic.jpg" className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" />
        </div>
        <div className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl opacity-75 mx-6 mt-8 lg:mt-0 lg:mx-0">
          <div className="p-4 md:p-12 text-center lg:text-left">
            <div className="image-for-mobile-view block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center">
              <style jsx>
                {`
                  .image-for-mobile-view {
                    background-image: url('./mypic1.jpg');
                  }
                  `
                }
              </style>
            </div>
            <h1 className="text-3xl font-bold pt-8 lg:pt-0">Ofori James Ayerakwa</h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-teal-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg className="h-4 fill-current text-teal-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" /></svg> Student &amp; Front end Developer</p>
            <p className="pt-2 text-gray-600 text-base lg:text-sm flex items-center justify-center lg:justify-start"><svg className="h-4 fill-current text-teal-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" /></svg> Ashaiman, Ghana</p>
            <p className="pt-8 text-base">I'm passionate about continuously learning in the tech industry and supporting people to solve their
            technical problems. I'm a self-taught Frontend developer who develops application with HTML, CSS,
            JavaScript (React.js). I volunteer at a non-profit organization called The Ladies Empowerment
            Foundation (LEMP's Foundation Ghana) as their Chief Technology Officer (C.T.O). Recently completed
            the Google IT Support Professional Certificate. I'm currently enrolled in the Google IT Automation with
            Python professional certificate.</p>
            

            <div className="pt-12 pb-8">
              <button className="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded-full">
                <Link href="mailto:jamesofoaye@gmail.com" target="_blank">Get In Touch via Email</Link>
              </button>
            </div>

            <div className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between">
              <button>
                <a href="https://web.facebook.com/james.ayerakwa.7/" target="_blank">
                  <svg className="h-6 fill-current text-gray-600 hover:text-teal-700" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0" />
                  </svg>
                </a>
              </button>
              <button>
                <a href="https://twitter.com/iamrholing" target="_blank">
                  <svg className="h-6 fill-current text-gray-600 hover:text-teal-700" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                  </svg>
                </a>
              </button>
              <button>
                <a href="https://github.com/jamesofoaye" target="_blank">
                  <svg className="h-6 fill-current text-gray-600 hover:text-teal-700" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              </button>
              <button>
                <a href="https://api.whatsapp.com/send?phone=233555175699&text=Hello%20James%2C%20I%20found%20your%20number%20via%20your%20website." target="_blank">
                  <svg className="h-6 fill-current text-gray-600 hover:text-teal-700" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </button>
              <button>
                <a href="https://www.linkedin.com/in/james-ayerakwa-ofori-212b9117a/" target="_blank">
                  <svg className="h-6 fill-current text-gray-600 hover:text-teal-700" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </button>
            </div>
          </div>
        </div>
              </div>*/
      }
    </div>
  )
}
