import React, { useState } from "react"
import { FieldBuilderContainer, FieldBuilderHeader, NameContainer, NameDisplay, TransparentInput, EditButton } from "./FieldBuilderStyles"
import { TextInput } from "../TextInput/TextInput"
import { SelectInput } from "../SelectInput/SelectInput"
import { useForm, useFormContext, Controller } from "react-hook-form"
import editIcon from "./assets/pencil-fill.svg"

interface Props {
    index: number
    defaultName: string
    defaultType: string
}

export function FieldBuilder({ index, defaultName, defaultType }: Props) {
    const [editName, toggleEditName] = useState(true);
    const nullRegister = useForm().register
    const { register, watch } = useFormContext()
    const name = watch(`fields.${index}.name`) || defaultName
    const label = watch(`fields.${index}.label`)
    const placeholder = watch(`fields.${index}.placeholder`)

   return (
   <FieldBuilderContainer>
       <FieldBuilderHeader>
            <NameContainer onDoubleClick={() => toggleEditName(true)}>
                {editName ? 
                 <TransparentInput
                 {...register(`fields.${index}.name`)}
                 onBlur={() => toggleEditName(false)}
                 onKeyDown={(e) => e.key === "Enter" && toggleEditName(false)}
                 />:
                 <NameDisplay>{name}</NameDisplay>}
                <EditButton
                onClick={(e) => {
                    e.preventDefault()
                    toggleEditName(true)
                }}
                >
                    <img src={editIcon} alt="editar"/>
                </EditButton>
            </NameContainer>
            <Controller 
            name={`fields.${index}.type`}
            defaultValue={defaultType}
            render={ ({ field: {value, onChange} }) => 
                <SelectInput 
                selectorText="Selecione um tipo de entrada"
                options={[{label: "Texto", value: "text"}, {label: "Texto grande", value: "textarea"}, {label: "Checkbox", value: "checkbox"}]}
                value={value}
                onChange={onChange}
                />
            }/>
        </FieldBuilderHeader>
        <TextInput
        name={`fields.${index}.label`}
        placeholder="Entre um rótulo para o campo"
        label="Rótulo"
        required
        register={register}
        />
        <TextInput 
        name={`fields.${index}.placeholder`}
        placeholder="Entre uma pequena descrição do campo"
        label="Placeholder"
        register={register}
        required={false}
        />
       <p>Pré-visualização:</p>
       <TextInput 
       name="test"
       label={label}
       placeholder={placeholder}
       register={nullRegister}
       required
       />
    </FieldBuilderContainer>
    )
}