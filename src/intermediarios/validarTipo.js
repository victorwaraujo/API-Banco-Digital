const pool = require('../conexao')

const validarTipo = (req, res, next) => {
  const { tipo } = req.body

  if (tipo !== 'entrada' && tipo !== 'saida') {
    return res
      .status(400)
      .json({ mensagem: 'O campo "tipo" deve ser "entrada" ou "saida".' })
  }
  next()
}

const validarTransacao = async (req, res, next) => {
  const { id } = req.params
  const usuarioId = req.usuario.id
  const consultaTransacao =
    'SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2'
  const { rowCount } = await pool.query(consultaTransacao, [id, usuarioId])
  if (rowCount === 0) {
    return res.status(404).json({ mensagem: 'Transação não encontrada.' })
  }

  next()
}

module.exports = { validarTipo, validarTransacao }
