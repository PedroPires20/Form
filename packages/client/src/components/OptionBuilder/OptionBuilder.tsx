import { FieldOption, FieldTypes } from "../../redux/modules/forms/types"
import { OptionBuilderContainer } from "./OptionBuilderStyles"

type Props = {
  fieldType: FieldTypes
  options: FieldOption[]
}

function OptionBuilder({}: Props) {
  return <OptionBuilderContainer></OptionBuilderContainer>
}

export default OptionBuilder
