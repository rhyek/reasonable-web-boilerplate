import { createAction } from 'typesafe-actions'

export default {
  update: createAction('HOME_UPDATE_FORM', (name: string, value: string) => {
    return {
      type: 'HOME_UPDATE_FORM',
      payload: { [name]: value }
    }
  })
}
