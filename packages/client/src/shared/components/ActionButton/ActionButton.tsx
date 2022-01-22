import {useState} from "react"
import getSvg, { SVGS } from "../../functions/getSvg"
import { ActionButtonContainer } from "./ActionButtonStyles"

type Props = {
  icon: SVGS
  onClick: () => void
  tooltip?: string
}

function hasActiveState(icon: SVGS) {
  return ["pencil", "bars"].includes(icon)
}

function ActionButton({ icon, onClick, tooltip }: Props) {
  const [active, setActive] = useState(false)
  
  return (
    <ActionButtonContainer
      className="action-button"
      active={hasActiveState(icon) && active}
      title={tooltip}
      onClick={(e) => {
        e.preventDefault()
        onClick()
        setActive(prev => !prev)
      }}
    >
      {getSvg(icon)}
    </ActionButtonContainer>
  )
}

export default ActionButton
