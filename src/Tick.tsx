import React, { useState } from "react"
import {
  View,
  Text,
  Button,
  Platform,
  StyleSheet,
  Dimensions,
  PixelRatio,
  LayoutChangeEvent,
  ViewStyle,
  Pressable,
} from 'react-native';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  Rect,
} from "react-native-svg"

// import useDimensions from '../../../hooks/useDimensions'

type ParentLayout = {
  width: number
  height: number
}

type StyleType = {
  backgroundColor?: string
  color?: string
  flex: number
  fontFamily?: string
  // fontSize?: number
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined
}

// const colors = ['#00b5ad', '#2185D0', '#B5CC18', '#FBBD08', '#F2711C', '#DB2828', '#E03997', '#6435C9', '#A5673F', '#AAA', '#888', '#666', '#444', '#222', '#000']



interface TickProps {
  color: number[],
  index: number
  // isCurrent: boolean
  height: number
  onChanged?: (index: number) => void
  r: number
  strokeWidth: number
  width: number
  x: number
  y: number
}

const Tick = ({
  color,
  height,
  index,
  onChanged,
  r,
  strokeWidth,
  // isCurrent,
  width,
  x,
  y,
}: TickProps) => {

  const onPress = () => {
    if (onChanged !== undefined)
      onChanged(index)
  }

  return (
    <>
      <Rect
        {...{
          // fill: colors[index],
          height,
          // stroke: "rgb(0,0,0)",
          // strokeWidth: 3,
          width,
          x: index * width,
          y: 0,
          onPress,
        }}
      />
      <Circle
        {...{
          cx: x,
          cy: y,
          r,
          onPress,
          stroke: `rgba(${color[0]},${color[1]},${color[2]},${color[3]} )`,
          strokeWidth,
          // fill: isCurrent ? color : "transparent",
        }}
      />
    </>
  )
}

export default Tick
