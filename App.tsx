/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import HomeScreen from './src/HomeScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <HomeScreen />
    </GestureHandlerRootView>
  );
}

export default App;
