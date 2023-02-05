import { createSlice } from '@reduxjs/toolkit'

import { itemsMap, findItem } from '../selectors'

import example from '../example'

const selectNextId = state => {
  const numericIds = Object.keys(itemsMap(state)).map(key => parseInt(key))
  return 1 + Math.max(0, ...numericIds)
}

const addItem = (items, parentId, item) =>
  items.reduce(
    (acc, child) => [
      ...acc,
      {
        ...child,
        ...(child?.id === parentId
          ? { children: [...(child.children || []), item] }
          : child.children
          ? {
              children: addItem(child.children || [], parentId, item)
            }
          : {})
      }
    ],
    []
  )

const removeItem = (items, id) =>
  items.reduce(
    (acc, item) =>
      item?.id === id
        ? acc
        : [
            ...acc,
            {
              ...item,
              ...(item.children
                ? {
                    children: removeItem(item.children, id)
                  }
                : {})
            }
          ],
    []
  )

const initialState = [
  {
    id: 0,
    name: 'canvas',
    children: []
  }
]

const slice = createSlice({
  name: 'objects',
  initialState: example,
  reducers: {
    clear: () => example, // initialState,
    setState: (state, { payload }) => payload,
    create: (state, { payload }) =>
      addItem(state, 0, {
        ...payload,
        id: selectNextId(state)
      }),
    move: (state, { payload: { id, parentId } }) => {
      const item = findItem(state, id)
      const parent = findItem(state, parentId)
      if (item && parent) {
        return addItem(removeItem(state, id), parentId, item)
      }
    },
    remove: (state, { payload: { id } }) => removeItem(state, id)
  }
})

export default slice

export const { clear, create, move, remove, setState } = slice.actions
