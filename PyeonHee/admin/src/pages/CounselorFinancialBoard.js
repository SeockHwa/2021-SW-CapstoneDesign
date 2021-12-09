import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function CounselorFinancialBoard({match}) {
  const [name, setName] = useState('');
  const [counselorCate, setCounselorCate] = useState('금융상품');
  const [company, setCompany] = useState('');

  //금융상품
  const [field, setField] = useState('');

  const deleteNotificationBoard=()=>{
    axios({
        method:"POST",
        url: `/counselorFinancialDelete`,
        data:{
            boardID: match.params.boardID,
        }
    })
    .then((res)=>{
        if(res.data.status === 'success'){
            alert('삭제 성공');
            document.location.href = '/counselorListFinancial/1';
        }else{
            alert('삭제 실패');
        }
    }).catch(error=>{
        console.log(error);
    });
  }

  
  useEffect(() => {
    axios({
      method:"POST",
      url: `/counselorFinancialInfo`,
      data:{
          boardID: match.params.boardID,
      }
    })
    .then((res)=>{
        console.log(res.data[0]);

        setName(res.data[0].name);
        setCounselorCate(res.data[0].counselorCate);
        setCompany(res.data[0].company);
        setField(res.data[0].field);

    }).catch(error=>{
        console.log(error);
    });
  },[])

  return (
    <div className="NotificationBoardDiv">
        <p className="NotificationTitleText">상담사 확인</p>
        <div className="NotificationWriteDiv">
        <div className="CounselorWriteBodyDiv">
            <div className="BoardWriteTitleDiv">
            <p className="NotificationBoardTitleFont">상담사 이름:&nbsp;</p>
            <p className="CounselorBoardTitle">김아주</p>
            </div>
            <div className="LinkDiv">
            <p className="LinkFont">상담사 소속회사:&nbsp;</p>
            <p className="CounselorBankNameTitle">국민은행</p>
            </div>
            <div className="BoardCateInputDiv">
                <p className="NotificationBoardCateFont">상담 분류:&nbsp;</p>
                <p className="CounselorCateInBoard">금융상품</p>
            </div>
            <div className="CounselorContentDiv">
            <div className="FinancialRow">
                <p>상담분야:&nbsp;</p>
                <p>펀드</p>
            </div>
            </div>
            <div className="NotificationBoardButtonDiv">
            <button className="NotificationUpdateButton" type='button' onClick={deleteNotificationBoard}>삭제</button>
            </div>
        </div>
        </div>
    </div>
    );

}

export default CounselorFinancialBoard;