import { arrowdown } from "../assets/svg/arrowdown"
import { arrowup } from "../assets/svg/arrowup"
import { bars } from "../assets/svg/bars"
import { pencil } from "../assets/svg/pencil"
import { xmark } from "../assets/svg/xmark"

const svgs = {
  pencil,
  xmark,
  arrowdown,
  arrowup,
  bars,
}

export type SVGS = keyof typeof svgs

function getSvg(name: SVGS) {
  return svgs[name]
}

export default getSvg
