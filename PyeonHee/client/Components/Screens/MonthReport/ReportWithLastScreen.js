import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../config'
import { StackedBarChart} from 'react-native-chart-kit';
import { SafeAreaView, StyleSheet, Text, View, Button, ScrollView, } from 'react-native';
import MbtiSelectButton from '../../Buttons/MbtiSelectButton';
const url = config.url;
const ReportWithLastScreen = (props) => {
    const [userID, setUserID] = useState('');
    const [loading, setLoading] = useState(false);

    const [currentRent, setCurrentRent] = useState(200000);
    const [currentInsurance, setCurrentInsurance] = useState(100000);
    const [currentCommunication, setCurrentCommunication] = useState(100000);
    const [currentSubscribe, setCurrentSubscribe] = useState(50000);

    const [currentTraffic, setCurrentTraffic] = useState(100000);
    const [currentMedical, setCurrentMedical] = useState(120000);
    const [currentEducation, setCurrentEducation] = useState(100000);
    const [currentEct, setCurrentEct] = useState(100000);

    const [currentShopping, setCurrentShopping] = useState(300000);
    const [currentHobby, setCurrentHobby] = useState(150000);
    const [currentEvent, setCurrentEvent] = useState(210000);
    const [currentDinner, setCurrentDinner] = useState(100000);

    const [lastRent, setLastRent] = useState(200000);
    const [lastInsurance, setLastInsurance] = useState(100000);
    const [lastCommunication, setLastCommunication] = useState(120000);
    const [lastSubscribe, setLastSubscribe] = useState(40000);

    const [lastTraffic, setLastTraffic] = useState(130000);
    const [lastMedical, setLastMedical] = useState(150000);
    const [lastEducation, setLastEducation] = useState(90000);
    const [lastEct, setLastEct] = useState(60000);

    const [lastShopping, setLastShopping] = useState(210000);
    const [lastHobby, setLastHobby] = useState(150000);
    const [lastEvent, setLastEvent] = useState(280000);
    const [lastDinner, setLastDinner] = useState(60000);

    const currentFixTotal = currentRent+currentInsurance+currentCommunication+currentSubscribe;
    const lastFixTotal = lastRent+lastInsurance+lastCommunication+lastSubscribe;

    const currentVariableTotal1 = currentTraffic+currentMedical+currentEducation+currentEct;
    const lastVariableTotal1 = lastTraffic+lastMedical+lastEducation+lastEct;

    const currentVariableTotal2 = currentShopping+currentHobby+currentEvent+currentDinner;
    const lastVariableTotal2 = lastShopping+lastHobby+lastEvent+lastDinner;

    const currentTotal = currentFixTotal+currentVariableTotal1+currentVariableTotal2;
    const lastTotal = lastFixTotal+lastVariableTotal1+lastVariableTotal2;

    const difRent = currentRent - lastRent < 0 ? " -"+ Math.abs(currentRent - lastRent).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(currentRent - lastRent).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difInsurance = currentInsurance - lastInsurance < 0? " -"+ Math.abs(currentInsurance - lastInsurance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(currentInsurance - lastInsurance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difCommunication = currentCommunication - lastCommunication < 0? " -"+ Math.abs(currentCommunication - lastCommunication).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(currentCommunication - lastCommunication).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difSubscribe = currentSubscribe - lastSubscribe < 0? " -"+ Math.abs(currentSubscribe - lastSubscribe).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(currentSubscribe - lastSubscribe).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difMedical = currentMedical - lastMedical < 0? " -"+ Math.abs(currentMedical - lastMedical).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(currentMedical - lastMedical).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difTraffic = currentTraffic - lastTraffic < 0? " -"+ Math.abs(currentTraffic - lastTraffic).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(currentTraffic - lastTraffic).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difEducation = currentEducation - lastEducation < 0? " -"+ Math.abs(currentEducation - lastEducation).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(currentEducation - lastEducation).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difEvent = currentEvent - lastEvent < 0? " -"+ Math.abs(currentEvent - lastEvent).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(currentEvent - lastEvent).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difHobby = currentHobby - lastHobby < 0? " -"+ Math.abs(currentHobby - lastHobby).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(currentHobby - lastHobby).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difShopping = currentShopping - lastShopping < 0? " -"+ Math.abs(currentShopping - lastShopping).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(currentShopping - lastShopping).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difDinner = currentDinner - lastDinner < 0? " -"+ Math.abs(currentDinner - lastDinner).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(currentDinner - lastDinner).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difEct = currentEct - lastEct < 0? " -"+ Math.abs(currentEct - lastEct).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(currentEct - lastEct).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    const fixData = {
        labels: [`${props.preMonth}월`, `${props.month}월`],
        legend: [`월세${difRent}`, `보험${difInsurance}`, `통신${difCommunication}`, `구독${difSubscribe}`],
        data: [[lastRent, lastInsurance, lastCommunication, lastSubscribe], [currentRent, currentInsurance, currentCommunication, currentSubscribe]],
        barColors: ["#dfe4ea", "#ced6e0", "#a4b0be", "#9494a4"]
      };
    const fixConfig = {
        backgroundColor: "#ffffff",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
    };
    const variable1Data = {
        labels: [`${props.preMonth}월`, `${props.month}월`],
        legend: [`기타${difEct}`, `의료${difMedical}`, `교통${difTraffic}`, `교육${difEducation}`],
        data: [[lastEct,lastMedical, lastTraffic, lastEducation], [currentEct,currentMedical, currentTraffic, currentEducation]],
        barColors: ["#dfe4ea", "#ced6e0", "#a4b0be", "#9494a4"]
    }
    const variable2Data = {
        labels: [`${props.preMonth}월`, `${props.month}월`],
        legend: [`식비${difDinner}`, `쇼핑${difShopping}`, `취미${difHobby}`, `경조사${difEvent}`],
        data: [[lastDinner, lastShopping, lastHobby, lastEvent], [currentDinner, currentShopping, currentHobby, currentEvent]],
        barColors: ["#dfe4ea", "#ced6e0", "#a4b0be", "#9494a4"]
    }
    const totalData = {
        labels: [`${props.preMonth}월`, `${props.month}월`],
        legend: ["총액"],
        data: [[lastTotal], [currentTotal]],
        barColors: ["#ced6e0"]
    }

    useEffect(()=>{
        let tempID;
        AsyncStorage.getItem('userID', (err, result) => {
            tempID = result;
            if(tempID!= null){
                setUserID(tempID);
            }
        })
        .then(()=>{
            /*
            fetch(`${url}/monthReportWithLast?userID=${tempID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                if(responseJson.length != 0){
                    setCurrentRent(responseJson.currentRent);
                    setCurrentInsurance(responseJson.currentInsurance);
                    setCurrentCommunication(responseJson.currentCommunication);
                    setCurrentSubscribe(responseJson.currentSubscribe);
                    setCurrentTraffic(responseJson.currentTraffic);
                    setCurrentMedical(responseJson.currentMedical);
                    setCurrentEducation(responseJson.currentEducation);
                    setCurrentEct(responseJson.currentEct);
                    setCurrentShopping(responseJson.currentShopping);
                    setCurrentHobby(responseJson.currentHobby);
                    setCurrentEvent(responseJson.currentEvent);
                    setCurrentDinner(responseJson.currentDinner);

                    if(responseJson.last_spend.length !=0){
                        setLastRent(responseJson.lastRent);
                        setLastInsurance(responseJson.lastInsurance);
                        setLastCommunication(responseJson.lastCommunication);
                        setLastSubscribe(responseJson.lastSubscribe);
                        setLastTraffic(responseJson.lastTraffic);
                        setLastMedical(responseJson.lastMedical);
                        setLastEducation(responseJson.lastEducation);
                        setLastEct(responseJson.lastEct);
                        setLastShopping(responseJson.lastShopping);
                        setLastHobby(responseJson.lastHobby);
                        setLastEvent(responseJson.lastEvent);
                        setLastDinner(responseJson.lastDinner);
                    }
                }
            })
            .then(()=>{
              setLoading(true);
            })
            */
            //for test
            setLoading(true);
          })
    },[])
    if(loading === true){
    return (
        <ScrollView style={styles.appSize}>
            <View style={styles.fixDiv}>
                <Text style={styles.cateFont}>고정지출</Text>
                <View style={styles.tempRow}>
                    <StackedBarChart
                    data={fixData}
                    width={350}
                    height={250}
                    chartConfig={fixConfig}
                    withHorizontalLabels={false}
                />
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>이번달({props.month}월)</Text>
                    <Text style={styles.priceFont}>{currentFixTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>저번달({props.preMonth}월)</Text>
                    <Text style={styles.priceFont}>{lastFixTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text>지난달 대비</Text>
                    {currentFixTotal - lastFixTotal > 0 ?
                        <Text style={styles.upFont}>+{Math.abs(currentFixTotal - lastFixTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> :
                        <Text style={styles.downFont}>-{Math.abs(currentFixTotal - lastFixTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                    }
                </View>
            </View>
            <View style={styles.fixDiv}>
                <Text style={styles.cateFont}>계획지출(경조사+취미+쇼핑+식비)</Text>
                <View style={styles.tempRow}>
                    <StackedBarChart
                    data={variable2Data}
                    width={350}
                    height={250}
                    chartConfig={fixConfig}
                    withHorizontalLabels={false}
                />
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>이번달({props.month}월)</Text>
                    <Text style={styles.priceFont}>{currentVariableTotal2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>저번달({props.preMonth}월)</Text>
                    <Text style={styles.priceFont}>{lastVariableTotal2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text>지난달 대비</Text>
                    {currentVariableTotal2 - lastVariableTotal2 > 0 ?
                        <Text style={styles.upFont}>+{Math.abs(currentVariableTotal2 - lastVariableTotal2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> :
                        <Text style={styles.downFont}>-{Math.abs(currentVariableTotal2 - lastVariableTotal2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                    }
                </View>
            </View>
            <View style={styles.fixDiv}>
                <Text style={styles.cateFont}>계획지출(교육+교통+의료+기타)</Text>
                <View style={styles.tempRow}>
                    <StackedBarChart
                    data={variable1Data}
                    width={350}
                    height={250}
                    chartConfig={fixConfig}
                    withHorizontalLabels={false}
                />
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>이번달({props.month}월)</Text>
                    <Text style={styles.priceFont}>{currentVariableTotal1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>저번달({props.preMonth}월)</Text>
                    <Text style={styles.priceFont}>{lastVariableTotal1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text>지난달 대비</Text>
                    {currentVariableTotal1 - lastVariableTotal1 > 0 ?
                        <Text style={styles.upFont}>+{Math.abs(currentVariableTotal1 - lastVariableTotal1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> :
                        <Text style={styles.downFont}>-{Math.abs(currentVariableTotal1 - lastVariableTotal1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                    }
                </View>
            </View>
            <View style={styles.fixDiv}>
                <Text style={styles.cateFont}>총지출</Text>
                <View style={styles.tempRow}>
                    <StackedBarChart
                    data={totalData}
                    width={350}
                    height={250}
                    chartConfig={fixConfig}
                    withHorizontalLabels={false}
                />
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>이번달({props.month}월)</Text>
                    <Text style={styles.priceFont}>{currentTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>저번달({props.preMonth}월)</Text>
                    <Text style={styles.priceFont}>{lastTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text>지난달 대비</Text>
                    {currentTotal - lastTotal >= 0 ?
                        <Text style={styles.upFont}>+{Math.abs(currentTotal - lastTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> :
                        <Text style={styles.downFont}>-{Math.abs(currentTotal - lastTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                    }
                </View>
            </View>
        </ScrollView>
    )
    }else{
        return(
            <View style={styles.appSize}>
                
            </View>
        )
    }
}

export default ReportWithLastScreen;

const styles = StyleSheet.create({
    appSize: {
        flex: 1,
    },
    cateFont: {
        fontSize: 17,
        fontWeight: 'bold',
        margin: 10,
    },
    tempRow: {
        alignItems: 'center',
    },
    fixDiv: {
        marginTop: 20,
        margin: 10,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    monthRow: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    monthFont: {
        width: 90,
    },
    priceFont:{
        width: 140,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    upFont:{
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
        width: 130,
        textAlign: 'right',
    },
    downFont:{
        color: 'blue',
        fontSize: 14,
        fontWeight: 'bold',
        width: 130,
        textAlign: 'right',
    },
    resultDiv: {
        flexDirection: 'row',
        padding: 10,
    },
    nameHighlight: {
        fontWeight: 'bold',
    },
    mbtiHighlight:{
        fontWeight: 'bold',
        color: 'blue',
    },
    realProgressFont: {
        fontWeight: 'bold',
        color: 'blue',
    },
    progressDiv: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonDiv: {
        alignItems: 'center',
    },
    descriptionDiv:{
        padding: 10,
    },
});