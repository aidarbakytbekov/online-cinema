import { FC } from 'react'

import styles from './SlugField.module.scss'
import { FieldError, UseFormRegister } from 'react-hook-form';
import Field from '@/components/ui/form-elements/Field';

interface ISlugField {
  error?: FieldError
  register: UseFormRegister<any>
  generate: () => void
}

const SlugField: FC<ISlugField> = ({generate, error, register}) => {
  return (
     <div className='relative w-full'>
       	<Field
							{...register('slug', {
								required: 'Slug is required',
							})}
							placeholder="Slug"
							error={error}
						/>
            <div className={styles.badge} onClick={generate}>
              Generate
            </div>
     </div>
   )
}

export default SlugField