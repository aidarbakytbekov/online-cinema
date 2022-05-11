
import { NextPageAuth } from '@/shared/types/auth.types';
import ActorList from '@/screens/admin/actors/ActorsList';

const ActorListPage: NextPageAuth = props => {
  return (
     <ActorList/>
   )
}

ActorListPage.isOnlyAdmin = true

export default ActorListPage