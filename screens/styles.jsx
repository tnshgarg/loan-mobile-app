import {StyleSheet} from 'react-native';

const styles=StyleSheet.create({
    container:{
        backgroundColor:"white",
        height:"100%"
    },
    logo:{
        marginLeft:70,
        marginTop:30,
        width:250,
        height:87
    },
    headline:{
        fontSize:16,
        color:"#230C45",
        marginLeft:75,
        marginTop:40,
        fontFamily:"Roboto"
    },
    fieldLabel:{
        fontSize:14,
        fontFamily:"Noto Sans",
        marginTop:60,
        marginLeft:40,
        color:"#020614"
    },
    textInput:{
        marginLeft:40,
        width:320,
        height:50,
        borderBottomWidth:1
    },
    resendText:{
        color:"#4E46F1",
        marginLeft:155,
        marginTop:30,
        fontSize:16,
        fontFamily:"Roboto",
    },
    otpInput:{
        marginLeft:105,
        marginTop:40,
        width:180,
        height:50,
        borderBottomWidth:1
    },
    ContinueButton:{
        padding:10,
        marginLeft:40,
        marginTop:50,
        width:320,
        height:60,
        fontSize:20
    },
    button1:{
        padding:10,
        marginLeft:40,
        marginTop:50,
        width:320,
        height:60,
        fontSize:20,
        backgroundColor:"#4E46F1"
    }
})

export {styles}