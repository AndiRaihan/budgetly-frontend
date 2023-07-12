

function SideNav({show}: SideNavProps) {
  return (
    <nav className={` top-18 left-0 h-full w-52 fixed bg-background-light-300 ${show? " -translate-x-full" : "translate-x-0"} ease-in-out duration-200`} >
        
    </nav>
  )
}

type SideNavProps = {
    show: boolean
}

export default SideNav