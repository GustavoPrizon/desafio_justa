import React, { Component } from 'react';
import { FaCalculator, FaPlus, FaSpinner } from 'react-icons/fa';
import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, Footer } from './styles';

export default class Main extends Component {
  state = {
    newPerso: '',
    personagem: [],
    loading: false,
    error: null,
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    const personagem = localStorage.getItem('personagem');

    if (personagem) {
      this.setState({ personagem: JSON.parse(personagem) });
    }
  }

  // Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { personagem } = this.state;

    if (prevState.personagem !== personagem) {
      localStorage.setItem('personagem', JSON.stringify(personagem));
    }
  }

  handleInputChange = e => {
    this.setState({ newPerso: e.target.value, error: null });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: false });

    try {
      const { newPerso, personagem } = this.state;

      if (newPerso === '') throw 'Você precisa digitar um Pokemon';

      const hasPerso = personagem.find(r => r.name === newPerso);

      if (hasPerso) throw 'Pokemon duplicado';

      const response = await api.get(`/pokemon/${newPerso}`);

      const data = {
        name: response.data.name,
        weight: response.data.weight,
        image: response.data.sprites.front_default,
      };

      this.setState({
        personagem: [...personagem, data],
        newPerso: '',
      });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newPerso, personagem, loading, error } = this.state;

    return (
      <Container>
        <h1>
          <FaCalculator />
          <span>Buscar Pokemons!</span>
        </h1>
        <h4>
          Para preencher a tabela, busque um Pokemon entre os numeros de 1 e
          802.
        </h4>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Buscar Pokemon"
            value={newPerso}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {personagem.map(character => (
            <li key={character.name}>
              Name: <span>{character.name}</span>
              Peso: <span>{character.weight}</span>
              Image: <img src={character.image} />
            </li>
          ))}
        </List>

        <Footer>
          <span>Desenvolvido para o teste da Justa, por Gustavo Prizon.</span>
        </Footer>
      </Container>
    );
  }
}
