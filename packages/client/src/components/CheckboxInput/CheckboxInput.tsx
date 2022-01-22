import {
  CheckboxContainer,
  CheckboxSelector,
  CheckboxLabel,
  EditCheckbox,
} from "./CheckboxInputStyles"

type Props = {
  name: string
  value?: boolean
  disabled?: boolean
  editing?: boolean
  onChange?: (value: boolean) => void
  onEditChange?: (name: string) => void
}

export function CheckboxInput({
  name,
  value,
  disabled,
  editing,
  onChange,
  onEditChange,
}: Props) {
  return (
    <CheckboxContainer>
      <CheckboxSelector
        type="checkbox"
        checked={value}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      {editing ? (
        <EditCheckbox
          defaultValue={name}
          autoFocus={true}
          onChange={(e) => onEditChange && onEditChange(e.target.value)}
        />
      ) : (
        <CheckboxLabel>{name}</CheckboxLabel>
      )}
    </CheckboxContainer>
  )
}
