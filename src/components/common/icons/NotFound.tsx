import * as React from 'react'
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon'

const NotFoundIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0, 60 60">
      <path d="M57 0H3C1.346 0 0 1.346 0 3v56a1 1 0 001 1h58a1 1 0 001-1V3c0-1.654-1.346-3-3-3zM3 2h54c.551 0 1 .449 1 1v5H2V3c0-.551.449-1 1-1zm16 51v5h-8v-5h8zm2 0h8v5h-8v-5zm10 0h8v5h-8v-5zm10 0h8v5h-8v-5zM2 51V17h56v34H2zm0-36v-5h56v5H2zm0 38h7v5H2v-5zm49 5v-5h7v5h-7z" />
      <path d="M5 4h4v2H5zM12 4h4v2h-4zM16 24h-2v13H8V24H6v14a1 1 0 001 1h7v6h2v-6h3v-2h-3V24zM54 37h-3V24h-2v13h-6V24h-2v14a1 1 0 001 1h7v6h2v-6h3v-2zM30 24c-3.86 0-7 3.14-7 7v7c0 3.86 3.14 7 7 7s7-3.14 7-7v-7c0-3.86-3.14-7-7-7zm5 14c0 2.757-2.243 5-5 5s-5-2.243-5-5v-7c0-2.757 2.243-5 5-5s5 2.243 5 5v7z" />
    </SvgIcon>
  )
}

export default NotFoundIcon
