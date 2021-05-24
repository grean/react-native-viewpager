import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Picker from '@grean/react-native-carousel-picker';
import ViewPager from '@grean/react-native-viewpager';
import { useFonts } from 'expo-font';



export default function App() {

  const currentItemIndex = 1
  const [itemIndex, setItemIndex] = useState(currentItemIndex)
  const currentPageIndex = 1
  const [pageIndex, setPageIndex] = useState(currentPageIndex)
  const display = "TOP_BOTTOM"
  const spaceBetween = 1 / 3
  const opacityRangeOut = [0, 0.6, 1, 0.6, 0]
  const scaleRangeOut = [0, 0.6, 1, 0.6, 0]
  const profils = [
    {
      "title": "Retraité sportif sportif",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
    },
    {
      "title": "Adolescent",
      "desc": "Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor."
    },
    {
      "title": "Salarié debout",
      "desc": "Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue."
    },
    {
      "title": "Retraité sportif2",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
    },
    {
      "title": "Adolescent2",
      "desc": "Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor."
    },
    {
      "title": "Salarié debout2",
      "desc": "Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue."
    }
  ]
  const items = profils.map(item => item.title)
  const marginVerticalPercentage = 0
  const marginHorizontalPercentage = 0.05

  const onChanged = (itemIndex: number) => {
    setItemIndex(itemIndex)
    console.log(`PICKER onChanged itemIndex ${itemIndex}`)
  }

  const onPageChanged = (itemIndex: number) => {
    setPageIndex(itemIndex)
    console.log(`VIEWPAGER onChanged itemIndex ${itemIndex}`)
  }

  let [fontsLoaded] = useFonts({
    // 'dancingVar': require('./fonts/DancingScript-VariableFont_wght.ttf'),
    'cookie': require('./fonts/Cookie-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <ViewPager
          {...{
            containerStyle: {
              flex: 0.85,
              // flex: 0.765,
              // backgroundColor: '#fff',
              overflow: 'hidden',
              // alignItems: 'center',
              // backgroundColor: 'pink',
              // backgroundColor: 'transparent',
            },
            childStyle: {
              flex: 1,
              // marginVertical,
              // paddingTop: itemHeight,
              // backgroundColor: "green",
              flexDirection: 'row',
              // justifyContent: 'flex-end',
            },
            currentPageIndex,
            onChanged: onPageChanged,
          }}
        >
          <View style={styles.page}>
            <Text style={styles.text}>lol1</Text>
          </View>
          <View style={styles.page}>
            <View style={styles.header}>
            </View>
            <View style={styles.picker}>
              <Text>lol</Text>
              {/* <Picker
                {...{
                  items,
                  currentItemIndex,
                  onChanged,
                  marginVerticalPercentage,
                  marginHorizontalPercentage,
                  display,
                  opacityRangeOut,
                  scaleRangeOut,
                  spaceBetween,
                  textStyle: {
                    fontFamily: 'cookie',
                    // ...textShadow
                  },
                  containerStyle: {
                    backgroundColor: 'green',
                    // ...carouPicker,
                    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    // textShadowOffset: { width: 3, height: 3 },
                    // textShadowRadius: 10,
                  },
                  fontScale: 1,
                }}
              /> */}
            </View>
            <View style={styles.bottom}>
            </View>
            {/* <View style={styles.footer}>
            </View> */}
          </View>
          <View style={styles.page}>
            <Text style={styles.text}>lol3</Text>
          </View>
        </ViewPager>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 80,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'flex-end',
  },
  background: {
    height: '70%',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  header: {
    flex: 0.75,
    backgroundColor: 'blue',
    justifyContent: 'center',
  },
  picker: {
    flex: 1,
  },
  bottom: {
    flex: 1.5,
    backgroundColor: 'purple',
  },
  // footer: {
  // flex: 0.5,
  // backgroundColor: 'orange',
  // },
  page: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});
