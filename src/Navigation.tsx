import React from 'react'
import { View, Text, ViewStyle, Pressable } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedProps } from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'

import Tick from './Tick'

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface NavigationProps {
  // containerStyle?: ViewStyle
  count: number
  height: number
  // index: number
  navigationPadding?: number
  onChanged?: (index: number) => void
  pointColor?: number[]
  pointRadius?: number
  tickColor?: number[]
  tickRadius?: number
  scrollX: Animated.SharedValue<number>
  strokeWidth?: number
  // navigationStyle?: ViewStyle
  width: number
}

const Navigation = ({
  count,
  // containerStyle,
  height,
  // index,
  navigationPadding = height * 0.02,
  onChanged,
  pointColor = [255, 255, 255],
  pointRadius = 6,
  tickColor = [255, 255, 255, 1],
  tickRadius = 4,
  strokeWidth = 2,
  scrollX,
  // navigationStyle,
  width,
}: NavigationProps) => {
  console.log(`Navigation`)
  const part = width / count
  console.log(`width ${width} part ${part}`)
  // const x = part / 2
  // const y = height / 2
  // console.log(`count ${count}`)
  const snapPoints = new Array(count).fill(0).map((_, index) => ({
    x: index * part + part / 2,
    y: height / 2
  }))
  // const color = 'white'

  const animatedProps = useAnimatedProps(() => {
    const x = -scrollX.value / count + part / 2
    // console.log(`scrollX ${-scrollX.value} cx ${cx}`)
    const dest = Math.min(count - 1, Math.max(0, Math.round(-scrollX.value / count / part)))
    const cx = snapPoints[dest].x

    const fullPos = dest * part + part / 2
    const alpha = interpolate(
      x,
      [fullPos - part / 2, fullPos, fullPos + part / 2],
      [dest === 0 ? 1 : 0, 1, dest === count - 1 ? 1 : 0],
      Extrapolate.CLAMP
    )
    // console.log(`snapPoints[snapPoints[dest].x ${snapPoints[dest].x}dest ${dest} x ${x} alpha ${alpha}`)

    return {
      cx,
      fill: `rgba(${pointColor[0]},${pointColor[1]},${pointColor[2]},${alpha})`,
    };
  });

  const r = pointRadius === 0 ? 0 : height / pointRadius;
  const rTick = tickRadius === 0 ? 0 : height / tickRadius;

  return (
    <View style={[{
      position: 'absolute',
      bottom: height * navigationPadding,
      // top: 0,
      width,
      height,
      // backgroundColor: 'rgba(0,0,0,0.2)',
      flexDirection: 'row',
      // justifyContent: 'flex-start'
    },
      // navigationStyle,
      // containerStyle,
    ]}>
      <Svg
        {...{
          viewBox: `0 0 ${width} ${height}`,
          width: '100%',
          height: '100%',
          // fill: "none",
          // preserveAspectRatio: "none",
        }}
      >

        {snapPoints.map(({ x, y }, key) =>
          <Tick
            {...{
              color: tickColor,
              key,
              index: key,
              height,
              onChanged,
              r: rTick,
              strokeWidth,
              width: part,
              x,
              y,
              // isCurrent: index === i,
            }}
          />
        )}
        <AnimatedCircle
          {...{
            animatedProps,
            // cx: -scrollX.value,
            // cx: -scrollX.value / index - part / 2,
            cy: height / 2,
            r,
            // stroke: color,
            // strokeWidth: 2,
            // fill: color,
          }}
        />
      </Svg>
    </View>
  )
}

export default Navigation
