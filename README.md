# React Native Screen Orientation Listener
Detects screen orientation changes in React Native without making changes in native code. 

## Installation
``yarn add react-native-screen-orientation-listener``

or

``npm install react-native-screen-orientation-listener --save``

## Usage 
import { ScreenOrientation } from 'react-native-screen-orientation-listener';

```
<ScreenOrientation onChange={onChange}>
    {/* Your app root */}
</ScreenOrientation>

const onChange = orientation => console.log("New screen orientation: " orientation)
```
