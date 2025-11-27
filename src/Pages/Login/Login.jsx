import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(function(prev) {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login realizado com sucesso!');
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userName', data.user.name);
        navigate('/estoque');
      } else {
        setError(data.message || 'Erro ao fazer login');
      }
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  function handleDemoLogin() {
    setFormData({
      email: 'admin@loja.com',
      password: '123456'
    });
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
  
          <h1>TechStock</h1>
          <p>Sistema de Controle de Estoque</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Sua senha"
              required
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <div className="demo-info">
          <p><strong>Dados para teste:</strong></p>
          <p>E-mail: admin@loja.com</p>
          <p>Senha: 123456</p>
          <button 
            type="button" 
            className="demo-button"
            onClick={handleDemoLogin}
            disabled={loading}
          >
            Preencher Dados de Teste
          </button>
        </div>

        
      </div>
    </div>
  );
}

export default Login;