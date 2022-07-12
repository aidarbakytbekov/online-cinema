import { NextPageAuth } from '@/shared/types/auth.types'
import ActorEdit from '@/screens/admin/actor/ActorEdit';

const ActorEditPage: NextPageAuth = (props) => {
	return <ActorEdit />
}

ActorEditPage.isOnlyAdmin = true

export default ActorEditPage
