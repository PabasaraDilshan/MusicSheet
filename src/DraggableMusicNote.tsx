import {DeviceEventEmitter, StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import MusicNote from './MusicNote';

const DraggableMusicNote: React.FC<{
  id: number;
  boxPosX: SharedValue<number>;
  boxPosY: SharedValue<number>;
  data: any;
  circPositionX: SharedValue<number>;
  circPositionY: SharedValue<number>;
  initialCircPosX: SharedValue<number>;
  initialCircPosY: SharedValue<number>;
  onHoverNote: (index: number) => void;
}> = ({
  id,
  boxPosX,
  boxPosY,
  data,
  circPositionX,
  circPositionY,
  initialCircPosX,
  initialCircPosY,
  onHoverNote,
}) => {
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
      if (circPositionY.value - boxPosY.value < 144) {
        onHoverNote(
          Math.floor((circPositionX.value - boxPosX.value + 43) / 86),
        );
      }
    },
    onEnd: () => {
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
        rowVal.value = Math.floor((circPositionY.value - boxPosY.value) / 12);
        colVal.value = Math.floor((circPositionX.value - boxPosX.value) / 86);
        // onHoverNote(Math.floor((circPositionX.value - boxPosX.value) / 86));
        onHoverNote(-1);
        runOnJS(DemitterWrapper)('pos', {
          id: id,
          curRow: rowVal.value,
          curCol: colVal.value,
        });
        // setnotePoses(ntPoses=>{
        //   ntPoses[ind].correctPos = [rowVal.value,colVal.value]

        //   return [...ntPoses];
        // })
      } else {
        circPositionX.value = initialCircPosX.value;
        circPositionY.value = initialCircPosY.value;
      }

      onHoverNote(-1);
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
    <>
      <PanGestureHandler
        key={id}
        onHandlerStateChange={_onPanHandlerStateChange}>
        <Animated.View
          ref={mNoteRef}
          // onLayout={event => {
          //   // circPositionY.value = event.nativeEvent.layout.y;
          //   // console.log(event.nativeEvent.layout.y)
          // }}
          onTouchEnd={() => {
            'worklet';
            circPositionX.value = initialCircPosX.value;
            circPositionY.value = initialCircPosY.value;
          }}
          style={[styles.circle, animatedRootStyles]}>
          <MusicNote name={data.name} />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default DraggableMusicNote;

const styles = StyleSheet.create({
  circle: {
    // width: 50,
    // height: 50,
    // borderRadius: 25,
    //backgroundColor: 'blue',
    position: 'absolute',
  },
});
