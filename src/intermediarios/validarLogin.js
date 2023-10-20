const jwt = require('jsonwebtoken')
const senhaJWT = require('../senhaJWT')
const pool = require('../conexao')

const verificarLogin = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      mensagem:
        'Para acessar este recurso um token de autenticação válido deve ser enviado.'
    })
  }
  const token = authorization.split(' ')[1]

  try {
    const { id } = jwt.verify(token, senhaJWT)

    const { rows, rowCount } = await pool.query(
      'select * from usuarios where id = $1',
      [id]
    )

    if (rowCount === 0) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado' })
    }

    const { senha, ...usuario } = rows[0]

    req.usuario = usuario

    next()
  } catch (error) {
    return res.status(401).json({ mensagem: 'Token de autenticação inválido' })
  }
}

module.exports = verificarLogin
