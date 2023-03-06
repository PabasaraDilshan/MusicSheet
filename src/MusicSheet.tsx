import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import MusicSheetPart from './MusicSheetPart';
import Animated from 'react-native-reanimated';
const MusicSheet: React.FC<{styles: StyleProp<ViewStyle>[]}> = ({styles}) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Animated.View style={{flexDirection: 'row'}}>
      <Animated.View style={styles[0]}>
        <MusicSheetPart />
      </Animated.View>
      <Animated.View style={styles[1]}>
        <MusicSheetPart />
      </Animated.View>
      <Animated.View style={styles[2]}>
        <MusicSheetPart />
      </Animated.View>
      <Animated.View style={styles[3]}>
        <MusicSheetPart />
      </Animated.View>
    </Animated.View>
  );
};

export default MusicSheet;
