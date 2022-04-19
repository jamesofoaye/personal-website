export default function ProjectCard({className, link, title, image, description,}) {
  return (
    <div className={`${className} block overflow-hidden rounded-2xl`}>
        <img className="object-cover w-full h-56" src={image} alt={title} />

        <div className="p-4 bg-gray-900">
          <a 
            className="text-md text-gray-400 cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
            href={link}
            title={title}
          >
            {link}
          </a>

          <h2 className="text-lg text-white">{title}</h2>

          <p className="mt-1 text-md text-gray-400">{description}</p>
        </div>
    </div>
  )
}