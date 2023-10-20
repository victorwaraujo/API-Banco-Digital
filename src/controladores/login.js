const pool = require('../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJWT = require('../senhaJWT')

const login = async (req, res) => {
  const { email } = req.body

  try {
    const query = 'SELECT * FROM usuarios WHERE email = $1'
    const { rows } = await pool.query(query, [email])
    const { senha: senhaUsuario, ...usuario } = rows[0]

    const token = jwt.sign({ id: usuario.id }, senhaJWT, { expiresIn: '24h' })

    return res.json({
      usuario,
      token
    })
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = login
