import { NextPageAuth } from '@/shared/types/auth.types';
import Profile from '@/screens/admin/profile/Profile';

const ProfilePage: NextPageAuth = props => {
  return (
     <Profile/>
   )
}

ProfilePage.isOnlyUser = true

export default ProfilePage