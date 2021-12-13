import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RankingLogo from './RankingLogo';
import { Root, Popup, SPSheet } from 'react-native-popup-confirm-toast';
import { requestMatching } from '../../../api';
import { FinancialConsultLikeApi } from '../../../api';

const FinancialConsultItem = (props) => {

    const sendMail = () => {
        console.log('상담사 id: ',props.consultNumber);
        Popup.show({
            type: 'confirm',
            title: '상담매칭',
            textBody: `500P를 사용하여 ${props.counselorName} 상담사에게 상담 매칭 요청을 하시겠습니까?`,
            buttonText: 'yes',
            confirmText: 'no',
            okButtonStyle: {backgroundColor: '#0000CD'},
            iconEnabled: false,
            callback: () => {
                requestMatching(props.userID, props.counselorName, props.consultNumber)
                .then((responseJson)=>{
                    if(responseJson.status==='lowBalance'){
                        Popup.show({
                            type: 'success',
                            textBody: '포인트가 부족합니다.',
                            buttonText: '확인',
                            okButtonStyle: {backgroundColor: '#0000CD'},
                            iconEnabled: false,
                            callback: () => Popup.hide()
                        })
                    }
                    else if(responseJson.status==='success'){
                        Popup.show({
                            type: 'success',
                            textBody: '매칭 요청 메시지를 보냈습니다.',
                            buttonText: '확인',
                            okButtonStyle: {backgroundColor: '#0000CD'},
                            iconEnabled: false,
                            callback: () => Popup.hide()
                        })
                    }
                    else{
                        alert('요청 실패');
                    }
                })
            }
        })
    }

    const handleLike = () => {
        FinancialConsultLikeApi(props.userID, props.consultNumber)
        .then((responseJson)=>{
            console.log('response data');
            console.log(responseJson);
            if(responseJson.status === true) {
                console.log('add like');
                alert('좋아요를 눌렀습니다.');
                props.setLike(true);
            } else {
                console.log('cancle like');
                alert('좋아요를 취소했습니다.');
                props.setLike(true);
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <View style={styles.rankingLogoContainer}>
                    <RankingLogo rank={props.counselorRank}/>
                </View>


                <View style={styles.item2}>
                    <View style={{width: 75, alignItems: 'center'}}> 
                        <Text>{props.consultPart}</Text> 
                    </View>
                    
                    <View style={{width: 105, alignItems: 'center'}}> 
                        <Text> {props.counselorCorp}</Text> 
                    </View>

                    <View style={{width: 70, alignItems: 'center'}}> 
                        <Text>{props.counselorName}</Text> 
                    </View>

                    <TouchableOpacity 
                        style={styles.likeContainer}
                        onPress={handleLike}
                    >
                        <Image source={require('../../assets/redHeart.png')} style={styles.likeLogo}/>
                        <Text style={{marginLeft: 5, fontSize: 10, }}>{props.counselorLike}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={sendMail}
                    style={styles.buttonContainer}
                >
                    <Icon name={'chevron-forward-outline'} size={20} color={'#8EB3EE'}/>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    itemContainer: {
      flexDirection: 'row',
      paddingHorizontal: 5, 
      paddingVertical: 5,
      alignItems: 'center',
    },
    rankingLogoContainer: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        paddingVertical: 15,
        marginHorizontal: 10,
    },
    likeContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginLeft: 10,
        padding: 3,
        width: 40,
        height: 20,
    },
    buttonContainer: {
        width: 20,
    },
    likeLogo: {
        width: 10,
        height:10,
    },
  });

export default FinancialConsultItem;