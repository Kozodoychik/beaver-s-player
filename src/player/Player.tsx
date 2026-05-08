import TrackPlayer, { AppKilledPlaybackBehavior, Capability, State } from "@weights-ai/react-native-track-player";
import { AudioFile } from "../types";
import { dummyArtworkURI } from "../resources/dummyArtworkURI";


export async function playerInit() {
	await TrackPlayer.setupPlayer();
	await TrackPlayer.updateOptions({
		android: {
			appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback
		},
		capabilities: [
			Capability.Play,
			Capability.Pause,
			Capability.SeekTo
		]
	});
}

export async function playerPlayTrack(item: AudioFile, title: string, artist: string) {
	await TrackPlayer.add([{url: item.uri, title: title, artist: artist, artwork: item.artwork ? item.artwork : dummyArtworkURI}]);
	await TrackPlayer.skipToNext();
	TrackPlayer.play();
}

export async function playerSeek(position: number) {
	await TrackPlayer.seekTo(position);
}

export async function playerSeekAndPlay(position: number) {
	await playerPause();
	await playerSeek(position);
	await playerPlay();
}

export async function playerPlay() {
	await TrackPlayer.play();
}

export async function playerPause() {
	await TrackPlayer.pause();
}

export async function playerToggle() {
	const state = await TrackPlayer.getPlaybackState();

	if (state.state === State.Playing) TrackPlayer.pause();
	else if (state.state === State.Paused) TrackPlayer.play();
}