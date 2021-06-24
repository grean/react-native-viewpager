import React, { useEffect, useState } from 'react'
import { View, Text, LayoutChangeEvent, StyleSheet, ViewStyle, LayoutRectangle } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedGestureHandler, useSharedValue, withSpring } from 'react-native-reanimated'
import { snapPoint } from 'react-native-redash'

import PageItem from './PageItem'
import Navigation from './Navigation'

type ContextType = {
  startX: number
  startY: number
  oldIndex: number
}

export const getSpringConfig = (velocity: number = 400) => {
  'worklet'
  // console.log(velocity)
  return {
    stiffness: 150,
    damping: 30,
    mass: 1,
    overshootClamping: false,
    restSpeedThreshold: 10,
    restDisplacementThreshold: 10,
    velocity,
  }
}

interface ViewPagerProps {
  children: React.ReactNode[]
  childStyle: ViewStyle
  containerStyle: ViewStyle
  index: number
  navigation?: boolean
  navigationHeight?: number
  // navigationStyle: ViewStyle
  onChanged?: (index: number) => void
  pointColor?: number[]
  pointRadius?: number
  tickColor?: number[]
  tickRadius?: number
  strokeWidth?: number
}

const ViewPager = ({
  children,
  childStyle,
  containerStyle,
  index = 0,
  navigation = true,
  navigationHeight = 0.1,
  tickRadius,
  pointColor,
  pointRadius,
  strokeWidth,
  tickColor,
  // navigationStyle,
  onChanged,
}: ViewPagerProps) => {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  const width = layout?.width ?? 0
  const height = layout?.height ?? 0
  const scrollX = useSharedValue(0)
  // const [index, setIndex] = useState(index);

  const onIndexChanged = (newIndex: number) => {
    'worklet'
    // console.log(`onCurrentIndexChanged ${newIndex}`)
    // runOnJS(setCurrentItemIndex)(newIndex)
    if (onChanged !== undefined) {
      runOnJS(onChanged)(newIndex)
    }
  }

  const contentOffsetX = -width * index
  scrollX.value = withSpring(contentOffsetX, getSpringConfig())

  const snapPoints = children.map((_, index: number) => index * -width)

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (event, ctx) => {
      if (ctx.oldIndex === undefined) {
        ctx.oldIndex = index
      }
      ctx.startX = scrollX.value;
    },
    onActive: ({ translationX }, ctx) => {
      scrollX.value = ctx.startX + translationX;
      // console.log(`ON_ACTIVE scrollX ${scrollX.value}`)
    },
    onEnd: ({ velocityX }, ctx) => {
      const dest = snapPoint(scrollX.value, velocityX, snapPoints)

      scrollX.value = withSpring(dest, getSpringConfig(velocityX), (cancelled) => {
        const itemIndex = Math.round(-dest / width)
        if (cancelled && ctx.oldIndex !== itemIndex) {
          onIndexChanged(itemIndex)
          ctx.oldIndex = itemIndex
        }
      })
    },
  });

  return (
    <View
      onLayout={({ nativeEvent: { layout } }: LayoutChangeEvent) => {
        // console.log(`VIEWPAGER LAYOUT width ${layout.width} height ${layout.height}`)
        setLayout(layout)
      }}
      style={containerStyle}
    >
      {layout && <>
        <PanGestureHandler
          {...{
            onGestureEvent
          }}
        >
          <Animated.View
            style={childStyle}
          >
            {/* {console.log(`VIEWPAGER width ${layout.width} height ${layout.height}`)} */}
            {
              children.map((child, index) =>
                <PageItem
                  {...{
                    key: index,
                    height,
                    width,
                    index,
                    scrollX,
                  }}
                >
                  {child}
                </PageItem>
              )}
            {navigation && <Navigation
              {...{
                containerStyle,
                count: children.length,
                height: height * navigationHeight,
                index,
                onChanged,
                pointColor,
                pointRadius,
                scrollX,
                strokeWidth,
                tickColor,
                tickRadius,
                width,
              }}
            />}

          </Animated.View>
        </PanGestureHandler>
      </>}
    </View>
  )
}

export default ViewPager
