import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";
import { State, usePlaybackState } from "@weights-ai/react-native-track-player";
import { TouchableOpacity } from "react-native";
import { style } from "../resources/styles";
import { playerToggle } from "../player/Player";

interface PrevButtonProps {
	color: string;
	size: number;
}

export const PrevButton = (props: PrevButtonProps) => {
	const state = usePlaybackState();

	return (
		<TouchableOpacity style={style.playButton} onPress={playerToggle}>
			<FontAwesomeFreeSolid name={"step-backward"} color={props.color} size={props.size}/>
		</TouchableOpacity>
	);
}