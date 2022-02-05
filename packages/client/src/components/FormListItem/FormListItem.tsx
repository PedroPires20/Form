import {
  FormListItemContainer,
  FormInfoContainer,
  FromTitle,
  FormDescription,
  FromButtonsContainer,
} from "./FormListItemStyles"
import ActionButton from "../../shared/components/ActionButton/ActionButton"
import { Form } from "../../redux/modules/forms/types"
import { useAppDispatch } from "../../redux/store"
import { changeCurrentForm } from "../../redux/modules/forms/thunks"
import {useHistory} from "react-router-dom"

type Props = {
  form: Form
}

export function FormListItem({ form }: Props) {
  const dispatch = useAppDispatch()
  const history = useHistory()
  return (
    <FormListItemContainer>
      <FormInfoContainer>
        <FromTitle>{form.title}</FromTitle>
        <FormDescription>{form.description}</FormDescription>
      </FormInfoContainer>
      <FromButtonsContainer>
        <ActionButton
          icon="pencil"
          tooltip="Editar form"
          onClick={() => {
            dispatch(changeCurrentForm(form.id))
            history.push("/edit")
          }}
        />
        <ActionButton
          icon="bars"
          tooltip="Visualizar resultados"
          color="var(--primary)"
          onClick={() => {}}
        />
        <ActionButton
          icon="xmark"
          tooltip="Apagar formulário"
          color="var(--error)"
          onClick={() => {}}
        />
      </FromButtonsContainer>
    </FormListItemContainer>
  )
}
