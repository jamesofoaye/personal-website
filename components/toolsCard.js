export default function ToolsCard({className, toolsTitle, logo}) {
  return (
    <div className={`${className} p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2`}>
        <img 
            src={logo} 
            className={className}
            alt={toolsTitle}
        />
    </div>
  )
}
