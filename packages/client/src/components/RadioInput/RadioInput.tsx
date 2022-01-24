import {
  RadioContainer,
  RadioSelector,
  RadioLabel,
  EditRadio,
} from "./RadioInputStyles"

type Props = {
  name: string
  value?: boolean
  disabled?: boolean
  editing?: boolean
  onChange?: (value: boolean) => void
  onEditChange?: (name: string) => void
}

export function RadioInput({
  name,
  value = false,
  disabled,
  editing,
  onChange,
  onEditChange,
}: Props) {
  return (
    <RadioContainer>
      <RadioSelector
        onChange={(e) => onChange && onChange(e.target.checked)}
        type="radio"
        disabled={disabled}
        checked={value}
      />
      {editing ? (
        <EditRadio
          defaultValue={name}
          autoFocus={true}
          onChange={(e) => onEditChange && onEditChange(e.target.value)}
        />
      ) : (
        <RadioLabel>{name}</RadioLabel>
      )}
    </RadioContainer>
  )
}
