import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	fetchPopularMovie,
	fetchTopRatedMovie,
	fetchTrendingMovie,
	fetchUpcomingMovie,
} from '../api';
import TrendingMovie from '../components/trending-movie';
import UpcomingMovie from '../components/upcoming-movie';

export default function Home({ navigation }) {
	const [trending, setTrending] = useState([]);
	const [upcoming, setUpcoming] = useState([]);
	const [topRated, setTopRated] = useState([]);
	const [popular, setPopular] = useState([]);

	useEffect(() => {
		getTrendingMovie();
		getUpcomingMovie();
		getTopRatedMovie();
		getPopularMovie();
	}, []);

	const getTrendingMovie = async () => {
		const data = await fetchTrendingMovie();
		setTrending(data.results);
	};

	const getUpcomingMovie = async () => {
		const data = await fetchUpcomingMovie();
		setUpcoming(data.results);
	};

	const getTopRatedMovie = async () => {
		const data = await fetchTopRatedMovie();
		setTopRated(data.results);
	};

	const getPopularMovie = async () => {
		const data = await fetchPopularMovie();
		setPopular(data.results);
	};

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
			>
				{trending.length > 0 && <TrendingMovie trending={trending} />}
				{upcoming.length > 0 && (
					<UpcomingMovie
						upcoming={upcoming}
						title={'Upcoming movie'}
					/>
				)}
				{upcoming.length > 0 && (
					<UpcomingMovie
						upcoming={trending.reverse()}
						title={'Trending movie'}
					/>
				)}
				{popular.length > 0 && (
					<UpcomingMovie upcoming={popular} title={'Popular movie'} />
				)}
				{topRated.length > 0 && <TrendingMovie trending={topRated} />}
			</ScrollView>
		</View>
	);
}
