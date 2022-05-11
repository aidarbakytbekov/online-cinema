import UserList from '@/screens/admin/users/UserList';
import { NextPageAuth } from '@/shared/types/auth.types';

const UserListPage: NextPageAuth = props => {
  return (
     <UserList/>
   )
}

UserListPage.isOnlyAdmin = true

export default UserListPage