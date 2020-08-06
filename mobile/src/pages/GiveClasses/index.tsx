import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png';

import styles from './styles';

const GiveClasses = () => {
    const { goBack } = useNavigation();

    function handleNavigationBack() {
        goBack();
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={giveClassesBackgroundImage}
                style={styles.content}
                resizeMode="contain"
            >
                <Text style={styles.title}>Quer ser um Proffy?</Text>
                <Text style={styles.description}>
                    Para começar, você precisa se cadastrar como professor na nossa plataforma web.
                </Text>
            </ImageBackground>
            
            <RectButton
                style={styles.okButton}
                onPress={handleNavigationBack}
            >
                <Text style={styles.okButtonText}>Tudo Bem</Text>
            </RectButton>
        </View>
    );
}

export default GiveClasses;
