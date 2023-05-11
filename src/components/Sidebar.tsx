import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import { changeTheme } from '../redux/ThemeSlice/ThemeSlice';
import { lightTheme, darkTheme } from '../redux/ThemeSlice/Theme';
import styled, { keyframes, ThemeProvider } from "styled-components";

import {
	HiOutlineMenuAlt2,
	IoClose,
  TbMoonFilled,
  TbSunFilled,
} from "react-icons/all";

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const Container = styled.div`
  width: 100%;
  position: fixed;
  z-index: 10;
  `

const ClosedSideBar = styled.header`
  width: 4rem;
  height: 4rem;
  button{
    position: fixed;
    top: 1rem;
    left: 1rem;
    border: solid 3px ${(props) => props.theme.secondary_background_color};
  }
  button svg {
    font-size: 3rem;
    color: ${(props) => props.theme.primary_background_color};
    background-color: ${(props) => props.theme.primary_font_color};
  }
`

export const OpenSideBar = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: 50%;
	height: 100vh;
	z-index: 100;
	display: flex;
	align-items: center;
  animation: ${appearFromLeft} 0.5s;
	section {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		justify-content: space-between;
    width: 100%;
		height: 100%;
		background-color: ${(props) => props.theme.third_background_color};
    border: solid 5px ${(props) => props.theme.primary_background_color};
		border-radius: 0 15px 15px 0;
		nav {
			display: flex;
			align-items: center;
			flex-direction: column;
			width: 100%;
      padding: 1rem;
      button {
        position: absolute;
        top: 1rem;
        left: 1rem;
        width: 4rem;
        height: 4rem;
        border: solid 3px ${(props) => props.theme.secondary_background_color};
        cursor: pointer;
        svg {
          font-size: 3rem;
          color: ${(props) => props.theme.primary_background_color};
          background-color: ${(props) => props.theme.primary_font_color};
        }
      }
			div {
				margin-top: 7rem;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				flex-direction: row;
				h1 {
					${(props) => props.theme.primary_font_color};
					font-size: 1.2rem;
					animation: ${appearFromLeft} 0.7s;
          a {
            cursor: pointer;
            color: ${(props) => props.theme.primary_font_color};
          }
				}
			}
			ul {
        position: relative;
        list-style: none;
				margin-top: 1rem;
				width: 100%;
				text-align: left;
				display: flex;
				flex-direction: column;
        animation: ${appearFromLeft} 1s;
				a {
					color: ${(props) => props.theme.primary_font_color};
					padding: 2rem;
					display: flex;
					align-items: center;
          cursor: pointer;
					&:hover {
            text-decoration: underline;
					}
				}
			}
		}
  }
`;

const Button = styled.button`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  font-size: 2rem;
  color: ${(props) => props.theme.primary_font_color};
  background-color: transparent;
  border: none;
  cursor: pointer;
`


const Sidebar = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const [sideBar, setSideBar] = useState(false);

  function handleChangeSideBar() {
		setSideBar((prevState) => !prevState);
	}

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {!sideBar ? (
          <ClosedSideBar>
            <button onClick={handleChangeSideBar}>
              <HiOutlineMenuAlt2 />
            </button>
          </ClosedSideBar>
        ):(
          <OpenSideBar>
            <section>
              <nav>
                <button onClick={handleChangeSideBar}>
                  <IoClose />
                </button>
                <div>
                  <h1>
                    <Link to="/">
                      Cocktail<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;Recipes<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Search
                    </Link>
                  </h1>
                </div>
                <ul>
                  <li>
                    <Link to="/">HOME</Link>
                  </li>
                  <li>
                    <Link to="/search">SEARCH</Link>
                  </li>
                  <li>
                    <Link to="/favorite">FAVORITE</Link>
                  </li>
                </ul>
              </nav>
              {theme === lightTheme ? (
                  <Button onClick={() => dispatch(changeTheme(darkTheme))}>
                    <TbMoonFilled />
                  </Button>
                ):(
                  <Button onClick={() => dispatch(changeTheme(lightTheme))}>
                    <TbSunFilled />
                  </Button>
              )}
            </section>
          </OpenSideBar>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default Sidebar