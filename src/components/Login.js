import React from "react";
import styled from "styled-components";

function Login() {
  return (
    <Container>
      <Content>
        <CTA>
          <CTALogoOne src="images/cta-logo-one.svg" alt="" />
          <SignUp>GET THE DISNEY BUNDLE</SignUp>
          <Description>Stream now. <a href="/">Terms apply</a> </Description>
          <CTALogoTwo src="images/cta-logo-two.png" alt="" />
          <SignLink>Sign up for Disney+ only</SignLink>
        </CTA>
        <BgImage />
      </Content>
    </Container>
  );
}

export default Login;

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: calc(100vh);
`;

const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;
const BgImage = styled.div`
  height: 100%;
  width: 100%;
  background-image: url("/images/hero.jpg");
  /* background-position: center; */
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
`;

const CTA = styled.div`
    margin:50px auto 2vw auto;
    max-width: 650px;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition-timing-function: ease-out;
    transition: opacity 0.2s;
    width: 100%;
`;
const CTALogoOne = styled.img`
    margin-bottom: 12px;
    max-width: 600px;
    min-height: 1px;
    display: block;
    width: 100%;
    user-select: none;
`;

const SignUp = styled.a`
    font-weight: normal;
    color:#f9f9f9;
    background-color: #0063e5;
    width: 100%;
    letter-spacing: 2px;
    margin-bottom: 12px;
    font-size: 18px;
    padding:16.5px 0;
    border:1px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    transition: all .3s;

    &:hover{
        background-color: #0483ee;
    }

`
const CTALogoTwo = styled.img`
    max-width: 600px;
    width: 100%;
    user-select: none;
`
const Description = styled.p`
    color: gray;
    font-size: 11px;
    margin:0 0 28px;
    letter-spacing: .3px;

    a {
        position: relative;
    }
    a::before {
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        bottom: -1px;
        left: 0;
        background-color: white;
    }
`

const SignLink = styled.a`
    font-size: 18px;
    margin:25px 0 24px;
    letter-spacing: 1px;
        position: relative;
        cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        bottom: 3px;
        left: 0;
        background-color: white;
    }
`