import styled from 'styled-components'

const blmGrey = 'rgb(33, 33, 33)';
const blmMetal = 'rgb(66, 66, 66)';


const Home: any = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  background: linear-gradient(20deg, ${blmGrey}, ${blmMetal});
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  box-sizing: border-box;
  min-height: 100vh;
  padding: 100px 0px;
`


Home.Header = styled.header`
    padding: 4rem 0;
    flex-direction: column;
    font-size: 100px;
`

Home.Tagline = styled.h1`
  margin: 0;
  padding: 2.6rem;
  font-weight: 600;
  font-size: 1.3rem;
`;

Home.Content = styled.h2`
  margin: 0;
  padding: 0.2rem;
  font-size: 1.1rem;
  font-weight: 400;
`;

Home.Title = styled.div`
  margin: 0;
`;

export {Home}
