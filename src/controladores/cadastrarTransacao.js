const pool = require('../conexao')

const cadastrarTransacao = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body
  const usuario_id = req.usuario.id
  try {
    const categoriaQuery = 'SELECT id FROM categorias WHERE id = $1'
    const categoriaResult = await pool.query(categoriaQuery, [categoria_id])

    if (categoriaResult.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada.' })
    }

    const inserirTransacaoQuery = `
      INSERT INTO transacoes (descricao, valor, data, categoria_id, usuario_id, tipo)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `

    const { rows } = await pool.query(inserirTransacaoQuery, [
      descricao,
      valor,
      data,
      categoria_id,
      usuario_id,
      tipo
    ])

    return res.status(201).json(rows[0])
  } catch (error) {
    console.error(error)
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = cadastrarTransacao
