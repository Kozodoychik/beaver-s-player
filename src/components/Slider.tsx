import { useEffect, useRef, useState } from "react";
import { ColorValue, Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface SliderProps {
	maxValue: number;
	value: number;
	onSlideStart: () => void;
	onSlideEnd: (value: number) => void;
	color: ColorValue;
}

export const Slider = (props: SliderProps) => {
	const ref = useRef(null);
	const progress = useSharedValue(props.value);
	const [sliderWidth, setSliderWidth] = useState(0);

	useEffect(() => {progress.value = props.value}, [props.value]);

	const slideGesture = Gesture.Pan()
		.onStart((e) => {
			scheduleOnRN(props.onSlideStart);
		})
		.onChange((e) => {
			const p = e.x / sliderWidth;
			progress.value = Math.min(Math.max(p * props.maxValue, 0), props.maxValue);
		})
		.onEnd((e) => {scheduleOnRN(props.onSlideEnd, progress.value)});

	const tapGesture = Gesture.Tap()
		.onStart((e) => {
			scheduleOnRN(props.onSlideStart);
		})
		.onEnd((e) => {
			const p = e.x / sliderWidth;
			progress.value = Math.min(Math.max(p * props.maxValue, 0), props.maxValue);
			scheduleOnRN(props.onSlideEnd, progress.value);
		});

	const composedGestures = Gesture.Simultaneous(slideGesture, tapGesture);

	const valueStyle = useAnimatedStyle(() => ({
		width: `${((progress.value / props.maxValue) * 100)}%`
	}))

	return (
		<GestureDetector gesture={composedGestures}>
			<View onLayout={(e) => { setSliderWidth(e.nativeEvent.layout.width) }} style={{...sliderStyle.sliderEmpty, backgroundColor: interpolateColor(0.5, [0, 1], [props.color.toString(), "#00000000"])}}>
				<Animated.View style={[{...sliderStyle.sliderFilled, backgroundColor: props.color}, valueStyle]}></Animated.View>
			</View>
		</GestureDetector>
	);
}

const sliderStyle = StyleSheet.create({
	sliderFilled: {
		paddingInline: 7.5,

		width: 0,
		height: "100%",

		borderRadius: 10
	},

	sliderEmpty: {
		height: 15,
		borderRadius: 10,
		marginBlock: 10,
		
	}
});