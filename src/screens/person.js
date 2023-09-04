import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react/cjs/react.development';
import { fetchPersonDetail, fetchPersonMovies } from '../api';
import Loader from '../components/loader';

export default function Person() {
	const [isLoading, setIsLoading] = useState(true);
	const [person, setPerson] = useState({});
	const [personMovies, setPersonMovies] = useState([]);
	const [isFavourite, setIsFavourite] = useState(false);

	const { params: id } = useRoute();
	const navigation = useNavigation();

	useEffect(() => {
		getPersonDetail();
		getPersonMovies();
	}, [id]);

	const getPersonDetail = async () => {
		const data = await fetchPersonDetail(id);
		setPerson(data);
		setIsLoading(false);
	};

	const getPersonMovies = async () => {
		const data = await fetchPersonMovies(id);
		setPersonMovies(data.cast);
	};

	return (
		<ScrollView
			className={'flex-1 bg-slate-900'}
			contentContainerStyle={{ paddingBottom: 20 }}
		>
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
			{isLoading ? <Loader /> : <Text>Person</Text>}
		</ScrollView>
	);
}
