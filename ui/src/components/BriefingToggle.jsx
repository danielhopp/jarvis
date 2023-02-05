import { useSelector, useDispatch } from 'react-redux'

import classNames from '#root/classnames'
import { selectGui } from '#root/selectors'
import { update } from '#actions/gui'

import styles from './BriefingToggle.module.css'

export default () => {
  const { showBriefing } = useSelector(selectGui)
  const dispatch = useDispatch()

  const handleToggle = e => {
    dispatch(
      update({
        showBriefing: !showBriefing
      })
    )
  }

  return (
    <button
      className={classNames(styles.root, {
        [styles.showBriefing]: showBriefing
      })}
      onClick={handleToggle}
    >
      Briefing
    </button>
  )
}
