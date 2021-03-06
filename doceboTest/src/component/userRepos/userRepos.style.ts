import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    buttonsContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    label:{
        fontWeight: 'bold',
        fontSize: 12
    },
    titleButton:{
        fontWeight:'normal',
        fontSize: 12,
        color: 'black'
    },
    emptyState:{
        textAlign:'center',
        fontSize: 25
    }
});

export default styles
