const pool = require('../conexao')
const bcrypt = require('bcrypt')

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body
  const usuarioId = req.usuario.id
  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10)
    const query =
      'update usuarios SET nome = $1, email = $2, senha = $3 where id = $4'
    await pool.query(query, [nome, email, senhaCriptografada, usuarioId])
    res.status(204).json()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}
module.exports = atualizarUsuario
