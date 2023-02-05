import { useSelector } from 'react-redux'
import nl2br from 'react-nl2br'
import ReactMarkdown from 'react-markdown'

import { selectGui } from '#root/selectors'
import MessageStatus from './MessageStatus'

import styles from './Message.module.css'

export default ({
  createdAt,
  briefing,
  userMessage,
  objectsBefore,
  isValidResponse,
  responseAt,
  chatgpt,
  error
}) => {
  const { showBriefing } = useSelector(selectGui)

  const valid = responseAt ? isValidResponse : null
  const status = responseAt
    ? isValidResponse
      ? 'ok'
      : error
      ? 'error'
      : 'notice'
    : 'pending'

  return (
    <div className={styles.root}>
      <div className={styles.request}>
        {showBriefing ? (
          <>
            <div className={styles.briefing}>{nl2br(briefing)}</div>
            <span className={styles.template}>
              CURRENT_DATA:
              <br />
            </span>
            <pre className={styles.data}>
              {JSON.stringify(objectsBefore, null, 2)}
            </pre>
            <div>
              <span className={styles.template}>COMMAND: </span>
              <span className={styles.msgUserMessage}>{userMessage}</span>
            </div>
          </>
        ) : (
          <span className={styles.msgUserMessage}>{userMessage}</span>
        )}
      </div>
      <div className={styles.response}>
        <MessageStatus status={status} />
        {responseAt && !isValidResponse ? (
          chatgpt ? (
            <ReactMarkdown>{chatgpt.response}</ReactMarkdown>
          ) : (
            <div className={styles.error}>
              {error === null ? 'Unknown error' : error}
            </div>
          )
        ) : null}
      </div>
    </div>
  )
}
