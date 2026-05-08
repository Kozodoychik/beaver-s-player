import { useEffect, useState } from 'react';
import { Image, PermissionsAndroid } from 'react-native';
import { getTracksAsync } from '@nodefinity/react-native-music-library';
import { AudioFile } from '../types';
import { dummyArtworkURI } from '../resources/dummyArtworkURI';


const trackSort = (a: AudioFile, b: AudioFile): number => {
	return a.title > b.title ? 1 : -1;
}

export function useAudioFiles(): AudioFile[]{
	const [audioFiles, setAudioFiles] = useState([] as AudioFile[]);

	useEffect(() => {
		const readFiles = async () => {
			let audios: AudioFile[] = [];

			let permissionStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO);

			if (permissionStatus != PermissionsAndroid.RESULTS.GRANTED) {
				return;
			}

			let tracks = await getTracksAsync({first: Number.MAX_SAFE_INTEGER});

			tracks.items.forEach((track) => {
				let artwork = dummyArtworkURI;

				Image.getSize(track.artwork)
				.then(() => artwork = track.artwork)
				.catch(() => {})
				.finally(() => {
					audios.push({
						filename: '', 
			 			uri: track.url, 
			 			title: track.title, 
						artist: track.artist, 
						album: track.album, 
						artwork: artwork, 
						year: 0,
					});
					setAudioFiles(audios.sort(trackSort));
				});
			});
		}

		readFiles();
	}, []);

	return audioFiles;
}