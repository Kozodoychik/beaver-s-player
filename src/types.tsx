export interface AudioFile {
	filename: string;
	uri: string;
	title: string;
	artist: string | null;
	album: string | null;
	artwork: string | null;
	year: number | null;
}