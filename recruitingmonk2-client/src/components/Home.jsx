import React, { useState, useEffect } from 'react'
import axios from 'axios';
import classes from './home.module.css'
import DOMPurify from "dompurify";
import {FcBusinessman} from "react-icons/fc";
import { AiOutlineFieldTime } from "react-icons/ai";

function Home(){

    const [ListItems, setListItems] = useState([])
    useEffect(()=>{
        axios
          .get("/getData")
          .then(function (response) {
            // handle success
            setListItems(response.data)
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {});

    }, [])
    const result = ListItems.slice(0,150).map((ListItem, index) => {
  
        return (
          <div className={classes.group} key={index}>
            <div className={classes.questions}>
              <div className={classes.usernameDiv}>
                <FcBusinessman
                  style={{ height: "25px", width: "25px", display: "inline" }}
                />
                <p className={classes.name}>{ListItem.name}</p>
              </div>
              <div className={classes.postTime}>
                <AiOutlineFieldTime style={{ height: "25px", width: "25px" }} />
                <p>{new Date(ListItem.date).toUTCString()}</p>
              </div>
              <p className={classes.que}>{ListItem.question}</p>
              <p
                className={classes.desc}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(ListItem.desc),
                }}
              ></p>
            </div>
            <div className={classes.answerGroup}>
              {ListItem.answers.length !== 0 ? ListItem.answers.map((answer, index) => (
                
                  <div key={index}>
                    <div className={classes.usernameDiv}>
                      <FcBusinessman
                        style={{
                          height: "25px",
                          width: "25px",
                          display: "inline",
                        }}
                      />

                      <p className={classes.name}>{answer.name}</p>
                    </div>
                    <div className={classes.postTime}>
                      <AiOutlineFieldTime
                        style={{ height: "25px", width: "25px" }}
                      />
                      <p>{new Date(answer.date).toUTCString()}</p>
                    </div>
                    <p
                      className={classes.ans}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(answer.content),
                      }}
                    ></p>
                    <hr />
                  </div>
              )) : <div className={classes.answerGroup}><h4 style={{fontWeight: '400'}}>No Answers</h4></div>}
            </div>
          </div>
        );
    });
   

    return (
      <div>
      {result}
      </div>
    );
}

export default Home;