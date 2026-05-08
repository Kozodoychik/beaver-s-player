import { Canvas, Paint, Path, Skia } from '@shopify/react-native-skia';
import { Text } from 'react-native';

export const Spectre = () => {

	const path = Skia.PathBuilder.Make();
	path.moveTo(20, 20);
	path.lineTo(100, 200);
	path.close();
	const p = path.build();

	return (
		<>
		<Text></Text>
		<Canvas style={{flex: 1}}>
			<Path path={p} color="#000">
				<Paint style="stroke" strokeWidth={10} color="#000" />
			</Path>
		</Canvas>
		</>
	);
;}