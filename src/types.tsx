export interface AudioFile {
	filename: string;
	uri: string;
	title: string | null;
	artist: string | null;
	album: string | null;
	artwork: string | null;
	year: number | null;
}