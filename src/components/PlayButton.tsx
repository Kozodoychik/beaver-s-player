import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";
import { State, usePlaybackState } from "@weights-ai/react-native-track-player";
import { StyleProp, StyleSheet, TouchableOpacity } from "react-native";
import { style } from "../resources/styles";
import { playerToggle } from "../player/Player";

interface PlayButtonProps {
	style: {},
	color: string;
	size: number;
}

export const PlayButton = (props: PlayButtonProps) => {
	const state = usePlaybackState();
	const isPlaying = state.state === State.Playing;

	return (
		<TouchableOpacity style={props.style} onPress={playerToggle}>
			<FontAwesomeFreeSolid name={isPlaying ? "pause" : "play"} color={props.color} size={props.size}/>
		</TouchableOpacity>
	);
}