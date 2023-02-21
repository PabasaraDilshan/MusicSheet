import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

const MusicSheet = () => {
  return (
    <Svg
    width={344}
    height={150}
    viewBox="0 0 344 150"
    fill="none"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M86 23H0V25H86V23ZM86 47H0V49H86V47ZM0 71H86V73H0V71ZM86 95H0V97H86V95ZM0 119H86V121H0V119Z"
      fill="black"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M172 23H86V25H172V23ZM172 47H86V49H172V47ZM86 71H172V73H86V71ZM172 95H86V97H172V95ZM86 119H172V121H86V119Z"
      fill="black"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M258 23H172V25H258V23ZM258 47H172V49H258V47ZM172 71H258V73H172V71ZM258 95H172V97H258V95ZM172 119H258V121H172V119Z"
      fill="black"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M344 23H258V25H344V23ZM344 47H258V49H344V47ZM258 71H344V73H258V71ZM344 95H258V97H344V95ZM258 119H344V121H258V119Z"
      fill="black"
    />
  </Svg>
  );
};

export default MusicSheet;

const styles = StyleSheet.create({});
