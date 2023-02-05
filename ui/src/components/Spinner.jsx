import classNames from '#root/classnames'

import styles from './Spinner.module.css'

export default ({ className }) => (
  <span className={classNames(styles.root, className)}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 95"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="matrix(4.54176,0,0,4.67596,-453.3,-61.9163)">
        <path
          d="M121.95,23.2C126.6,27.95 128.85,32.15 133.7,32.15C138.55,32.15 142.45,28.25 142.45,23.4C142.45,18.55 138.55,14.6 133.7,14.65C128.85,14.7 127.05,18.25 122.65,23.2C118.2,27.6 114.8,32.15 109.95,32.15C105.1,32.15 101.2,28.25 101.2,23.4C101.2,18.55 105.1,14.65 109.95,14.65C114.8,14.65 118.1,19.3 121.95,23.2Z"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          style={{ stroke: 'currentColor' }}
        />
      </g>
      <g transform="matrix(4.54176,0,0,4.67596,-453.3,-61.9163)">
        <path
          d="M121.95,23.2C126.6,27.95 128.85,32.15 133.7,32.15C138.55,32.15 142.45,28.25 142.45,23.4C142.45,18.55 138.55,14.6 133.7,14.65C128.85,14.7 127.05,18.25 122.65,23.2C118.2,27.6 114.8,32.15 109.95,32.15C105.1,32.15 101.2,28.25 101.2,23.4C101.2,18.55 105.1,14.65 109.95,14.65C114.8,14.65 118.1,19.3 121.95,23.2Z"
          opacity="0.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
      </g>
    </svg>
  </span>
)