import axios from "axios"
import { GET_EXAMPLE } from "../../../shared/urls"
import { AppThunk } from "../../store"
import { exampleRequest, getExampleFailed, getExampleSuccess } from "./slice"

export function getExample(): AppThunk {
  return (dispatch) => {
    dispatch(exampleRequest())
    axios
      .get(GET_EXAMPLE)
      .then((res) => dispatch(getExampleSuccess(res.data)))
      .catch(() => dispatch(getExampleFailed()))
  }
}
