import React from 'react'
import styled from "styled-components"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function ImgSlider(props) {

    let setting= {
        dots:true,
        infinite:true,
        speed:500,
        slidesToShow:1,
        slidesToScroll:1,
        autoplay:true,
    }

    return (
        <div>
            <Carousel {...setting}>
               <Wrap>
                   <a href="/">
                       <img src="/images/slider-badag.jpg" alt="slider-badging" />
                   </a>
               </Wrap>
               <Wrap>
                   <a href="/">
                       <img src="/images/slider-badging.jpg" alt="slider-badging" />
                   </a>
               </Wrap>
               <Wrap>
                   <a href="/">
                       <img src="/images/slider-scale.jpg" alt="slider-badging" />
                   </a>
               </Wrap>
               <Wrap>
                   <a href="/">
                       <img src="/images/slider-scales.jpg" alt="slider-badging" />
                   </a>
               </Wrap>
            </Carousel>
        </div>
    )
}

export default ImgSlider


const Carousel = styled(Slider)`
    margin-top:20px;

    & > button {
        opacity :0;
        height: 100%;
        width: 5px;
        z-index: 1;

        &:hover{
            opacity: 1;
            transition:opacity 0.2s;
        }
    }

    ul li button{
        &::before{
            font-size:10px;
            color:rgb(150,150,171);
        }
    }

    li.slick.active button button::before{
        color:white;
    }
    .slick-list{
        overflow: initial;
    }

    .slick-prev{
        left:-35px;
    }
    .slick-next{
        right:-35px;
    }

`

const Wrap = styled.div`
border-radius:4px;
cursor:pointer;
position:relative;

a{
    border-radius:4px;
    box-shadow: rgb(0 0 0 / 69%) 8px 26px 30px -10px,
    rgb(0 0 0/ 73%) 0px 16px 10px -10px;
    cursor:pointer;
    position :relative;
    display:block;
    padding:4px;
    border:4px solid rgba(249,249,249, 0);

    img{
        width:100%;
        height:100%;
    }

    &:hover{
        /* padding:0; */
        border:4px solid rgba(249,249,249, 0.8);
        transition-duration: 300ms;
    }
}
`