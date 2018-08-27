import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, ViewProperties, Keyboard, Platform } from 'react-native';

export enum Orientation {
  PORTRAIT = 'PORTRAIT',
  LANDSCAPE = 'LANDSCAPE',
}

type Props = {
  onRotate: (orientation: Orientation) => void,
} & ViewProperties

type State = {
  orientation: Orientation,
  keyboardHeight: number,
}

type Event = { nativeEvent: { layout: { width: number, height: number } } }

export class ScreenOrientation extends Component<Props, State> {
  keyboardDidHideListener: any;
  keyboardDidShowListener: any;

  state = {
    orientation: getScreenOrientation(),
    keyboardHeight: 0,
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  keyboardDidShow = (e: any) => {
    if (Platform.OS === 'android') this.setState({ keyboardHeight: e.endCoordinates.height })
  }

  keyboardDidHide = () => this.setState({ keyboardHeight: 0 })

  componentWillUnMount() {
    this.keyboardDidHideListener.remove()
    this.keyboardDidShowListener.remove()
  }

  render() {
    return (
      <View
        {...this.props}
        onLayout={this.onLayout}
        style={[styles.container, this.props.style]}
        pointerEvents={'box-none'} />
    );
  }

  onLayout = (event: Event) => {
    const { nativeEvent: { layout: { width, height } } } = event;
    const fullHeight = height + this.state.keyboardHeight;
    const newOrientation = getOrientation({ height: fullHeight, width });
    if (newOrientation !== this.state.orientation) {
      this.setState({ orientation: newOrientation })
      this.props.onRotate(newOrientation)
    }
  }
}

const styles = StyleSheet.create({
  container: StyleSheet.absoluteFillObject
})

export const getOrientation = ({ height, width }: { width: number, height: number }): Orientation =>
  height >= width ? Orientation.PORTRAIT : Orientation.LANDSCAPE;

/** These functions might not return correct value when keybaord is shown on android */
export const getScreenOrientation = (): Orientation => getOrientation(Dimensions.get('screen'))
export const isPortrait = () => getScreenOrientation() === Orientation.PORTRAIT
export const isLandscape = () => getScreenOrientation() === Orientation.LANDSCAPE
