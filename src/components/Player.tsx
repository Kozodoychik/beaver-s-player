import { View, Image, Text, Dimensions, Alert } from 'react-native';
import { style } from '../resources/styles.ts';
import { useActiveTrack, useProgress } from '@weights-ai/react-native-track-player';
import { PlayButton } from './PlayButton.tsx';
import { dummyArtworkURI } from '../resources/dummyArtworkURI.tsx';
import React, { useEffect, useState } from 'react';
import { createPalette } from 'react-native-material-palette';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Slider } from './Slider.tsx';
import { playerPause, playerSeekAndPlay } from '../player/Player.tsx';
import { NextButton } from './NextButton.tsx';
import { PrevButton } from './PrevButton.tsx';

const SCREEN_HEIGHT = Dimensions.get("window").height;

export const Player = () => {
	const playerHeight = useSharedValue((SCREEN_HEIGHT - 120));
	const startPlayerHeight = useSharedValue(0);
	const [backgroundColor, setBgColor] = useState("#333");
	const [foregroundColor, setFgColor] = useState("#fff");
	const track = useActiveTrack();
	const progress = useProgress(0.0001);
	const artwork = track?.artwork ? track.artwork : dummyArtworkURI;

	useEffect(() => {
		const getColor = async () => {
			let colors = await createPalette({ uri: artwork }, { maximumColorCount: 32 });
			let bgColor = colors.darkVibrant ? colors.darkVibrant.color : "#333";
			let fgColor = colors.darkVibrant ? colors.darkVibrant.bodyTextColor : "#fff";
			setBgColor(bgColor);
			setFgColor(fgColor);
		};

		getColor();
	}, [track]);

	const panGesture = Gesture.Pan()
		.onStart((e) => {
			startPlayerHeight.value = playerHeight.value;
		})
		.onUpdate((e) => {
			if (Math.abs(e.translationY) < 50) return;

			playerHeight.value = startPlayerHeight.value + e.translationY;

			if (playerHeight.value < 0) playerHeight.value = 0;
			else if (playerHeight.value > (SCREEN_HEIGHT - 120)) playerHeight.value = (SCREEN_HEIGHT - 120);
		})
		.onEnd((e) => {
			if (e.velocityY > 0) {
				playerHeight.value = withSpring((SCREEN_HEIGHT - 120));
			} else if (e.velocityY < 0 || playerHeight.value < -(SCREEN_HEIGHT - 100)) {
				playerHeight.value = withSpring(0);
			}
		});

	const tapGesture = Gesture.Tap()
		.onStart((e) => playerHeight.value = withSpring(0));

	const fullPlayerStyle = useAnimatedStyle(() => ({
		transform: [{translateY: playerHeight.value}],
	}));

	const miniPlayerStyle = useAnimatedStyle(() => ({
		opacity: playerHeight.value / (SCREEN_HEIGHT - 120),
	}));

	const title = track?.title ? track.title : "<Ничего>";
	const artist = track?.artist ? track.artist : "<Никто>";

	return (
		<GestureDetector gesture={panGesture}>
			<Animated.View style={[style.player, {backgroundColor: backgroundColor}, fullPlayerStyle]}>
				<Animated.View style={[style.miniPlayer, miniPlayerStyle]}>
					<Image style={style.playerArtwork} source={{ uri: artwork }}/>
					<View style={style.miniPlayerTrackInfo}>
						<Text numberOfLines={1} ellipsizeMode='tail' style={{...style.musicListItemTitle, color: foregroundColor}}>{title}</Text>
						<Text numberOfLines={1} ellipsizeMode='tail' style={{...style.musicListItemArtist, color: foregroundColor}}>{artist}</Text>
					</View>
					<PlayButton color={foregroundColor} size={25}/>
				</Animated.View>
				<View style={style.fullPlayer}>
					<Image style={style.fullPlayerArtwork} source={{ uri: artwork }}/>
					<View style={style.fullPlayerInfo}>
						<Text numberOfLines={2} ellipsizeMode='tail' style={{...style.fullPlayerTitle, color: foregroundColor}}>{title}</Text>
						<Text numberOfLines={1} ellipsizeMode='tail' style={{...style.fullPlayerArtist, color: foregroundColor}}>{artist}</Text>
						<Slider color={foregroundColor} maxValue={progress.duration} value={progress.position} onSlideStart={playerPause} onSlideEnd={playerSeekAndPlay}/>
						<Text style={{...style.fullPlayerPosition, color: foregroundColor}}>{Math.floor(progress.position / 60)}:{Math.floor(progress.position % 60).toString().padStart(2, '0')}</Text>
						<View style={style.fullPlayerControls}>
							<PrevButton color={foregroundColor} size={45} />
							<PlayButton color={foregroundColor} size={45} />
							<NextButton color={foregroundColor} size={45} />
						</View>
					</View>
				</View>
			</Animated.View>
		</GestureDetector>
	);
}