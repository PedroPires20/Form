import {arrowDownToBracket} from "../assets/svg/arrow-down-to-bracket-solid"
import {arrowRightFromBracket} from "../assets/svg/arrow-right-from-bracket-solid"
import { arrowdown } from "../assets/svg/arrowdown"
import { arrowup } from "../assets/svg/arrowup"
import { bars } from "../assets/svg/bars"
import { chevronLeft } from "../assets/svg/chevron-left-solid"
import { chevronRight } from "../assets/svg/chevron-right-solid"
import { pencil } from "../assets/svg/pencil"
import { xmark } from "../assets/svg/xmark"

const svgs = {
  pencil,
  xmark,
  arrowdown,
  arrowup,
  arrowRightFromBracket,
  arrowDownToBracket,
  bars,
  chevronLeft,
  chevronRight,
}

export type SVGS = keyof typeof svgs

function getSvg(name: SVGS) {
  return svgs[name]
}

export default getSvg
