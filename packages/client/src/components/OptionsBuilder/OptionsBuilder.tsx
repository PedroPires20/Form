import { MouseEvent, useState } from "react"
import { v4 } from "uuid"
import { FieldWithOption } from "../../redux/modules/fields/types"
import {
  optionAdded,
  optionChanged,
  optionDeleted,
  optionOrderChanged,
} from "../../redux/modules/options/slice"
import { FieldOption } from "../../redux/modules/options/types"
import { useAppDispatch } from "../../redux/store"
import ActionButton from "../../shared/components/ActionButton/ActionButton"
import { CheckboxInput } from "../CheckboxInput/CheckboxInput"
import { RadioInput } from "../RadioInput/RadioInput"
import {
  Actions,
  AddOption,
  OptionBuilderContainer,
  OptionEdit,
  OptionItem,
} from "./OptionsBuilderStyles"
import { setTestTarget } from "../../shared/functions/setTestTarget"

type Props = {
  fieldType: FieldWithOption
  fieldId: string
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
      <OptionItem>
        <CheckboxInput
          name={option.name}
          editing={editing}
          onEditChange={(name) => dispatch(optionChanged({ ...option, name }))}
        />
        <Actions {...setTestTarget("BF-option-actions")}>
          <ActionButton
            icon="pencil"
            onClick={() => setEditing((prev) => !prev)}
            tooltip="Editar opção"
          />
          <ActionButton
            icon="arrowup"
            onClick={() => dispatch(optionOrderChanged({ option, delta: -1 }))}
            tooltip="Subir opção"
          />
          <ActionButton
            icon="arrowdown"
            onClick={() => dispatch(optionOrderChanged({ option, delta: 1 }))}
            tooltip="Descer opção"
          />
          <ActionButton
            color="var(--error)"
            icon="xmark"
            onClick={() => dispatch(optionDeleted(option))}
            tooltip="Deletar opção"
          />
        </Actions>
      </OptionItem>
    ),
    radio: (
      <OptionItem>
        <RadioInput
          name={option.name}
          editing={editing}
          onEditChange={(name) => dispatch(optionChanged({ ...option, name }))}
        />
        <Actions {...setTestTarget("BF-option-actions")}>
          <ActionButton
            icon="pencil"
            onClick={() => setEditing((prev) => !prev)}
            tooltip="Editar opção"
          />
          <ActionButton
            icon="arrowup"
            onClick={() => dispatch(optionOrderChanged({ option, delta: -1 }))}
            tooltip="Subir opção"
          />
          <ActionButton
            icon="arrowdown"
            onClick={() => dispatch(optionOrderChanged({ option, delta: 1 }))}
            tooltip="Descer opção"
          />
          <ActionButton
            color="var(--error)"
            icon="xmark"
            onClick={() => dispatch(optionDeleted(option))}
            tooltip="Deletar opção"
          />
        </Actions>
      </OptionItem>
    ),
    select: <OptionItem></OptionItem>,
  }

  return <OptionEdit {...setTestTarget("BF-option-edit")}>{optionTypes[type]}</OptionEdit>
}

function OptionsBuilder({ fieldType, fieldId, options }: Props) {
  const dispatch = useAppDispatch()
  function handleAddOption(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    dispatch(
      optionAdded({
        id: v4(),
        fieldId: fieldId,
        name: "Insira um texto",
        value: "false",
      })
    )
  }

  return (
    <OptionBuilderContainer {...setTestTarget("BF-options")}>
      <AddOption onClick={handleAddOption} {...setTestTarget("BF-options-add")}>+ opção</AddOption>
      {options.map((option) => (
        <OptionEditor key={option.id} type={fieldType} option={option} />
      ))}
    </OptionBuilderContainer>
  )
}

export default OptionsBuilder
