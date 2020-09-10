import React, { useEffect, useState, useRef } from "react";
import socket from "../socket";
import { Button, Container, ProgressBar } from "react-bootstrap";

const Poll = () => {
  const [veryCount, setVeryCount] = useState(0);
  const [sosoCount, setSosoCount] = useState(0);
  const [notCount, setNotCount] = useState(0);
  const [total, setTotal] = useState(0);

  const sendVote = (option) => {
    socket.emit("vote", option);
    // console.log(option);
  };

  useEffect(() => {
    socket.on("getVote", function (option) {
      setTotal(total + 1);
      if (option === "very") {
        setVeryCount(veryCount + 1);
      }
      if (option === "soso") {
        setSosoCount(sosoCount + 1);
      }
      if (option === "not") {
        setNotCount(notCount + 1);
      }
      // console.log(veryCount);
    });
    return () => socket.off("getVote");
  }, [total, veryCount, sosoCount, notCount]);
  // console.log(total);
  // console.log([total, veryCount, sosoCount, notCount]);

  return (
    <Container>
      <h2>Are you satisfied with our service?</h2>
      <Button variant="success" onClick={(e) => sendVote("very")}>
        Very
      </Button>
      <Button variant="warning" onClick={(e) => sendVote("soso")}>
        So so
      </Button>
      <Button variant="danger" onClick={(e) => sendVote("not")}>
        Not at all
      </Button>
      <p></p>
      <ProgressBar>
        <ProgressBar
          animated
          key={1}
          striped
          variant="success"
          now={(veryCount * 100) / total}
        />

        <ProgressBar
          animated
          key={2}
          striped
          variant="warning"
          now={(sosoCount * 100) / total}
        />

        <ProgressBar
          animated
          key={3}
          striped
          variant="danger"
          now={(notCount * 100) / total}
        />
      </ProgressBar>
    </Container>
  );
};

export default Poll;
