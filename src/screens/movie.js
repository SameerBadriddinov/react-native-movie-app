import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
	Dimensions,
	Image,
	ScrollView,
	TouchableOpacity,
	View,
} from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	fetchMovieCredits,
	fetchMovieDetail,
	fetchSimilarMovie,
	image500,
} from '../api';
import Loader from '../components/loader';

const { width, height } = Dimensions.get('window');

export default function Movie() {
	const [isFavourite, setIsFavourite] = useState(false);
	const [movie, setMovie] = useState({});
	const [cast, setCast] = useState([]);
	const [similarMovie, setSimilarMovie] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const navigation = useNavigation();
	const { params: id } = useRoute();

	useEffect(() => {
		getMovieDetail();
		getMovieCredits();
		getSimilarMovie();
	}, [id]);

	const getMovieDetail = async () => {
		const data = await fetchMovieDetail(id);
		setMovie(data);
		setIsLoading(false);
	};

	const getMovieCredits = async () => {
		const data = await fetchMovieCredits(id);
		setCast(data.cast);
	};

	const getSimilarMovie = async () => {
		const data = await fetchSimilarMovie(id);
		setSimilarMovie(data.results);
	};

	return (
		<ScrollView
			contentContainerStyle={{ paddingBottom: 20 }}
			className={'flex-1 bg-slate-900'}
		>
			<View className={'w-full'}>
				<SafeAreaView
					className={
						'absolute z-20 w-full flex-row justify-between items-center px-4'
					}
				>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<ChevronLeftIcon
							color={'#fff'}
							strokeWidth={2.5}
							size={30}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => setIsFavourite(prev => !prev)}
					>
						<HeartIcon
							color={isFavourite ? 'red' : 'white'}
							strokeWidth={2.5}
							size={35}
						/>
					</TouchableOpacity>
				</SafeAreaView>
				{isLoading ? (
					<Loader />
				) : (
					<View>
						<Image
							source={{ uri: image500(movie.poster_path) }}
							style={{ width, height: height * 0.5 }}
						/>
						<LinearGradient
							colors={[
								'transparent',
								'rgba(23, 23, 23, 0.8)',
								'rgba(23, 23, 23, 1)',
							]}
							style={{ width, height: height * 0.4 }}
							start={{ x: 0.5, y: 0 }}
							end={{ x: 0.5, y: 1 }}
							className={'absolute bottom-0'}
						/>
					</View>
				)}
			</View>
		</ScrollView>
	);
}
