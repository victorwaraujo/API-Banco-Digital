const pool = require('../conexao')

const listarCategorias = async (req, res) => {
  try {
    const query = 'select * from categorias'
    const { rows } = await pool.query(query)

    res.status(200).json(rows)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = listarCategorias
