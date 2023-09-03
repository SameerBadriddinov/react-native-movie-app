import React from 'react';
import { Button, Text, View } from 'react-native';

export default function Home({ navigation }) {
	return (
		<View className='flex-1 items-center justify-center bg-slate-500'>
			<Text>Home</Text>
			<Button
				title='Go to Details'
				onPress={() => navigation.navigate('Details')}
			/>
		</View>
	);
}
