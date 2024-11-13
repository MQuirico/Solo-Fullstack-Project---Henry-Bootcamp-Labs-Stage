import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocation } from 'react-router-dom';
import Navbar from '../NavBar/NavBar'

const scaleIn = keyframes`
 0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
    opacity: 1;
  }
`

const Card = styled.div`
  animation: ${scaleIn} 1s ease-in-out;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  border: 6px solid whitesmoke;
  overflow: hidden;
  max-width: 70vw;
  width: 70vw;
  position: absolute;
  top: 10vh;
  left: 13vw;
  background-color: rgba(167, 143, 115, 0.9);
  font-family: 'Viga', sans-serif;

`;

const Image = styled.img`
  width: 300px;
  height: auto;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  margin-bottom: 8px;
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Detail = () => {
const location = useLocation()
const driver = location?.state?.driver
var finalDBdate
 
console.log(driver)
console.log(typeof driver?.birthDate)

if (typeof driver?.id === "string"){
let fechaDB = new Date(driver?.birthDate)
fechaDB.toLocaleDateString(navigator.language, {
  year: "numeric",
  month: "numeric",
  day: "numeric"
})
finalDBdate = fechaDB.toString()
}
 
    return (
      <>
        <Navbar />
        <Card>
          <Image src={driver?.image?.url || driver?.image} alt={driver?.driverRef} />
          <Content>
            <Title>{`${driver?.name?.forename} ${driver?.name?.surname}`}</Title>
            <Paragraph>Nacionalidad: {driver?.nationality}</Paragraph>
            <Paragraph>Fecha de Nacimiento: {driver?.dob}{finalDBdate} </Paragraph>
            <Paragraph>Equipos: {driver?.teams}</Paragraph>
            <Paragraph>Descripción: {driver?.description}</Paragraph>
            <Paragraph>
              <Link href={driver?.url} target="_blank" rel="noopener noreferrer">
                Más información
              </Link>
            </Paragraph>
          </Content>
        </Card>
      </>
    );
  
};

export default Detail;