import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";
import { State, usePlaybackState } from "@weights-ai/react-native-track-player";
import { TouchableOpacity } from "react-native";
import { style } from "../resources/styles";
import { playerToggle } from "../player/Player";

interface NextButtonProps {
	color: string;
	size: number;
}

export const NextButton = (props: NextButtonProps) => {
	const state = usePlaybackState();

	return (
		<TouchableOpacity style={style.playButton} onPress={playerToggle}>
			<FontAwesomeFreeSolid name={"step-forward"} color={props.color} size={props.size}/>
		</TouchableOpacity>
	);
}