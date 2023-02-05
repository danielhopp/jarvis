export const selectObjects = state => state.objects || {}

const getObjectNames = items =>
  items.reduce(
    (acc, { name, children = [] }) => [
      ...acc,
      name,
      ...getObjectNames(children)
    ],
    []
  )

export const selectNormalizedNames = state =>
  getObjectNames(selectObjects(state)).map(name => name.toUpperCase())

export const itemsMap = items =>
  (items || []).reduce(
    (acc, { id, children, ...rest }) => ({
      ...acc,
      [id]: {
        ...rest,
        ...(children?.length ? { children: children.map(({ id }) => id) } : {})
      },
      ...itemsMap(children)
    }),
    {}
  )
export const selectObjectsMap = state => itemsMap(selectObjects(state))

const excludeIds = (map, ids) =>
  Object.keys(map)
    .map(k => parseInt(k))
    .reduce(
      (acc, id) =>
        ids.includes(id)
          ? acc
          : {
              ...acc,
              [id]: map[id]
            },
      {}
    )

export const selectParentId = childId => state => {
  const objectsMap = selectObjectsMap(state)
  const item = Object.entries(objectsMap).find(([id, { children = [] }]) =>
    children.includes(childId)
  )
  return typeof item?.[0] === 'undefined' ? -1 : parseInt(item?.[0])
}

export const findItem = (subject, id) => {
  if (Array.isArray(subject)) {
    let foundItem = null
    subject.forEach(item => {
      const result = findItem(item, id)
      if (result) {
        foundItem = result
      }
    })
    if (foundItem) {
      return foundItem
    }
  }

  if (subject?.id === id) {
    return subject
  }

  if (subject?.children) {
    return findItem(subject?.children, id)
  }
}

const collectChildrenIds = subject =>
  Array.isArray(subject)
    ? subject.reduce((acc, child) => [...acc, ...collectChildrenIds(child)], [])
    : subject?.id
    ? [subject?.id, ...collectChildrenIds(subject?.children || [])]
    : []

export const selectChildrenIds =
  parentId =>
  ({ objects }) => {
    if (isNaN(parentId)) {
      return []
    }
    const parent = findItem(objects, parentId)
    return parent?.children ? collectChildrenIds(parent.children) : []
  }

export const selectSourceObjects = moveParentId => state =>
  excludeIds(selectObjectsMap(state), [0, moveParentId])

export const selectTargetObjects = moveId => state => {
  const currentParentId = selectParentId(moveId)(state)
  const childrenIds = selectChildrenIds(moveId)(state)
  const canvasChildIds = selectChildrenIds(0)(state)
  return canvasChildIds?.length
    ? excludeIds(selectObjectsMap(state), [
        currentParentId,
        moveId,
        ...childrenIds
      ])
    : {}
}

export const selectRemovableObjects = state =>
  excludeIds(selectObjectsMap(state), [0])

/****** chat selectors */

export const selectChat = state => state.chat || {}
export const selectChatCurrent = state => selectChat(state).current

/****** gui selectors */

export const selectGui = state => state.gui