import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastroLivro.css';

const CadastroProduto = () => {
  const [formData, setFormData] = useState({
    nome: '',
    fabricante: '',
    tipo: '',
    quantidade: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/produto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao cadastrar produto');
      }

      alert('Produto cadastrado com sucesso!');

      setFormData({
        nome: '',
        fabricante: '',
        tipo: '',
        quantidade: ''
      });
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err);
      setError(err.message || 'Erro inesperado ao cadastrar produto');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="cadastro-produto-container">
      <div className="logo-container">
        <div className="logo-placeholder">
          <div className="logo-circle"></div>
          <h1>Cadastro de Produtos Eletrônicos</h1>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="produto-form">
          <div className="form-section">
            <h2>Informações Básicas</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nome">Nome do Produto:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  placeholder="Ex: iPhone 15 Pro"
                />
              </div>

              <div className="form-group">
                <label htmlFor="fabricante">Fabricante:</label>
                <input
                  type="text"
                  id="fabricante"
                  name="fabricante"
                  value={formData.fabricante}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Samsung, Apple, etc."
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantidade">Quantidade em Estoque:</label>
              <input
                type="number"
                id="quantidade"
                name="quantidade"
                value={formData.quantidade}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tipo">Tipo de Produto:</label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
              >
                <option value="">Selecione o tipo</option>
                <option value="smartphone">Smartphone</option>
                <option value="tablet">Tablet</option>
                <option value="notebook">Notebook</option>
                <option value="smarttv">Smart TV</option>
                <option value="smartwatch">Smartwatch</option>
                <option value="acessorio">Acessório</option>
                <option value="outros">Outros</option>
              </select>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="button-group">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              Cadastrar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroProduto;