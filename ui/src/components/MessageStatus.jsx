import classNames from '#root/classnames'
import Spinner from './Spinner'

import { ReactComponent as CheckIcon } from './check.svg'
import { ReactComponent as AlertIcon } from './alert.svg'

import styles from './MessageStatus.module.css'

const title = {
  pending: 'Pending message',
  ok: 'Valid response – changes applied',
  notice: 'Response invalid – local state unchanged',
  error: 'Error – local state unchanged'
}

export default ({ status }) => (
  <span className={styles.root} title={title[status]}>
    {status === 'pending' ? (
      <Spinner className={styles.pending} />
    ) : status === 'ok' ? (<>
      <CheckIcon className={styles.checkIcon} />
      </>
    ) : (
      <AlertIcon className={classNames(styles.alertIcon, styles[status])} />
    )}
  </span>
)
