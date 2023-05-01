import styled, { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import { changeTheme } from '../redux/ThemeSlice/ThemeSlice';
import { lightTheme, darkTheme } from '../redux/ThemeSlice/Theme';

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

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);
  console.log(theme);

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
            <button onClick={() => dispatch(changeTheme(darkTheme))}>Dark mode</button>
          ) : (
            <button onClick={() => dispatch(changeTheme(lightTheme))}>Light mode</button>
          )}
        </ul>
      </Nav>
    </ThemeProvider>
  )
}

export default Navbar