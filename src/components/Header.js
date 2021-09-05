import React, { useEffect } from "react";
import { useHistory , Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import styled from "styled-components";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";

function MainHeader() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        history.push("/home");
      } else {
        // User is signed out
        // ...
      }
    });
     /* eslint-disable */ 
  }, [userName]);

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  const handleAuth = () => {
    if(!userName){
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user);
          console.log(result)
        })
        .catch((err) => {
          console.log(err);
        });
    }else if(userName){
      signOut(auth).then(()=>{
        dispatch(setSignOutState())
        history.push('/')
      }).catch((err)=>{
        console.log(err)
      })
    }
  };

  if (!userName) {
    return (
      <LoginNav>
        <Container>
          <LoginButton onClick={handleAuth}>LOG IN</LoginButton>
        </Container>
      </LoginNav>
    );
  } else {
    return (
      <Nav>
        <Logo>
          <img src="/images/logo.svg" alt="logo-img" />
        </Logo>
        <NavMenu>
          <Link to="/home">
            <img src="/images/icons/home.svg" alt="home-icon" />
            <span>HOME</span>
          </Link>
          <Link to="/home">
            <img src="/images/icons/search.svg" alt="search-icon" />
            <span>SEARCH</span>
          </Link>
          <Link to="/home">
            <img src="/images/icons/watchlist.svg" alt="watchlist-icon" />
            <span>WATCHLIST</span>
          </Link>
          <Link to="/home">
            <img src="/images/icons/original.svg" alt="original-icon" />
            <span>ORIGINALS</span>
          </Link>
          <Link to="/home">
            <img src="/images/icons/movie.svg" alt="movie-icon" />
            <span>MOVIES</span>
          </Link>
          <Link to="/home">
            <img src="/images/icons/series.svg" alt="series-icon" />
            <span>SERIES</span>
          </Link>
        </NavMenu>
        <SignOut>
          {userName && <UserImg src={userPhoto} alt={userName} />}
          <DropDown>
            <span onClick={handleAuth}>logout</span>
          </DropDown>
        </SignOut>
      </Nav>
    );
  }
}

export default MainHeader;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  /* background-color: transparent; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  z-index: 3;
`;

const LoginNav = styled.div`
  position: absolute;
  padding: 0 40px;
  top: 0;
  width: 100%;
  height: 70px;
  background: transparent;
  display: flex;
  align-items: center;
  z-index: 2;
`;

export const Logo = styled.a`
  padding: 0;
  width: 100px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  letter-spacing: 10px;
  flex-flow: row wrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0;
  padding: 8px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    gap: 5px;

    img {
      height: 20px;
      min-width: 20px;
      z-index: auto;
      width: 20px;
      margin-bottom: 4px;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 14px;
      letter-spacing: 2px;
      line-height: 1.88;
      padding: 2px 0;
      font-weight: 400;
      white-space: nowrap;
      position: relative;
      /* font-family: 'Ubuntu', sans-serif; */
      font-family: "Poppins", sans-serif;
      text-transform: uppercase;

      &::before {
        content: "";
        position: absolute;
        background-color: rgb(249, 249, 249);
        border-radius: 0 0 4px 4px;
        bottom: -2px;
        width: 100%;
        left: 0px;
        height: 2px;
        opacity: 0;
        transform: scaleX(0);
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
      }
    }
    &:hover {
      span::before {
        opacity: 1 !important;
        visibility: visible;
        transform: scaleX(1);
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const LoginButton = styled.button`
  background-color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  font-size: 16px;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  padding: 10px 20px;
  transition: all 0.3s;
  letter-spacing: 1px;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background-color: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.3);
  border-radius: 4px;
  box-shadow: rgb(0, 0, 0/50%) 0px 0px 18px 0;
  padding: 10px;
  width: 100px;
  opacity:0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width:48px;
  cursor: pointer;
  
  ${UserImg}{
    border-radius: 50%;
    width: 100%;
    height:100%;
  }

  &:hover{
    ${DropDown}{
      opacity:1 ;
      transition: all .2s;
    }
  }
`;
