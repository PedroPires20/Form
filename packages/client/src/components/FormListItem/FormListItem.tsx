import {
  FormListItemContainer,
  FormInfoContainer,
  FromTitle,
  FormDescription,
  FromButtonsContainer,
} from "./FormListItemStyles"
import ActionButton from "../../shared/components/ActionButton/ActionButton"
import { Form } from "../../redux/modules/forms/types"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { formDeleted } from "../../redux/modules/forms/slice"
import { deleteForm } from "../../redux/modules/forms/thunks"
import { setTestTarget } from "../../shared/functions/setTestTarget"

type Props = {
  form: Form
}

export function FormListItem({ form }: Props) {
  const history = useHistory()
  const dispatch = useDispatch()
  return (
    <FormListItemContainer {...setTestTarget("FL-item-container")}>
      <FormInfoContainer {...setTestTarget("FL-item-info")}>
        <FromTitle>{form.title}</FromTitle>
        <FormDescription>{form.description}</FormDescription>
      </FormInfoContainer>
      <FromButtonsContainer {...setTestTarget("FLI-action-buttons")}>
        <ActionButton
          icon="pencil"
          tooltip="Editar form"
          onClick={() => {
            history.push("/edit/" + form.id)
          }}
        />
        <ActionButton
          icon="arrowDownToBracket"
          tooltip="Baixar resultados"
          color="var(--primary)"
          onClick={() => {}}
        />
        <ActionButton
          icon="arrowRightFromBracket"
          tooltip="Visualizar form"
          color="orange"
          onClick={() => {
            history.push("/view/" + form.id)
          }}
        />
        <ActionButton
          icon="xmark"
          tooltip="Apagar formulário"
          color="var(--error)"
          onClick={() => {
            dispatch(deleteForm(form.id))
          }}
        />
      </FromButtonsContainer>
    </FormListItemContainer>
  )
}
