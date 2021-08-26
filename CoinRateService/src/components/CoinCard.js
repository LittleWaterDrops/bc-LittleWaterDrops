import React, { useState } from 'react';
import {
    Image, Pressable, StyleSheet,
    Text,

    View
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


export default CoinCard = ({coinName, coinSymbol, coinIdx, cardSelected, parentCallback}) => {
    const [buttonPressed, setButtonPressed] = useState(false);
    const [buttonHovered, setButtonHovered] = useState(false);



    // useEffect(() => {
    //     if(resetSelect == true){
    //         setButtonPressed(false);
    //         console.log('work!');
    //         resetSelect = false;
    //         console.log(resetSelect);
    //     }
    // }, [resetSelect]);
    
    onPress = () => {
        // buttonPressed ? setButtonPressed(false) : setButtonPressed(true);
        cardSelected ? parentCallback(coinSymbol, coinIdx, false) : parentCallback(coinSymbol, coinIdx, true);
        setButtonHovered(false);

    };
    // useEffect(() => {
    //     buttonPressed ? parentCallback(coinSymbol, coinIdx, true) : parentCallback(coinSymbol, coinIdx, false);
    //   }, [buttonPressed]);

    onPressIn = () => {
        setButtonHovered(true);
    };
    onPressOut = () => {
        setButtonHovered(false);
    };

    return (
        <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{borderRadius: 4}}
        >
            <View style={buttonHovered ? styles.hoverButton : cardSelected ? styles.checkedButton : styles.defaultButton}>
            
                <View style={styles.cardBox}>
                    <View/>
                    <BTCLogo/>

                    <TextBox name={coinName} symbol={coinSymbol}/>

                    <View>
                        <CheckBox buttonHovered={buttonHovered} buttonPressed={cardSelected}/>
                        <View style={styles.checkBoxSpace}/>
                        <View style={styles.checkBoxSpace}/>
                    </View>
                </View>
            </View>

        </Pressable>

    );
};

const BTCLogo = () => {
    return (
        <Image 
            style={styles.logo}
            source={require('CoinRateService/src/assets/images/BTC.png')}
        />
    );
}

const TextBox = ({name, symbol}) => {
    return (
        <View style={styles.textBox}>

        <Text style={styles.nameFont}>{name}</Text>

        <Text style={styles.symbolFont}>{symbol}</Text>

    </View>
    );
}

const CheckBox = ({buttonHovered, buttonPressed}) => {
    return (
        <View style={buttonHovered ? styles.defaultCheckBox : buttonPressed ? styles.checkedCheckBox : styles.defaultCheckBox}>
        <Text>
        <Icon name="check" size={19} color={buttonHovered ? '#5A41F5': buttonPressed ? '#FFFFFF' : '#FFFFFF'} />
        </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    cardBox: {
        height: 80,
        width: 229,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        width: 32,
        height: 32,
    },
    textBox: {
        height: 80,
        width: 125,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    defaultCheckBox: {
        height: 20,
        width: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#C3C9D0',
    },
    checkedCheckBox: {
        height: 20,
        width: 20,
        alignItems: 'center',
        backgroundColor: "#5A41F5",
        borderRadius: 4,
    },
    nameFont: {
        fontFamily: 'Inter-Bold',
        fontSize : 16,
        color: '#171F46',
    },
    symbolFont: {
        fontFamily: 'Inter-Regular',
        fontSize : 12,
        color: '#515774',
    },
    defaultButton: {
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#E1E4FC',
        paddingRight: 12,
    },
    hoverButton: {
        alignItems: "center",
        backgroundColor: "#F7F8FF",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#E1E4FC',
        paddingRight: 12,
    },
    checkedButton: {
    alignItems: "center",
    backgroundColor: "#F7F8FF",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E1E4FC',
    paddingRight: 12,
    },
    checkBoxSpace: {
        height: 20,
        width: 20,
    }
});
