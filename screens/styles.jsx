import {StyleSheet} from 'react-native';

export const styles=StyleSheet.create({
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


export const buttons = StyleSheet.create({
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
    },
})

export const progressBar = StyleSheet.create({
    progressView:{
        marginTop:20,
        marginRight:40,
        marginLeft:20,
        flexDirection:"row"
    },
    progressBar:{
        width:"100%",
        color:"#4E46F1"
    },
    progressNos:{
        marginLeft:8,
        marginTop:-3,
        color:"grey"
    }
})

export const form = StyleSheet.create({
    formHeader:{
        marginLeft:38,
        marginTop:10,
        color:"grey",
        fontSize:16,
    },
    formLabel:{
        marginLeft:34,
        marginTop:30,
        color:"grey"
    },
    formTextInput:{
        marginLeft:34,
        width:320,
        height:50,
        borderBottomWidth:1
    },
    picker:{
        marginLeft:25,
        marginTop:20,
        borderBottomWidth:2
    },
    chosenButton:{
        padding:2,
        marginLeft:34,
        marginTop:20,
        width:140,
        height:40,
        fontSize:20
    },
    choiceButton:{
        padding:2,
        marginLeft:34,
        marginTop:20,
        width:140,
        height:40,
        fontSize:20,
        backgroundColor:"grey"
    },
    nextButton:{
        padding:10,
        marginLeft:34,
        marginTop:50,
        width:320,
        height:60,
        fontSize:20
    },
    OtpAwaitMsg:{
        color:"#230C45",
        marginLeft:55,
        marginTop:30,
        fontSize:16,
        fontFamily:"Roboto"
    },
    userData:{
        color:"#230C45",
        marginLeft:55,
        marginTop:10,
        fontSize:16,
        fontFamily:"Roboto"

    },
    yesButton:{
        padding:10,
        marginLeft:34,
        marginTop:50,
        width:150,
        height:60,
        fontSize:20,
    },
    noButton:{
        padding:10,
        marginLeft:34,
        marginTop:50,
        width:150,
        height:60,
        fontSize:20,
    },

})

export const checkBox=StyleSheet.create({
    checkBox:{
        marginLeft:34,
        marginTop:30,
    },
    checkBoxText:{
        marginTop:30,
        fontSize:14,
        color:"#828282"
    },

})