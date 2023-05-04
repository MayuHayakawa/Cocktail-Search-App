import styled, { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import { changeTheme } from '../redux/ThemeSlice/ThemeSlice';
import { lightTheme, darkTheme } from '../redux/ThemeSlice/Theme';
import { TbMoonFilled, TbSunFilled } from 'react-icons/tb';



const Nav = styled.div`
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  display: flex;
  height: 7rem;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  color: ${(props) => props.theme.primary_font_color};
  background-color: ${(props) => props.theme.primary_background_color};
  a {
    color: ${(props) => props.theme.primary_font_color};
  }
  h1 {
    font-size: 2.5rem;
  }
  ul {
    width: 50%;
    display: flex;
    list-style: none;
    justify-content: flex-end;
    li {
      font-size: 1.3rem;
      margin: auto 1rem;
      cursor: pointer;
      a:hover {
        text-decoration: underline;
      }
    }
  }
`

const Button = styled.button`
  margin-left: 1rem;
  padding: 0.7rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.primary_background_color};
  background-color: ${(props) => props.theme.primary_font_color};
  border: none;
  border-radius: 50%;
  cursor: pointer;
`

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);

  return (
    <ThemeProvider theme={theme}>
      <Nav>
        <h1>
          <Link to="/">Cocktail Recipes Search</Link>
        </h1>
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
          {theme === lightTheme ? (
            <Button onClick={() => dispatch(changeTheme(darkTheme))}>
              <TbMoonFilled />
            </Button>
          ) : (
            <Button onClick={() => dispatch(changeTheme(lightTheme))}>
              <TbSunFilled />
            </Button>
          )}
        </ul>
      </Nav>
    </ThemeProvider>
  )
}

export default Navbar