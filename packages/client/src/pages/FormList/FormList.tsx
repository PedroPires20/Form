import {
  ListPageContainer,
  FormListContainer,
  FormListHeader,
  FormInfoList,
} from "./FormListStyles"
import { FormListItem } from "../../components/FormListItem/FormListItem"
import { useAppSelector } from "../../redux/store"

export function FormList() {
  const forms = useAppSelector((state) => state.form.all)

  return (
    <ListPageContainer>
      <FormListContainer>
        <FormListHeader>Meus formulários</FormListHeader>
        <FormInfoList>
          {forms.map((form) => (
            <FormListItem key={form.id} form={form} />
          ))}
        </FormInfoList>
      </FormListContainer>
    </ListPageContainer>
  )
}
