import { FC } from 'react'
import ReduxToastLib from 'react-redux-toastr'

const ReduxToast: FC = () => {
	return (
		<ReduxToastLib
			newestOnTop={false}
			preventDuplicates
			progressBar
			closeOnToastrClick
			timeOut={4000}
			transitionIn="fadeIn"
			transitionOut="fadeOut"
		/>
	)
}

export default ReduxToast
