import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home({ navigation }) {
	return (
		<View className='flex-1 bg-slate-950'>
			<SafeAreaView>
				<StatusBar style='light' />
				<View
					className={
						'flex-row justify-between items-center mx-4 border-b-2'
					}
				>
					<Image source={require('../../assets/logo.png')} />
					<MagnifyingGlassIcon
						size={30}
						strokeWidth={2}
						color={'white'}
					/>
				</View>
			</SafeAreaView>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 20 }}
			></ScrollView>
		</View>
	);
}
