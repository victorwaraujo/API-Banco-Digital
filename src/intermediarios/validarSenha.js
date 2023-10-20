const bcrypt = require('bcrypt')
const pool = require('../conexao')

const validarSenha = async (req, res, next) => {
  const { email, senha } = req.body

  try {
    const query = 'SELECT * FROM usuarios WHERE email = $1'
    const { rows } = await pool.query(query, [email])
    const { senha: senhaUsuario, ...usuario } = rows[0]

    const senhaCorreta = await bcrypt.compare(senha, senhaUsuario)

    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: 'Email ou senha inválida.' })
    }

    req.usuario = usuario
    next()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = validarSenha
