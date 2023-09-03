import React from 'react';
import { StatusBar, Text, View } from 'react-native';

export default function Home() {
	return (
		<View className='flex-1 items-center justify-center bg-slate-500'>
			<Text>Open up App.js to start working on your app!</Text>
			<StatusBar style='auto' />
		</View>
	);
}
