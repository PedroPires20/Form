import { useEffect, useState } from "react"
import {
  Actions,
  AddDescription,
  Description,
  DescriptionContainer,
  DescriptionDisplay,
  DescriptionEdit,
  FieldBuilderContainer,
  Label,
  LabelDisplay,
  LabelEdit,
} from "./FieldBuilderStyles"
import { TextInput } from "../TextInput/TextInput"
import { Field } from "../../redux/modules/forms/types"
import { useAppDispatch } from "../../redux/store"
import ActionButton from "../../shared/components/ActionButton/ActionButton"
import { TextAreaInput } from "../TextAreaInput/TextAreaInput"
import {hasOptions} from "../../shared/functions/hasOptions"
import OptionBuilder from "../OptionBuilder/OptionBuilder"

type Props = {
  field: Field
}

export function FieldBuilder({ field }: Props) {
  const [editing, setEditing] = useState({ label: false, description: false })
  const [hasDescription, setHasDescription] = useState(false)
  const [fieldData, setFieldData] = useState({
    label: field.label,
    description: field.description,
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log("dispatch field change")
    dispatch(() => {})
  }, [fieldData])

  return (
    <FieldBuilderContainer>
      <Label>
        <Actions>
          <ActionButton
            icon="pencil"
            onClick={() =>
              setEditing((prev) => ({ ...prev, label: !prev.label }))
            }
          />
          <ActionButton
            icon="arrowup"
            onClick={() =>
              setEditing((prev) => ({ ...prev, label: !prev.label }))
            }
          />
          <ActionButton
            icon="arrowdown"
            onClick={() =>
              setEditing((prev) => ({ ...prev, label: !prev.label }))
            }
          />
          <ActionButton
            icon="bars"
            onClick={() => setHasDescription((prev) => !prev)}
          />
        </Actions>
        {editing.label ? (
          <LabelEdit
            value={fieldData.label}
            onChange={(e) =>
              setFieldData((prev) => ({ ...prev, label: e.target.value }))
            }
          />
        ) : (
          <LabelDisplay>{fieldData.label}</LabelDisplay>
        )}
      </Label>
      <DescriptionContainer>
        {hasDescription && (
          <Description>
            {editing.description ? (
              <DescriptionEdit
                value={fieldData.description}
                onChange={(e) =>
                  setFieldData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            ) : (
              <DescriptionDisplay>{fieldData.description}</DescriptionDisplay>
            )}
            <ActionButton
              icon="pencil"
              onClick={() =>
                setEditing((prev) => ({
                  ...prev,
                  description: !prev.description,
                }))
              }
            />
          </Description>
        )}
      </DescriptionContainer>
      {field.type === "text" && <TextInput />}
      {field.type === "textarea" && <TextAreaInput />}
      {hasOptions(field.type) && <OptionBuilder fieldType={field.type} options={[]} />}
    </FieldBuilderContainer>
  )
}
