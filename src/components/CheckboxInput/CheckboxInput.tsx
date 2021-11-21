import {
  CheckboxContainer,
  CheckboxSelector,
  CheckboxLabel,
} from "./CheckboxInputStyles"

interface Props {
  name: string
  value: string
  onChange?: (newValue: boolean) => void
}

export function CheckboxInput(props: Props) {
  return (
    <CheckboxContainer>
      <CheckboxSelector
        type="checkbox"
        name={props.name}
        value={props.value}
        onChange={(event) =>
          props.onChange && props.onChange(!!event.target.value)
        }
      />
      <CheckboxLabel htmlFor={props.name}>{props.value}</CheckboxLabel>
    </CheckboxContainer>
  )
}
