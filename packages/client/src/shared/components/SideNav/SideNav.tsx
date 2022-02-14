import { useState } from "react"
import { Link } from "react-router-dom"
import getSvg from "../../functions/getSvg"
import { LinksContainer, OpenBtn, SideNavContainer } from "./SideNavStyles"
import { setTestTarget } from "../../../shared/functions/setTestTarget"

function SideNav() {
  const [active, setActive] = useState(false)
  return (
    <SideNavContainer>
      <OpenBtn
        title="Menu"
        onClick={(e) => {
          e.preventDefault()
          setActive((prev) => !prev)
        }}
        active={active}
        {...setTestTarget("nav-button")}
      >
        {getSvg("chevronRight")}
      </OpenBtn>
      <LinksContainer onClick={() => setActive(false)} active={active} {...setTestTarget("nav-container")}>
        <Link to="/">Forms</Link>
        <Link to="/create">Criar Form</Link>
      </LinksContainer>
    </SideNavContainer>
  )
}

export default SideNav
