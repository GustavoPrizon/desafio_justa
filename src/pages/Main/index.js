/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Container from '../../components/Container';
import { MainButton, Footer } from './styles';

const data = [
  {
    name: '2014',
    bilhoes: 150,
  },
  {
    name: '2015',
    bilhoes: 230,
  },
  {
    name: '2016',
    bilhoes: 280,
  },
  {
    name: '2017',
    bilhoes: 310,
  },
  {
    name: '2018',
    bilhoes: 380,
  },
  {
    name: '2019',
    bilhoes: 416,
  },
];

export default class Example extends Component {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/7j5bbbum/';

  render() {
    return (
      <Container>
        <h2> Crescimento de compras no cartão </h2>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="bilhoes"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <MainButton>
          <Link to="tabela">Tabela</Link>
        </MainButton>

        <Footer>
          <span>Desenvolvido para o teste da Justa, por Gustavo Prizon.</span>
        </Footer>
      </Container>
    );
  }
}
