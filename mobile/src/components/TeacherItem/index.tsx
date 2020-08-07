import React, { useState } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
    const [isFavorited, setIsFavorites] = useState(favorited);

    function handleLinkToWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=+55${teacher.whatsapp}`);
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');
        let favoritesArray: Teacher[] = [];
        if (favorites)  {
            favoritesArray = JSON.parse(favorites);
        }
        if (isFavorited) {
            // remove
            const favoriteIndex = favoritesArray.findIndex((teacherItem) => {
                return teacherItem.id === teacher.id;
            });
            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorites(false);
        } else {
            // add
            favoritesArray.push(teacher);
            setIsFavorites(true);
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: teacher.avatar }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                    <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton
                        style={[
                            styles.favoriteButton,
                            isFavorited ? styles.favorited : {}
                        ]}
                        onPress={handleToggleFavorite}
                    >
                        {isFavorited
                            ? <Image source={unfavoriteIcon} />
                            : <Image source={heartOutlineIcon} />
                        }
                    </RectButton>

                    <RectButton
                        style={styles.contactButton}
                        onPress={handleLinkToWhatsApp}
                    >
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
};

export default TeacherItem;
