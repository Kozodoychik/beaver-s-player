import { useEffect, useState } from 'react';
import { Image, PermissionsAndroid } from 'react-native';
import { getTracksAsync } from '@nodefinity/react-native-music-library';
import { AudioFile } from '../types';
import { dummyArtworkURI } from '../resources/dummyArtworkURI';


export function useAudioFiles(): [AudioFile[], boolean] {
	const [audioFiles, setAudioFiles] = useState([] as AudioFile[]);
	const [status, setStatus] = useState(false);

	useEffect(() => {
		const readFiles = async () => {
			let audios: AudioFile[] = [];

			let status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO);

			if (status != PermissionsAndroid.RESULTS.GRANTED) {
				setStatus(true);
				return;
			}

			let tracks = await getTracksAsync({first: 20});

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
				});
			});

			setAudioFiles(audios);
			setStatus(true);
		}

		if (!status) readFiles();
	}, []);

	return [audioFiles, status];
}