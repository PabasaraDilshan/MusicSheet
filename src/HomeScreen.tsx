import {
  Alert,
  Button,
  DeviceEventEmitter,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import MusicSheet from './MusicSheet';
import DraggableMusicNote from './DraggableMusicNote';

// const lst = ['1', '2'];
const HomeScreen = () => {
  const boxPosX = useSharedValue(100);
  const boxPosY = useSharedValue(100);
  const circPositionX = useSharedValue(0);
  const circPositionY = useSharedValue(0);
  const initialCircPosX = useSharedValue(0);
  const initialCircPosY = useSharedValue(0);
  const col1BG = useSharedValue('');
  const col2BG = useSharedValue('');
  const col3BG = useSharedValue('');
  const col4BG = useSharedValue('');
  const [notes, _] = React.useState([{name: '1'}]);
  // let posEv = new EventEmitter();
  // posEv.addListener('pos', v => {
  //   console.log(v);
  // });
  const [notePoses, setnotePoses] = React.useState([
    {correctPos: [1, 1], currentPose: [-1, -1]},
  ]);

  React.useEffect(() => {
    DeviceEventEmitter.addListener('pos', data => {
      setnotePoses(v => {
        v[data.id].currentPose = [data.curRow, data.curCol];

        return [...v];
      });
    });
  }, []);
  const col1Style = useAnimatedStyle(() => {
    return {
      backgroundColor: col1BG.value,
    };
  });
  const col2Style = useAnimatedStyle(() => {
    return {
      backgroundColor: col2BG.value,
    };
  });
  const col3Style = useAnimatedStyle(() => {
    return {
      backgroundColor: col3BG.value,
    };
  });
  const col4Style = useAnimatedStyle(() => {
    return {
      backgroundColor: col4BG.value,
    };
  });
  // const _onBoxPanHandlerStateChange = useAnimatedGestureHandler({
  //   onStart: (_, ctx: any) => {},
  //   onActive: (event, ctx) => {
  //     // console.log(event);
  //   },
  //   onEnd: _ => {},
  // });
  // React.useEffect(() => {
  //   console.log(notePoses)

  // }, [notePoses])

  return (
    <Animated.View style={styles.container}>
      <Text style={styles.title}>Place the note on the staff</Text>
      <Animated.View
        onLayout={event => {
          boxPosX.value = event.nativeEvent.layout.x;
          boxPosY.value = event.nativeEvent.layout.y;
        }}
        style={styles.box}>
        <MusicSheet styles={[col1Style, col2Style, col3Style, col4Style]} />
      </Animated.View>
      <Animated.View
        style={styles.placeholderContainer}
        onLayout={event => {
          console.log(event.nativeEvent.layout);
          circPositionX.value =
            event.nativeEvent.layout.x +
            (event.nativeEvent.layout.width - 86) / 2;
          circPositionY.value = event.nativeEvent.layout.y;
          initialCircPosX.value =
            event.nativeEvent.layout.x +
            (event.nativeEvent.layout.width - 86) / 2;
          initialCircPosY.value = event.nativeEvent.layout.y;
        }}>
        <Animated.View style={styles.placeholder} />
        <Text style={styles.noteName}>Note Name Testing</Text>
      </Animated.View>
      {notes.map((ele, ind) => (
        <DraggableMusicNote
          id={ind}
          data={ele}
          boxPosX={boxPosX}
          boxPosY={boxPosY}
          circPositionX={circPositionX}
          circPositionY={circPositionY}
          initialCircPosX={initialCircPosX}
          initialCircPosY={initialCircPosY}
          onHoverNote={index => {
            'worklet';
            console.log(index);
            switch (index) {
              case 0:
                col1BG.value = '#C8C8C8';
                col2BG.value = 'white';
                col3BG.value = 'white';
                col4BG.value = 'white';
                break;
              case 1:
                col1BG.value = 'white';
                col2BG.value = '#C8C8C8';
                col3BG.value = 'white';
                col4BG.value = 'white';
                break;
              case 2:
                col1BG.value = 'white';
                col2BG.value = 'white';
                col3BG.value = '#C8C8C8';
                col4BG.value = 'white';
                break;
              case 3:
                col1BG.value = 'white';
                col2BG.value = 'white';
                col3BG.value = 'white';
                col4BG.value = '#C8C8C8';
                break;
              case -1:
                col1BG.value = 'white';
                col2BG.value = 'white';
                col3BG.value = 'white';
                col4BG.value = 'white';
                break;
              default:
                break;
            }
          }}
          key={ind}
        />
      ))}

      <View style={styles.actionBtn}>
        <Button
          title="Confirm"
          onPress={() => {
            console.log(notePoses);
            Alert.alert(JSON.stringify(notePoses));
          }}
        />
      </View>
    </Animated.View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    marginTop: 20,
    alignSelf: 'center',
    //backgroundColor: 'red',
  },
  actionBtn: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    right: 30,
  },
  placeholderContainer: {
    marginTop: 30,
    alignSelf: 'center',
  },
  placeholder: {
    width: 86,
    height: 180,
    backgroundColor: '#C8C8C8',
    alignSelf: 'center',
    borderRadius: 10,
  },
  noteName: {alignSelf: 'center'},
  title: {
    fontSize: 30,
    padding: 10,
  },
});
