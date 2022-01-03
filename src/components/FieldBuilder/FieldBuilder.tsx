import React, { useState } from "react"
import { FieldBuilderHeader, NameContainer, NameDisplay, NameEdit, EditButton } from "./FieldBuilderStyles"
import { TextInput } from "../TextInput/TextInput"
import { SelectInput } from "../SelectInput/SelectInput"
import { useForm, useFormContext, Controller } from "react-hook-form"
import editIcon from "./assets/pencil-fill.svg"

interface Props {
    index: number
    defaultName: string
    defaultType: string
}

// Lista de componentes de formulário disponíveis para o usuário selecionar
const availableComponents = [
    {label: "Texto", value: "text"},
    {label: "Texto grande", value: "textarea"},
    {label: "Checkbox", value: "checkbox"}
];

export function FieldBuilder({ index, defaultName, defaultType }: Props) {
    const [editName, toggleEditName] = useState(true);
    const nullRegister = useForm().register
    const { register, watch } = useFormContext()
    const name = watch(`fields.${index}.name`) || defaultName
    const label = watch(`fields.${index}.label`)
    const type = watch(`fields.${index}.type`) || defaultType
    const placeholder = watch(`fields.${index}.placeholder`)

   return (
   <div>
       <FieldBuilderHeader>
            <NameContainer onDoubleClick={() => toggleEditName(true)}>
                {editName ? 
                 <NameEdit
                 defaultValue={name || defaultName}
                 {...register(`fields.${index}.name`)}
                 onBlur={() => false && toggleEditName(false)}
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
                options={availableComponents}
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
        {
            (type == "text") && <>
                <TextInput
                name={`fields.${index}.placeholder`}
                placeholder="Entre uma pequena descrição do campo"
                label="Placeholder"
                register={register}
                required={false}
                />
            </>
        }
       <p>Pré-visualização:</p>
       {
           (type == "text") && <TextInput
           name={name}
           placeholder={placeholder}
           label={label}
           register={nullRegister}
           required
           />
       }
    </div>
    )
}