import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, ViewProperties } from 'react-native';

export enum Orientation {
  PORTRAIT = 'PORTRAIT',
  LANDSCAPE = 'LANDSCAPE',
}

type Props = {
  onChange: (orientation: Orientation) => void,
} & ViewProperties

type State = {
  orientation: Orientation,
}

type Event = { nativeEvent: { layout: { width: number, height: number } } }

export class ScreenOrientation extends Component<Props, State> {

  state = {
    orientation: getScreenOrientation()
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
    const newOrientation = getOrientation({ height, width });
    if (newOrientation !== this.state.orientation) {
      this.setState({ orientation: newOrientation })
      this.props.onChange(newOrientation)
    }
  }
}

const styles = StyleSheet.create({
  container: StyleSheet.absoluteFillObject
})

const getOrientation = ({ height, width }: { width: number, height: number }): Orientation => {
  return height >= width ? Orientation.PORTRAIT : Orientation.LANDSCAPE;
}

export const isPortrait = () => getScreenOrientation() === Orientation.PORTRAIT

export const isLandscape = () => getScreenOrientation() === Orientation.LANDSCAPE

export const getScreenOrientation = (): Orientation => getOrientation(Dimensions.get('screen'))
