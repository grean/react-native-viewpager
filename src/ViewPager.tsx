import React, { useEffect, useState } from 'react'
import { View, Text, LayoutChangeEvent, StyleSheet } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedGestureHandler, useSharedValue, withSpring } from 'react-native-reanimated'
import { snapPoint } from 'react-native-redash'

import PageItem from './PageItem'

type ParentLayout = {
  width: number
  height: number
}
export type TextStyleType = {
  fontFamily?: string
  fontSize?: number
  backgroundColor?: string
  color?: string
}
export type ContainerStyleType = {
  backgroundColor?: string
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined
}
export type ChildStyleType = {
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined
}

// export type PageItemType = React.ReactNode

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
  childStyle: ChildStyleType
  containerStyle: ContainerStyleType
  currentPageIndex: number
  onChanged: (index: number) => void
}

const ViewPager = ({
  children,
  childStyle,
  containerStyle,
  currentPageIndex,
  onChanged,
}: ViewPagerProps) => {
  const [layout, setLayout] = useState<ParentLayout | null>(null);
  const width = layout?.width ?? 0
  const height = layout?.height ?? 0
  const scrollX = useSharedValue(0)
  const [itemIndex, setItemIndex] = useState(currentPageIndex);

  const onIndexChanged = (index: number) => {
    'worklet'
    console.log(`VIEWPAGER setValue done ${index}`)
    runOnJS(setItemIndex)(index)
  }

  useEffect(() => {
    onChanged(itemIndex)
  }, [itemIndex]);

  const contentOffsetX = -width * itemIndex
  scrollX.value = withSpring(contentOffsetX, getSpringConfig())

  const snapPoints = children.map((_, index: number) => index * -width)

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (event, ctx) => {
      if (ctx.oldIndex === undefined) {
        ctx.oldIndex = itemIndex
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
      onLayout={({ nativeEvent: { layout: { x, y, width, height } } }: LayoutChangeEvent) => {
        console.log(`VIEWPAGER LAYOUT event x ${x} y ${y} width ${width} height ${height}`)
        setLayout({ width, height })
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
            <View style={styles.footer}>

            </View>
          </Animated.View>
        </PanGestureHandler>
      </>}
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {},
  viewPager: {
    flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'center',
    overflow: 'hidden',
    // alignItems: 'center',
  },
  panContainer: {
    flex: 1,
    // marginVertical,
    // paddingTop: itemHeight,
    // backgroundColor: "green",
    flexDirection: 'row',
  },
});

export default ViewPager
