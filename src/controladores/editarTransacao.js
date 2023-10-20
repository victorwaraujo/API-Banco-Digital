const pool = require('../conexao')

const editarTransacao = async (req, res) => {
  try {
    const { id } = req.params
    const usuarioId = req.usuario.id
    const { descricao, valor, data, categoria_id, tipo } = req.body

    const transacaoQuery =
      'SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2'
    const transacao = await pool.query(transacaoQuery, [id, usuarioId])

    if (transacao.rowCount === 0) {
      return res.status(404).json({
        mensagem: 'Transação não encontrada ou não pertence ao usuário logado.'
      })
    }

    const categoriaQuery = 'SELECT * FROM categorias WHERE id = $1'
    const categoria = await pool.query(categoriaQuery, [categoria_id])

    if (categoria.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada.' })
    }

    const updateQuery = `
      UPDATE transacoes
      SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5
      WHERE id = $6
    `
    await pool.query(updateQuery, [
      descricao,
      valor,
      data,
      categoria_id,
      tipo,
      id
    ])

    return res.status(204).send()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = editarTransacao
