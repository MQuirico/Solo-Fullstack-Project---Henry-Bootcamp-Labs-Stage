import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchDriver } from '../../redux/actionCreator'; // Reemplaza esto con la ruta correcta de tu acción.
import Navbar from '../NavBar/NavBar'

const Card = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  max-width: 600px;
  margin: 20px auto;
  margin-top: 130px;
  background-color: lightblue 
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
  const { id } = useParams();
  const driver = useSelector((state) => state.driver.data);
  const dispatch = useDispatch();
  console.log(driver)
 useEffect(() => {
    dispatch(fetchDriver(id));
  }, [id, dispatch]);

  if (typeof driver.id === 'string') {
    return (
      <>
        <Navbar />
        <Card>
          <Image src={driver?.image?.data} alt={driver?.name} />
          <Content>
            <Title>{`${driver?.name} ${driver?.lastName}`}</Title>
            <Paragraph>Nacionalidad: {driver?.nationality}</Paragraph>
            <Paragraph>Fecha de Nacimiento: {new Date(driver?.birthDate).toLocaleDateString()}</Paragraph>
            <Paragraph>Equipos: {driver?.Teams.join(', ')}</Paragraph>
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
  } else {
    return (
      <>
        <Navbar />
        <Card>
          <Image src={driver?.image?.url} alt={driver?.driverRef} />
          <Content>
            <Title>{`${driver?.name?.forename} ${driver?.name?.surname}`}</Title>
            <Paragraph>Nacionalidad: {driver?.nationality}</Paragraph>
            <Paragraph>Fecha de Nacimiento: {driver?.dob}</Paragraph>
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
  }
};

export default Detail;