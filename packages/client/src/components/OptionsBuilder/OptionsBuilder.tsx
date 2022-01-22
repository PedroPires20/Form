import { useState } from "react"
import { FieldOption, FieldWithOption } from "../../redux/modules/forms/types"
import {useAppDispatch} from "../../redux/store"
import ActionButton from "../../shared/components/ActionButton/ActionButton"
import { CheckboxInput } from "../CheckboxInput/CheckboxInput"
import { OptionBuilderContainer, OptionEdit } from "./OptionsBuilderStyles"

type Props = {
  fieldType: FieldWithOption
  options: FieldOption[]
}

type EditorProps = {
  type: FieldWithOption
  option: FieldOption
}

function OptionEditor({ type, option }: EditorProps) {
  const [editing, setEditing] = useState(false)
  const dispatch = useAppDispatch()

  const optionTypes: { [prop in FieldWithOption]: JSX.Element } = {
    checkbox: (
      <>
        <CheckboxInput name={option.name} editing={editing} onEditChange={(name) => dispatch()} />
        <ActionButton icon="pencil" onClick={() => setEditing(prev => !prev)} />
      </>
    ),
    radio: <></>,
    select: <></>,
  }

  return <OptionEdit>{optionTypes[type]}</OptionEdit>
}

function OptionsBuilder({ fieldType, options }: Props) {
  return (
    <OptionBuilderContainer>
      {options.map((option) => (
        <OptionEditor key={option.id} type={fieldType} option={option} />
      ))}
    </OptionBuilderContainer>
  )
}

export default OptionsBuilder
