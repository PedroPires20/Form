import getSvg, { SVGS } from "../../functions/getSvg"
import { ActionButtonContainer } from "./ActionButtonStyles"

type Props = {
  icon: SVGS
  onClick: () => void
}

function ActionButton({ icon, onClick }: Props) {
  return (
    <ActionButtonContainer
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      {getSvg(icon)}
    </ActionButtonContainer>
  )
}

export default ActionButton
