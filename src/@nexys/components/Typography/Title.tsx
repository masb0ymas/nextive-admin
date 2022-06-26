import { Typography } from 'antd'
import { TitleProps } from 'antd/lib/typography/Title'
import { CSSProperties } from 'react'
// import { TextAlignProperty } from 'csstype'

const { Title: CurTitle } = Typography

const mapColor = {
  default: 'inherit',
  primary: '#1B5292',
}

const mapFontFamily = {
  regular: 'OpenSans-Regular',
}

interface CustomTitleProps extends TitleProps {
  className?: string
  color?: 'default' | 'primary' | any
  size?: number
  noMargin?: boolean
  align?:  "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start"|any
  style?: CSSProperties
  fontFamily?: 'regular' | any
}

function Title(props: CustomTitleProps) {
  const {
    noMargin,
    color,
    style,
    size = 24,
    align,
    fontFamily = mapFontFamily.regular,
    ...otherProps
  } = props

  return (
    <CurTitle
      style={{
        fontFamily,
        color: mapColor[color] || color || mapColor.default,
        ...(noMargin ? { marginBottom: 0 } : {}),
        ...(align ? { textAlign: align } : {}),
        fontSize: size,
        ...style,
      }}
      {...otherProps}
    />
  )
}

export default Title
