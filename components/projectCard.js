export default function ProjectCard({className, projectLink, title, image, description,}) {
  return (
    <div className={`${className} block overflow-hidden rounded-2xl`}>
        <img className="object-cover w-full h-56" src={image} alt={title} />

        <div className="p-4 bg-gray-900">
            <p className="text-xs text-gray-500">{projectLink}</p>

            <h5 className="text-sm text-white">{title}</h5>

            <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>
    </div>
  )
}