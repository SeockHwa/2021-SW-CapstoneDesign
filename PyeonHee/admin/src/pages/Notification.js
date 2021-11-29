import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';
import {Paper, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import Notifications from "../components/Notifications";

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  tableRow: {
    fontWeight: 'bold'
  }
})

function Notification(props) {
  const {classes} = props;
  const [notifications, setNotifications] = useState([]);
  const [totalPage, setTotalPage] = useState(17);
  const [currentStartPage, setCurrentStartPage] = useState(0);
  const [currentEndPage, setCurrentEndPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios({
      method:"GET",
      url: '/adminGetNotificationList',
    })
    .then((res)=>{
        console.log(res.data);
        setNotifications(res.data);
    })
    .then(()=>{
      // 테스트
      let currentPage = props.match.params.pageNumber;

      let startPage = parseInt(currentPage/10) * 10;
      let EndPage;
      if(totalPage - (startPage + 10) > 0){
        EndPage = startPage + 10;
      }else{
        EndPage = totalPage;
      }

      console.log('현재 페이지: ', props.match.params.pageNumber);
      console.log('시작 페이지: ', startPage+1);    
      console.log('종료 페이지', EndPage);
      
      setCurrentStartPage(startPage+1);
      setCurrentEndPage(EndPage);
      /*
      axios({
        method:"GET",
        url: '/notificationTotalPage',
      })
      .then((res)=>{
        let currentPage = props.match.params.pageNumber;

        console.log(res.data);
        setTotalPage(res.data);

        let startPage = parseInt(currentPage/10) * 10;
        let EndPage;
        if(totalPage - (startPage + 10) > 0){
          EndPage = startPage + 10;
        }else{
          EndPage = totalPage;
        }

        console.log('현재 페이지: ', props.match.params.pageNumber);
        console.log('시작 페이지: ', startPage+1);    
        console.log('종료 페이지', EndPage);
        
        setCurrentStartPage(startPage+1);
        setCurrentEndPage(EndPage);
        
      })
      .then(()=>{
        setLoading(true);
      })
      .catch(error=>{
        console.log(error);
      });
      */
    })
    .catch(error=>{
        console.log(error);
    });
  },[])

  const writeNotification = () => {
      document.location.href = '/notificationWrite';
  }

  return (
    <div className="NotificationDiv">
      <p className="NotificationTitleText">공지사항</p>
      <div className="NotificationWriteButtonDiv">
          <button className="NotificationWriteButton" type='button' onClick={writeNotification}>공지글 게시</button>
      </div>
      <div className="NotificationBodyDiv">
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableRow}>번호</TableCell>
                <TableCell className={classes.tableRow}>분류</TableCell>
                <TableCell className={classes.tableRow}>제목</TableCell>
                <TableCell className={classes.tableRow}>날짜</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications.map(c => {return (<Notifications key={c.notice_number} id={c.notice_number} category={c.category} title={c.title} date={c.notice_date}/>)})}
            </TableBody>
          </Table>
        </Paper>
        <a>하하 총페이지: {totalPage} 현재페이지:{props.match.params.pageNumber}</a>
      </div>
    </div>
  );
}

export default withStyles(styles)(Notification);