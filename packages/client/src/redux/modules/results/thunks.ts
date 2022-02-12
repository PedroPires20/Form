import axios from "axios"
import { SEND_ANWER } from "../../../shared/urls"
import { AppThunk } from "../../store"
import { answerSent, resultRequest, sendAnswerFailed } from "./slice"

export function sendAnswer(
  answers: Record<string, { value?: string; options?: string[] }>,
  callback: () => void
): AppThunk {
  return (dispatch, getState) => {
    dispatch(resultRequest())

    const form = getState().form
    const answerList = Object.keys(answers)

    axios
      .post(SEND_ANWER, {
        formId: form.id,
        resultItems: answerList.map((fieldId) => {
          const answer = answers[fieldId]
          if (answer.options) {
            return {
              optionValues: answer.options.map((option) => ({
                optionId: option,
                fieldId,
                value: "true",
              })),
            }
          } else {
            return {
              fieldValue: {
                fieldId,
                value: answer.value || "",
              },
            }
          }
        }),
      })
      .then((res) => {
        console.log(res.data)
        dispatch(answerSent())
        callback()
      })
      .catch(() => {
        dispatch(sendAnswerFailed())
      })
  }
}
