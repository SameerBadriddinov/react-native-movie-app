import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchSearchMovie } from '../api';

export default function Search() {
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const navigation = useNavigation();

	const handleSearch = searchText => {
		if (searchText && searchText.length > 3) {
			setIsLoading(true);
			fetchSearchMovie({
				query: searchText,
				include_adult: false,
				page: '1',
			}).then(data => {
				setIsLoading(false);
				setResults(data.results);
			});
		} else {
			setResults([]);
			setIsLoading(false);
		}
	};

	const handleTextDobounce = useCallback(
		debounce(handleSearch, 400),
		[]
	);

	return (
		<SafeAreaView className={'flex-1 bg-slate-900'}>
			<View
				className={
					'mx-4 mb-3 flex-row justify-between items-center border border-neutral-400 rounded-full'
				}
			>
				<TextInput
					onChangeText={handleTextDobounce}
					placeholder='Search movie'
					placeholderTextColor={'lightgray'}
					className={
						'pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wide'
					}
				/>
				<TouchableOpacity
					onPress={() => navigation.navigate('Home')}
					className={'rounded-full p-3 m-1 bg-neutral-400'}
				>
					<XMarkIcon color={'white'} size={25} />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
