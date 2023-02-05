import JSONPretty from 'react-json-pretty'
import copy from 'copy-to-clipboard'
import { useSelector } from 'react-redux'

import { selectObjects } from '#root/selectors'

import './json.css'

import styles from './Data.module.css'

export default () => {
  const data = useSelector(selectObjects)

  return (
    <div
      className={styles.root}
      onClick={() => copy(JSON.stringify(data, null, 2))}
      title="Click to copy"
    >
      <JSONPretty data={data} />
    </div>
  )
}
