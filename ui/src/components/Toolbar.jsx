import { useSelector, useDispatch } from 'react-redux'

import classNames from '#root/classnames'
import {
  selectNormalizedNames,
  selectSourceObjects,
  selectTargetObjects,
  selectRemovableObjects,
  selectGui,
  selectChat
} from '#root/selectors'
import { create, move, remove, clear } from '#actions/objects'
import { reset as resetChat } from '#actions/chat'
import { reset as resetGui, update as updateState } from '#actions/gui'
import submitOnEnter from '#root/submitOnEnter'

import ObjectSelector from './ObjectSelector'

import styles from './Toolbar.module.css'

const hasSelection = id => id === 0 || id > 0

export default () => {
  const {
    isLoading,
    current: { status }
  } = useSelector(selectChat)
  const state = useSelector(selectGui)
  const { createName, moveId, moveParentId, removeId, showJson } = state

  const names = useSelector(selectNormalizedNames)
  const moveSourceObjects = useSelector(selectSourceObjects(moveParentId))
  const moveParentObjects = useSelector(selectTargetObjects(moveId))
  const removableObjects = useSelector(selectRemovableObjects)
  const dispatch = useDispatch()

  const handleChange = key => value => dispatch(updateState({ [key]: value }))

  const handleCreate = () => {
    dispatch(
      create({
        name: createName.trim().toUpperCase()
      })
    )
    dispatch(resetGui())
  }

  const handleMove = () => {
    dispatch(
      move({
        id: moveId,
        parentId: moveParentId
      })
    )
    dispatch(resetGui())
  }

  const handleRemove = () => {
    dispatch(remove({ id: removeId }))
    dispatch(resetGui())
  }

  const handleReset = () => {
    dispatch(clear())
    dispatch(resetChat())
    dispatch(resetGui())
  }

  const handleToggleShowJson = () => {
    dispatch(
      updateState({
        showJson: !showJson
      })
    )
  }

  const disabled = {
    create:
      isLoading ||
      !createName.length ||
      names.includes(createName.toUpperCase()),
    move: isLoading || !hasSelection(moveId) || !hasSelection(moveParentId),
    remove: isLoading || !hasSelection(removeId),
    reset: isLoading
  }

  return (
    <div className={styles.root}>
      <div>
        <input
          type="text"
          onChange={e => handleChange('createName')(e.target.value)}
          value={createName}
          maxLength="42"
          placeholder="New name"
          {...submitOnEnter(disabled.create ? null : handleCreate)}
        />
        <button onClick={handleCreate} disabled={disabled.create}>
          Create
        </button>
      </div>
      <div>
        <ObjectSelector
          label="Delete..."
          options={removableObjects}
          value={removeId}
          onChange={handleChange('removeId')}
        />
        <button onClick={handleRemove} disabled={disabled.remove}>
          Delete
        </button>
      </div>
      <div>
        <ObjectSelector
          label="Move..."
          options={moveSourceObjects}
          value={moveId}
          onChange={handleChange('moveId')}
        />
        <ObjectSelector
          label="into..."
          options={moveParentObjects}
          value={moveParentId}
          onChange={handleChange('moveParentId')}
        />
        <button onClick={handleMove} disabled={disabled.move}>
          Move
        </button>
      </div>
      <div>
        <button
          onClick={handleToggleShowJson}
          className={classNames({ [styles.showJson]: showJson })}
        >
          JSON
        </button>
      </div>
      <div>
        <button onClick={handleReset} disabled={disabled.reset}>
          Reset
        </button>
      </div>
    </div>
  )
}
