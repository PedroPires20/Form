import {
  ListPageContainer,
  FormListContainer,
  FormListHeader,
  FormInfoList,
  NoForms,
} from "./FormListStyles"
import { FormListItem } from "../../components/FormListItem/FormListItem"
import { useAppSelector } from "../../redux/store"
import { setTestTarget } from "../../shared/functions/setTestTarget"

export function FormList() {
  const forms = useAppSelector((state) => state.form.all)

  return (
    <ListPageContainer>
      <FormListContainer>
        <FormListHeader>Forms</FormListHeader>
        {forms.length ? (
          <FormInfoList {...setTestTarget("form-list")}>
            {forms.map((form) => (
              <FormListItem key={form.id} form={form} />
            ))}
          </FormInfoList>
        ) : (
          <NoForms {...setTestTarget("empty-form-message")}>Clique no menu ao lado para criar um form!</NoForms>
        )}
      </FormListContainer>
    </ListPageContainer>
  )
}
