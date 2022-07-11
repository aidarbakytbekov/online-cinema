import { FC } from 'react'

import styles from './Collection.module.scss'
import { ICollection } from './collections.interface'
import Meta from '@/utils/meta/Meta';
import Heading from '@/ui/heading/Heading';
import Description from '@/ui/heading/Description';
import CollectionItem from './CollectionItem';

const title = 'Discovery'
const description = 'In this section you will find all genres on our site'

const Collection: FC<{ collections: ICollection[] }> = ({ collections }) => {
	return (
    <Meta title={title} description={description}>
    <Heading className={styles.heading}>{title}</Heading>
    <Description text={description} className={styles.description} />

    <section className={styles.collections}>
      {collections.map((item) => (
        <CollectionItem key={item._id} collection={item} />
      ))}
    </section>
  </Meta>
  )
}

export default Collection
