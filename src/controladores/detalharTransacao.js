const pool = require('../conexao')

const detalharTransacao = async (req, res) => {
  try {
    const { id } = req.params
    const usuarioId = req.usuario.id

    const query = `
      SELECT t.id, t.descricao, t.valor, t.data, t.categoria_id, t.tipo, c.descricao AS categoria_nome 
      FROM transacoes t
      JOIN categorias c ON t.categoria_id = c.id
      WHERE t.id = $1 AND t.usuario_id = $2
    `
    const { rows, rowCount } = await pool.query(query, [id, usuarioId])

    if (rowCount === 0) {
      return res.status(404).json({ mensagem: 'Transação não encontrada.' })
    }

    return res.status(200).json(rows[0])
  } catch (error) {
    console.error(error)
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = detalharTransacao
