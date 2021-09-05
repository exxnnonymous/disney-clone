import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {  useSelector } from "react-redux";
import styled from "styled-components";
import { doc, getDoc } from "@firebase/firestore";

import db from "../firebase";
import {
    selectUserName
  } from "../features/user/userSlice";

function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const userName = useSelector(selectUserName);
  const history = useHistory()

  if (!userName) {
    history.push("/");
  }

//   const getData = () => {
//     const movieDetail = data.filter((doc) => doc.id === id);

//     if (movieDetail.length > 0) {
//       setDetail(movieDetail[0]);
//     } else {
//       console.log("invalid id");
//     }
//   };

const getData = () => {
    const docRef = doc(db, "disney_movies", id);
    getDoc(docRef).then((doc) => {
        if (doc.exists) {
            setDetail(doc.data());
        } else {
          console.log("no such document in firebase 🔥");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
}

useEffect(() => {
    getData();
    /* eslint-disable */
  }, [id]);

  return (
    <Container>
      <Background>
        <img src={detail.backgroundImg} alt={detail.title + "-bgImg"} />
      </Background>

      <ImageTitle>
        <img alt={detail.title + "-titleImg"} src={detail.titleImg} />
      </ImageTitle>

      <ContentMeta>
        <Controls>
          <Player>
            <img src="/images/icons/play-black.png" alt="" />
            <span>Play</span>
          </Player>
          <Trailer>
            <img src="/images/icons/play-white.png" alt="" />
            <span>Trailer</span>
          </Trailer>
          <AddList>
            <span />
            <span />
          </AddList>
          <GroupWatch>
            <div>
              <img src="/images/icons/group.png" alt="" />
            </div>
          </GroupWatch>
        </Controls>
        <SubTitle>{detail.subTitle}</SubTitle>
        <Description>{detail.description}</Description>
      </ContentMeta>
    </Container>
  );
}

export default Detail;

const Container = styled.div`
  position: relative;
  top: 72px;
  min-height: calc(100vh - 72px);
  overflow: hidden;
  display: block;
  padding: 0 calc(3.5vw - 5px);
  padding-bottom: 50px;
`;
const Background = styled.div`
  left: 0px;
  opacity: 0.8;
  position: fixed;
  right: 0px;
  top: 72px;
  z-index: -1;
  img {
    width: 100vw;
    height: 100vh;
    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const ImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: 0px auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;
  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
  text-align:left;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb (249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);
  img {
    width: 32px;
  }
  &:hover {
    background: rgb(198, 198, 198);
  }
  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;
    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
  &:hover {
    background: rgba(198, 198, 198, 0.3);
  }
`;

const AddList = styled.div`
  margin-right: 16px;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;
    &:first-child {
      height: 2px;
      transform: translate(1px, 0px) rotate(0deg);
      width: 16px;
    }
    &:nth-child(2) {
      height: 16px;
      transform: translateX(-8px) rotate(0deg);
      width: 2px;
    }
  }
`;

const GroupWatch = styled.div`
  height: 44px;
  width: 44px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: white;
  div {
    height: 40px;
    width: 40px;
    background: rgb(0, 0, 0);
    border-radius: 50%;
    img {
      width: 100%;
    }
  }
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(249, 249, 249);
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
