import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }

    handleBarcodeScan = async({type, data}) =>{
            this.setState({
                scannedData: data,
                scanned: true,
                buttonState: 'normal',
            })
    }

    getCameraPermission = async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status === "granted",
            buttonState: "clicked",
            scanned: false,
        })
    }
    
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState
        if(buttonState ==='clicked' && hasCameraPermissions){
            return(
                <BarCodeScanner onBarCodeScanned = {scanned ? undefined : this.handleBarcodeScan} style = {StyleSheet.absoluteFillObject}/>
            )
        } else if(buttonState === "normal"){
            return(
                <Image source = {require("../assets/image.jpg")}/>
                <View>
                <TouchableOpacity onPress = {this.getCameraPermission} style = {styles.scanButton} title = "Bar Code Scanner">
                    <Text style = {styles.buttonText}>Scan QR code</Text>
                </TouchableOpacity>
                <Text>{this.state.scannedData}</Text>
                </View>
            )
        }
    }
}