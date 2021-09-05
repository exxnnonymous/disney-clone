import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import styled from "styled-components";

import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Recommended from "./Recommended";
import Viewers from "./Viewers";
import Originals from "./Originals";
import Trending from "./Trending";
import db from "../firebase"
import { setMovies } from "../features/movies/movieSlice";
import { selectUserName } from "../features/user/userSlice";

function Home() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const history = useHistory()

  if (!userName) {
    history.push("/");
  }

  const getData = () => {
      let recommends = [];
      let newDisneys = [];
      let originals = [];
      let trending = [];
    onSnapshot(collection(db, 'disney_movies'),(snapshot)=>{
      snapshot.docs.forEach((doc) => {
        switch (doc.data().type) {
          case "recommend":
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;

          case "new":
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            break;

          case "original":
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;

          case "trending":
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;
          default:
              break;
        }
      });

      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisneys,
          original: originals,
          trending: trending,
        })
      );
    });
  }

  // const getData = () => {
  //   let recommends = [];
  //   let newDisneys = [];
  //   let originals = [];
  //   let trending = [];

  //   data.forEach((doc) => {
  //     switch (doc.type) {
  //       case "recommend":
  //         recommends = [...recommends, { ...doc }];
  //         break;

  //       case "new":
  //         newDisneys = [...newDisneys, { ...doc }];
  //         break;

  //       case "original":
  //         originals = [...originals, { ...doc }];
  //         break;

  //       case "trending":
  //         trending = [...trending, { ...doc }];
  //         break;
  //       default:
  //         break;
  //     }
  //     dispatch(
  //       setMovies({
  //         recommend: recommends,
  //         newDisney: newDisneys,
  //         original: originals,
  //         trending: trending,
  //       })
  //     );
  //   });
  // };
  useEffect(() => {
    getData();
    /* eslint-disable */
  }, [userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommended />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
}

export default Home;

const Container = styled.div`
  position: relative;
  top: 72px;
  min-height: calc(100vh - 72px);
  overflow: hidden;
  padding: 0 calc(3.5vw - 5px);
  padding-bottom: 50px;

  &::after {
    background: url("/images/home-background.png") center center no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
