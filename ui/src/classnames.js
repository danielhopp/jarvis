import classnames from 'classnames'

export default function () {
  return classnames.apply(null, arguments) || undefined
}