import {
  Alert,
  Button,
  DeviceEventEmitter,
  EventEmitter,
  NativeEventEmitter,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import MusicSheet from './MusicSheet';
import MusicNote from './MusicNote';

// const lst = ['1', '2'];
const HomeScreen = () => {
  const boxPosX = useSharedValue(100);
  const boxPosY = useSharedValue(100);
  const [notes, setNotes] = React.useState([{name: '1'}, {name: '2'}]);
  // let posEv = new EventEmitter();
  // posEv.addListener('pos', v => {
  //   console.log(v);
  // });
  const [notePoses, setnotePoses] = React.useState([
    {correctPos: [1, 1], currentPose: [-1, -1]},
    {correctPos: [2, 1], currentPose: [-1, -1]},
  ]);

  React.useEffect(() => {
    DeviceEventEmitter.addListener('pos', data => {
      setnotePoses(v => {
        v[data.id].currentPose = [data.curRow, data.curCol];

        return [...v];
      });
    });
  }, []);

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
      <Animated.View
        onLayout={event => {
          console.log(event.nativeEvent.layout);
          boxPosX.value = event.nativeEvent.layout.x;
          boxPosY.value = event.nativeEvent.layout.y;
        }}
        style={styles.box}>
        <MusicSheet />
      </Animated.View>

      {notes.map((ele, ind) => {
        const circPositionX = useSharedValue(200);
        const circPositionY = useSharedValue(200);
        const rowVal = useSharedValue(-1);
        const colVal = useSharedValue(-1);
        const mNoteRef = useRef<Animated.View | null>(null);

        const DemitterWrapper = (arg1: any, arg2: any) => {
          DeviceEventEmitter.emit(arg1, arg2);
        };
        const _onPanHandlerStateChange = useAnimatedGestureHandler({
          onStart: (_, ctx: any) => {
            //   console.log(ctx);
            ctx.startX = circPositionX.value;
            ctx.startY = circPositionY.value;
          },
          onActive: (event, ctx) => {
            circPositionX.value = ctx.startX + event.translationX;
            circPositionY.value = ctx.startY + event.translationY;
          },
          onEnd: (_, ctx) => {
            if (circPositionY.value - boxPosY.value < 150) {
              // console.log(circPositionY.value);
              // console.log(boxPosY.value);
              // console.log(circPositionY.value);
              // mNoteRef.current?.measure((x,y,w,h)=>{
              //   console.log(y);
              // })
              circPositionY.value =
                circPositionY.value -
                (a => (a < 6 ? a : a - 12))(
                  (circPositionY.value - boxPosY.value) % 12,
                );

              circPositionX.value =
                circPositionX.value -
                (a => (a < 43 ? a : a - 86))(
                  (circPositionX.value - boxPosX.value) % 86,
                );
              rowVal.value = Math.floor(
                (circPositionY.value - boxPosY.value) / 12,
              );
              colVal.value = Math.floor(
                (circPositionX.value - boxPosX.value) / 86,
              );
              runOnJS(DemitterWrapper)('pos', {
                id: ind,
                curRow: rowVal.value,
                curCol: colVal.value,
              });
              // setnotePoses(ntPoses=>{
              //   ntPoses[ind].correctPos = [rowVal.value,colVal.value]

              //   return [...ntPoses];
              // })
            } else {
              circPositionY.value = 100;
            }
          },
        });
        const animatedRootStyles = useAnimatedStyle(() => {
          return {
            // transform: [
            //   {translateX: circPositionX.value},
            //   {translateY: circPositionY.value},
            // ],
            top: circPositionY.value,
            left: circPositionX.value,
          };
        });
        return (
          <PanGestureHandler
            key={ind}
            onHandlerStateChange={_onPanHandlerStateChange}>
            <Animated.View
              ref={mNoteRef}
              onLayout={event => {
                // circPositionY.value = event.nativeEvent.layout.y;
                // console.log(event.nativeEvent.layout.y)
              }}
              style={[styles.circle, animatedRootStyles]}>
              <MusicNote name={ele.name} />
            </Animated.View>
          </PanGestureHandler>
        );
      })}

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
  circle: {
    // width: 50,
    // height: 50,
    // borderRadius: 25,
    //backgroundColor: 'blue',
    position: 'absolute',
  },
  box: {
    top: 100,
    alignSelf: 'center',
    //backgroundColor: 'red',
  },
  actionBtn: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    right: 30,
  },
});
