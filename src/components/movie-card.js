import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { image500 } from '../api';

const { width, height } = Dimensions.get('window');

export default function MovieCard({ item }) {
	return (
		<View>
			<Image
				source={{ uri: image500(item.poster_path) }}
				style={{ width: width * 0.7, height: height * 0.5 }}
				className={'rounded-3xl'}
			/>
		</View>
	);
}
