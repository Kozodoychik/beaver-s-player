import { Dimensions, StyleSheet } from 'react-native';

const SCREEN_WIDTH = Dimensions.get("window").width;
const FULL_PLAYER_WIDTH = SCREEN_WIDTH * 0.85;		// 85% от ширины экрана

export const style = StyleSheet.create({
	mainView: {
		height: "100%",
		paddingBottom: 40,
		backgroundColor: "#111",
		color: "#fff"
	},

	musicList: {
		flex: 1,
		minHeight: "70%",
		marginBottom: 80
	},

	musicListItem: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-start",

		paddingBlock: 10,
		paddingInline: 25,
		paddingBottom: 10,
		gap: 10,

		borderTopColor: "#333",
		borderTopWidth: 1,
		borderBottomColor: "#333",
		borderBottomWidth: 0.5
	},

	musicListTextData: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		height: "100%"
	},

	musicListItemArtwork: {
		width: 50,
		height: 50,

		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#333"
	},

	musicListItemTitle: {
		fontSize: 16,
		fontWeight: "500",

		color: "#fff"
	},

	musicListItemArtist: {
		color: "#888"
	},

	toolbar: {
		padding: 20,
		paddingTop: 40,
		borderBottomWidth: 1,
		borderBottomColor: "#444",
		backgroundColor: "#222"
	},

	toolbarHeader: {
		fontSize: 25,
		fontWeight: "600",
		color: "#fff",
	},

	player: {
		flex: 1,
		position: "absolute",
		
		left: 0,
		right: 0,

		height: "100%",

		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,

		alignItems: "center",

		paddingInline: 20,
		paddingBlock: 15,
	},

	miniPlayer: {
		flex: 0,
		flexDirection: "row",
		
		height: 50,
		gap: 20,
	},

	miniPlayerTrackInfo: {
		flex: 1,
		flexDirection: "column",
		height: 50,
		
		justifyContent: "center"
	},

	playerArtwork: {
		width: 50,
		height: 50,

		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#333"
	},

	playButton: {
		width: 50,
		height: 50,

		alignItems: "center",
		justifyContent: "center"
	},

	fullPlayer: {
		flex: 1,
		flexDirection: "column",

		justifyContent: "space-around",
		alignItems: "center",

		width: FULL_PLAYER_WIDTH,
		height: "100%",
	},

	fullPlayerArtwork: {
		width: FULL_PLAYER_WIDTH,
		height: FULL_PLAYER_WIDTH,

		borderRadius: 10,
		elevation: 10 
	},

	fullPlayerInfo: {
		width: "100%",
		gap: 10,
	},

	fullPlayerTitle: {
		fontSize: 30,
		fontWeight: 800
	},

	fullPlayerArtist: {
		fontSize: 15,
	},

	fullPlayerPosition: {

	},

	fullPlayerControls: {
		alignSelf: "center",
		flexDirection: "row",
		gap: 40
	}

});