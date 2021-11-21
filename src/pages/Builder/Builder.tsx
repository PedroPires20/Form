import {
  BuilderContainer,
  BuilderDescription,
  BuilderForm,
  BuilderTitle,
} from "./BuilderStyles"

export function Builder() {
  return (
    <BuilderContainer>
      <BuilderForm>
        <BuilderTitle>Title</BuilderTitle>
        <BuilderDescription>Description</BuilderDescription>
      </BuilderForm>
    </BuilderContainer>
  )
}
