import { useRef } from 'react'
import { useSelector } from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'

import { selectChat } from '#root/selectors'
import Message from './Message'

import styles from './Threads.module.css'

const scrollOptions = {
  block: 'end',
  inline: 'nearest',
  behavior: 'smooth'
}

export default () => {
  const ref = useRef(null)

  const {
    threads,
    current: { threadId }
  } = useSelector(selectChat)
  const thread = threads[threadId] || {}

  useDeepCompareEffect(() => {
    let timer = setTimeout(() => {
      if (ref.current) {
        // Does not work in chrome
        // ref.current.scrollIntoView(scrollOptions)
        ref.current.scrollTop = ref.current.scrollHeight
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [thread])

  return (
    <div className={styles.root} ref={ref}>
      {thread && Object.keys(thread).length ? (
        <ul className={styles.thread}>
          {Object.entries(thread).map(([id, message]) => (
            <li key={id}>
              <Message {...message} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.emptyness}>Command history</div>
      )}
    </div>
  )
}
