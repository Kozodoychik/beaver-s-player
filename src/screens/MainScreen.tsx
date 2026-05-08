import { View, StatusBar, FlatList } from 'react-native';
import { style } from '../resources/styles.ts';
import { Header } from '../components/Header.tsx';
import { MusicListEntry } from '../components/MusicListEntry.tsx';
import { useAudioFiles } from '../hooks/useAudioFiles.tsx';
import { Player } from '../components/Player.tsx';
import { playerInit } from '../player/Player.tsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export function MainScreen() {
	const audioFiles = useAudioFiles();

	return (
		<GestureHandlerRootView style={style.mainView}>
			<StatusBar barStyle="dark-content" />
			<View style={style.toolbar}>
				<Header />
			</View>
			<View style={style.musicList}>
				<FlatList data={audioFiles} renderItem={MusicListEntry}/>
			</View>
			<Player />
		</GestureHandlerRootView>
	);
}

playerInit();