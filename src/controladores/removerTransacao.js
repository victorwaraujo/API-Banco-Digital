const pool = require('../conexao')

const removerTransacao = async (req, res) => {
  try {
    const { id } = req.params

    const deleteTransacao = 'DELETE FROM transacoes WHERE id = $1'
    await pool.query(deleteTransacao, [id])

    return res.status(204).end()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = removerTransacao
