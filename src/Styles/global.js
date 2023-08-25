import { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`
*{
    padding : 0;
    margin : 0;
    box-sizing : border-box
}
body{
    background : ${({theme})=> theme.background};
    color : ${({theme})=> theme.textColor};
    transition : all 0.25s linear;
    font-family: 'Inter', sans-serif;
}
.canvas{
    display : grid;
    min-height : 100vh;
    grid-auto-flow : row;
    grid-template-row : auto 1fr auto;
    gap : 0.5rem;
    width : 100vw;
    padding : 2rem;
    align-items : center;
    text-align : center;
}
.type-box{
    display : block;
    max-width : 1000px;
    margin-left : auto;
    margin-right : auto;
    overflow : hidden;
}
.words{
    display : flex;
    flex-wrap : wrap;
    font-size : 26px;
    color : ${({theme})=> theme.typeBoxText};
}
.word{
    padding : 5px;
    margin-right: 2px;
}
.hidden-input{
    opacity : 0;
}
.current{
    border-left : 1px solid;
    animation : blincking 2s infinite;
    animation-timing-function : ease;

    @keyframes blincking {
        0% {border-left-color : ${({theme})=> theme.textColor};}
        25% {border-left-color : ${({theme})=> theme.background};}
        50% {border-left-color : ${({theme})=> theme.textColor};}
        75% {border-left-color : ${({theme})=> theme.background};}
        100% {border-left-color : ${({theme})=> theme.textColor};}
    }
}
.current-right{
    border-right : 1px solid;
    animation : blinckingRight 2s infinite;
    animation-timing-function : ease;

    @keyframes blinckingRight {
        0% {border-right-color : ${({theme})=> theme.textColor};}
        25% {border-right-color : ${({theme})=> theme.background};}
        50% {border-right-color : ${({theme})=> theme.textColor};}
        75% {border-right-color : ${({theme})=> theme.background};}
        100% {border-right-color : ${({theme})=> theme.textColor};}
    }
}
.correct{
    color : ${({theme})=> theme.textColor};
}
.incorrect{
    color : ${({theme})=> theme.incorrectCol};
}
.upper-menu{
    width : 1000px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
    display : flex;
    justify-content : space-between;
    padding : 5px;
    font-size : 1.35rem;
}
.modes{
    display : flex;
    gap : 0.5rem;
}
.time-mode:hover{
    cursor: pointer;
    color : green;
}
.footer{
    display : flex;
    justify-content: space-between;
    width: 1000px;
    margin-left : auto;
    margin-right : auto;
    padding : 5px
}
.stats-box{
    display : flex;
    height : auto;
    width: 1000px;
    margin-left : auto;
    margin-right : auto;
    padding : 5px
}
.left-stats{
    width : 30%;
    padding : 30px;
}
.right-stats{
    width: 70%;
}
.title{
    font-size : 20px;
    color : ${({theme})=> theme.typeBoxText};
}
.subtitle{
    font-size : 30px;
}
.header{
    display : flex;
    justify-content: space-between;
    align-items : center;
    width: 1000px;
    margin-left : auto;
    margin-right : auto;
    padding : 5px
}
.logo img{
    width : 3.5rem;

}
.user-profile{
    width : 1000px;
    // margin-left : auto;
    // margin-right : auto;
    margin : 30px auto 20px auto;
    height : 15rem;
    background : ${({theme})=> theme.typeBoxText};
    border-radius : 20px;
    padding : 1rem;
    display : flex;
    justify-content : center;
    align-item : center;
    // margin-bottom: 20px;
    // margin- bottom
}
.user{
    width : 50%;
    display : flex;
    margin : 30px 0;
    font-size : 2rem;
    padding : 1rem;
    border-right : 3px solid;
}
.info {
    width : 70%;
    padding : 1rem;
    margin-top: 1rem;
}
.info .joined-at{
    font-size : 1rem;
}
.picture{
    width : 30%;
    margin-top : 3rem;
    margin-left : 3rem;
}
.total-tests{
    width : 50%;
    display : flex;
    justify-content : center;
    align-items : center;
    font-size : 2rem;
}
.table, .graph-user-page{
    width: 1000px;
    margin: auto;
}
.center-of-screen{
    min-height: 100vh;
    display: flex;
    justify-content : center;
    align-items: center;
}
.links{
    display : flex;
    gap : 1.5rem;
}
.links a{
    color : inherit;
    text-decoration : none;
}


`;

