import { useSelector } from 'react-redux'

import { selectGui } from '#root/selectors'

import Canvas from '#components/Canvas'
import Data from '#components/Data'
import Chat from '#components/Chat'
import Toolbar from '#components/Toolbar'

import styles from './App.module.css'

const { VITE_PRODUCT_TITLE: title } = import.meta.env

export default () => {
  const { showJson } = useSelector(selectGui)
  return (
    <div className={styles.root}>
      <div className={styles.display}>
        <h1>{title}</h1>
        <div className={styles.canvas}>{showJson ? <Data /> : <Canvas />}</div>
      </div>
      <div className={styles.controls}>
        <Chat />
        <Toolbar />
      </div>
    </div>
  )
}
