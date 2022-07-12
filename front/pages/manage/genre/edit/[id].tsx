import GenreEdit from '@/screens/admin/genre/GenreEdit';
import { NextPageAuth } from '@/shared/types/auth.types';

const GenreEditPage: NextPageAuth = props => {
  return (
     <GenreEdit/>
   )
}

GenreEditPage.isOnlyAdmin = true

export default GenreEditPage