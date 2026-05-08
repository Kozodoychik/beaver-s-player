import { View, Image, Text, TouchableOpacity } from 'react-native';
import { style } from '../resources/styles.ts';
import { playerPlayTrack } from '../player/Player.tsx';


export const MusicListEntry = ({item}: any) => {
	let artist = item.artist ? item.artist : "<Неизвестен>";
	let title = item.title ? item.title : item.filename;
	let album = item.album ? item.album : "<Неизвестно>";

	return (
		<TouchableOpacity onPress={() => {playerPlayTrack(item, title, artist)}} style={style.musicListItem}>
			<Image style={style.musicListItemArtwork} source={{ uri: item.artwork }} />
			<View style={style.musicListTextData}>
				<Text numberOfLines={1} ellipsizeMode='tail' style={style.musicListItemTitle}>{title}</Text>
				<Text numberOfLines={1} ellipsizeMode='tail' style={style.musicListItemArtist}>{artist + " | " + album}</Text>
			</View>
		</TouchableOpacity>
	);
}