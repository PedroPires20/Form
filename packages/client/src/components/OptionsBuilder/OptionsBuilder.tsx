import { useState } from "react"
import { FieldWithOption } from "../../redux/modules/fields/types"
import { optionChanged } from "../../redux/modules/options/slice"
import { FieldOption } from "../../redux/modules/options/types"
import { useAppDispatch } from "../../redux/store"
import ActionButton from "../../shared/components/ActionButton/ActionButton"
import { CheckboxInput } from "../CheckboxInput/CheckboxInput"
import { Actions, OptionBuilderContainer, OptionEdit } from "./OptionsBuilderStyles"

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
        <CheckboxInput
          name={option.name}
          editing={editing}
          onEditChange={(name) => dispatch(optionChanged({ ...option, name }))}
        />
        <Actions>
          <ActionButton
            icon="pencil"
            onClick={() => setEditing((prev) => !prev)}
            tooltip="Editar opção"
          />
          <ActionButton
            icon="arrowup"
            onClick={() => setEditing((prev) => !prev)}
            tooltip="Subir opção"
          />
          <ActionButton
            icon="arrowdown"
            onClick={() => setEditing((prev) => !prev)}
            tooltip="Descer opção"
          />
          <ActionButton
            color="var(--error)"
            icon="xmark"
            onClick={() => setEditing((prev) => !prev)}
            tooltip="Deletar opção"
          />
        </Actions>
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
