import { reducer as toastrReducer } from 'react-redux-toastr'

import userSlice from './user/user.slice'

export const reducers = {
	user: userSlice,
	toastr: toastrReducer,
}
