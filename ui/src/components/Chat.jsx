import { useSelector, useDispatch } from 'react-redux'

import classNames from '#root/classnames'
import { updateCurrentProperties, sendMessage } from '#actions/chat'
import { selectGui, selectChat } from '#root/selectors'
import submitOnEnter from '#root/submitOnEnter'

import Threads from './Threads'
import BriefingToggle from './BriefingToggle'

import styles from './Chat.module.css'

const UserInput = ({ handleSend, ...rest }) => (
  <textarea
    {...rest}
    placeholder="Command"
    {...submitOnEnter(handleSend)}
    title="Press SHIFT+ENTER for new line"
  ></textarea>
)

export default () => {
  const { showBriefing } = useSelector(selectGui)
  const { isLoading, current } = useSelector(selectChat)
  const dispatch = useDispatch()

  const connect = (name, v) => ({
    value: current[name],
    onChange: e => {
      dispatch(
        updateCurrentProperties({
          [name]: typeof v === 'function' ? v(e.target.value) : e.target.value
        })
      )
    }
  })

  const { userMessage, temperature } = current
  const disabled = isLoading || !userMessage?.length

  const handleSend = () => {
    if (!disabled) {
      dispatch(sendMessage())
    }
  }

  return (
    <div
      className={classNames(styles.root, {
        [styles.showBriefing]: showBriefing
      })}
    >
      <Threads />
      <div className={classNames(styles.textInput, styles.briefing)}>
        <textarea {...connect('briefing')} placeholder="Briefing"></textarea>
      </div>
      <div className={classNames(styles.textInput, styles.userMessage)}>
        <UserInput {...connect('userMessage')} handleSend={handleSend} />
        <div className={styles.buttons}>
          <BriefingToggle />
          <div className={styles.temperature} title="Temperature">
            <input
              name="temperature"
              type="range"
              min="0"
              max="1"
              step="0.05"
              {...connect('temperature', v => parseFloat(v))}
            />
            <label htmlFor="temperature">T={temperature}</label>
          </div>
          <button onClick={handleSend} disabled={disabled}>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
