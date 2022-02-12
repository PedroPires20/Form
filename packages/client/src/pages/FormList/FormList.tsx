import {
  ListPageContainer,
  FormListContainer,
  FormListHeader,
  FormInfoList,
  NoForms,
} from "./FormListStyles"
import { FormListItem } from "../../components/FormListItem/FormListItem"
import { useAppSelector } from "../../redux/store"

export function FormList() {
  const forms = useAppSelector((state) => state.form.all)

  return (
    <ListPageContainer>
      <FormListContainer>
        <FormListHeader>Forms</FormListHeader>
        {forms.length ? (
          <FormInfoList>
            {forms.map((form) => (
              <FormListItem key={form.id} form={form} />
            ))}
          </FormInfoList>
        ) : (
          <NoForms>Clique no menu ao lado para criar um form!</NoForms>
        )}
      </FormListContainer>
    </ListPageContainer>
  )
}
