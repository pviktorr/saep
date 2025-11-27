import React, { useEffect, useState } from 'react';
import './TelaEstoque.css';

const produtosIniciais = [
  { id: 1, nome: 'iPhone 15 Pro', fabricante: 'Apple', tipo: 'smartphone', quantidade: 10 },
];

function TelaEstoque() {
  const [produtos, setProdutos] = useState(produtosIniciais);
  const [busca, setBusca] = useState('');
  const [editingProduto, setEditingProduto] = useState(null);
  const [editForm, setEditForm] = useState({
    id: null,
    nome: '',
    fabricante: '',
    tipo: '',
    quantidade: 0,
  });

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await fetch('http://localhost:3001/api/produtos');
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setProdutos(data);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos da API:', error);
      }
    }

    // Ative o fetch acima quando sua API estiver pronta
    // carregarProdutos();
  }, []);

  const produtosFiltrados = produtos.filter((p) => {
    const termo = busca.toLowerCase();
    return p.nome.toLowerCase().includes(termo);
  });

  function abrirModalEdicao(produto) {
    setEditingProduto(produto);
    setEditForm({
      id: produto.id,
      nome: produto.nome,
      fabricante: produto.fabricante,
      tipo: produto.tipo,
      quantidade: produto.quantidade,
    });
  }

  function fecharModal() {
    setEditingProduto(null);
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === 'quantidade' ? Number(value) : value,
    }));
  }

  function salvarEdicao(e) {
    e.preventDefault();
    setProdutos((prev) =>
      prev.map((p) => (p.id === editForm.id ? { ...p, ...editForm } : p))
    );
    fecharModal();
  }

  return (
    <div className="estoque-container">
      <div className="estoque-card">
        <div className="estoque-header">
          <h1>Estoque de Produtos</h1>
          <p>Visualize os produtos cadastrados e faça a edição quando necessário.</p>
        </div>

        <div className="estoque-actions">
          <input
            type="text"
            className="estoque-search"
            placeholder="Buscar por nome, fabricante ou categoria..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="estoque-table-wrapper">
          <table className="estoque-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Fabricante</th>
                <th>Categoria</th>
                <th>Quantidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtosFiltrados.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.nome}</td>
                  <td>{produto.fabricante}</td>
                  <td>{produto.tipo}</td>
                  <td>{produto.quantidade}</td>
                  <td>
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => abrirModalEdicao(produto)}
                    >
                      ✏️ Editar
                    </button>
                  </td>
                </tr>
              ))}
              {produtosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={5} className="estoque-empty">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingProduto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Produto</h2>
            <form onSubmit={salvarEdicao} className="modal-form">
              <div className="form-group">
                <label htmlFor="nome">Nome do Produto:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={editForm.nome}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="fabricante">Fabricante:</label>
                <input
                  type="text"
                  id="fabricante"
                  name="fabricante"
                  value={editForm.fabricante}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="tipo">Categoria:</label>
                <input
                  type="text"
                  id="tipo"
                  name="tipo"
                  value={editForm.tipo}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantidade">Quantidade em Estoque:</label>
                <input
                  type="number"
                  id="quantidade"
                  name="quantidade"
                  value={editForm.quantidade}
                  onChange={handleEditChange}
                  min="0"
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={fecharModal}
                >
                  Cancelar
                </button>
                <button type="submit" className="submit-button">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TelaEstoque;
