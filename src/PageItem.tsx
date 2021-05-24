import React from "react";
import { Image, StyleSheet, Dimensions, Alert, View, Text, PixelRatio } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface PageItemProps {
  children: React.ReactNode
  index: number
  scrollX: Animated.SharedValue<number>
  height: number
  width: number
  // display: "TOP_BOTTOM" | "CENTER_ONLY"
  // opacityRangeOut: number[]
  // scaleRangeOut: number[]
  // spaceBetween: number
  // textStyle?: TextStyleType
}

const getStatesInterval = (display: string, index: number, height: number) => {
  'worklet'
  switch (display) {
    case "TOP_BOTTOM":
      return [(index - 2) * height, (index - 1) * height, (index) * height, (index + 1) * height, (index + 2) * height]
    case "CENTER_ONLY":
      return [(index - 1) * height, (index) * height, (index + 1) * height]
    default:
      return []
  }
}
const colors = ['#00b5ad', '#2185D0', '#B5CC18', '#FBBD08', '#F2711C', '#DB2828', '#E03997', '#6435C9', '#A5673F', '#AAA', '#888', '#666', '#444', '#222', '#000']

const PageItem = ({
  children,
  scrollX,
  index,
  height,
  width,
  // display,
  // opacityRangeOut,
  // scaleRangeOut,
  // spaceBetween,
  // textStyle,
}: PageItemProps) => {
  const style = useAnimatedStyle(() => {
    // const statesInterval = getStatesInterval(display, index, height)

    const left = interpolate(
      -scrollX.value,
      [(index - 1) * width, (index) * width, (index + 1) * width],
      [(index - 1) * width, (index) * width, (index + 1) * width],
      Extrapolate.CLAMP
    )
    console.log(`scrollX ${-scrollX.value} Item ${index} left ${left}`)
    const opacity = interpolate(
      -scrollX.value,
      [(index - 1) * width, (index) * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolate.CLAMP
    )
    const scale = interpolate(
      -scrollX.value,
      [(index - 1) * width, (index) * width, (index + 1) * width],
      [0.8, 1, 0.8],
      Extrapolate.CLAMP
    )
    // const borderRadius = interpolate(
    //   -scrollX.value,
    //   [(index - 1) * width, (index) * width, (index + 1) * width],
    //   [20, 0, 20],
    //   Extrapolate.CLAMP
    // )
    // const scale = interpolate(
    //   -scrollX.value,
    //   statesInterval,
    //   scaleRangeOut,
    //   Extrapolate.CLAMP
    // )

    return {
      width,
      height,
      // backgroundColor: colors[index],
      opacity,
      transform: [
        { scale },
      ],
      left: -left,
      // borderRadius,
    };
  });
  // const textStyle = useAnimatedStyle(() => {
  //   return {
  //     // backgroundColor: colors[index],
  //     fontSize,
  //   };
  // });
  // console.log(textStyle.fontFamily)
  return (
    <>
      <Animated.View style={[styles.container, style]}>
        {children}
        {/* <Animated.Text
          numberOfLines={1}
          ellipsizeMode='tail'
          style={[styles.title, { fontSize: height * 0.77 }, textStyle]}>
          {children}
        </Animated.Text> */}
      </Animated.View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    // justifyContent: "flex-end",
    // backgroundColor: 'cyan',
    // overflow: 'visible',
  },
  title: {
    color: "white",
    textAlign: "center",
    paddingHorizontal: 20,
    // marginHorizontal: 50,
    // fontFamily: 'cookie',
    // backgroundColor: "green",
    // fontSize: 40,
  },
});

export default PageItem;
