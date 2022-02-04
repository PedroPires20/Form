import { useState } from "react"
import { Link } from "react-router-dom"
import getSvg from "../../functions/getSvg"
import { LinksContainer, OpenBtn, SideNavContainer } from "./SideNavStyles"

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
      >
        {getSvg("chevronRight")}
      </OpenBtn>
      <LinksContainer onClick={() => setActive(false)} active={active}>
        <Link to="list">Forms</Link>
        <Link to="register">Registre-se</Link>
      </LinksContainer>
    </SideNavContainer>
  )
}

export default SideNav
