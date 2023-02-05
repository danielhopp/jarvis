import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

import { selectObjects } from '#root/selectors'
import styles from './Canvas.module.css'

const motionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { delayChildren: 1, duration: 0.5 }
}

const Child = ({ id, name, color, children }) => {
  const type = typeof children === 'undefined' ? 'item' : 'container'
  const style = color ? { backgroundColor: color } : null
  return (
    <motion.div {...motionProps} className={styles[type]} style={style}>
      {id !== 0 ? <div className={styles.title}>{name}</div> : null}
      {type === 'container' ? (
        <div className={styles.contents}>
          <Children nodes={children} />
        </div>
      ) : null}
    </motion.div>
  )
}

const Children = ({ nodes }) => (
  <AnimatePresence>
    {nodes.map(node => (
      <Child key={node.id} {...node} />
    ))}
  </AnimatePresence>
)

export default () => {
  const nodes = useSelector(selectObjects)
  return (
    <div className={styles.root}>
      <Children nodes={nodes} />
    </div>
  )
}
