import { useState } from "react"
import getSvg, { SVGS } from "../../functions/getSvg"
import { ActionButtonContainer } from "./ActionButtonStyles"
import { setTestTarget } from "../../functions/setTestTarget"

type Props = {
  icon: SVGS
  onClick: () => void
  tooltip?: string
  color?: string
  initActive?: boolean
}

function hasActiveState(icon: SVGS) {
  return ["pencil", "bars"].includes(icon)
}

function ActionButton({
  icon,
  onClick,
  tooltip,
  initActive = false,
  color = "var(--secondary)",
}: Props) {
  const [active, setActive] = useState(initActive)

  return (
    <ActionButtonContainer
      className="action-button"
      active={hasActiveState(icon) && active}
      color={color}
      title={tooltip}
      onClick={(e) => {
        e.preventDefault()
        onClick()
        setActive((prev) => !prev)
      }}
      {...setTestTarget("action-button")}
    >
      {getSvg(icon)}
    </ActionButtonContainer>
  )
}

export default ActionButton
