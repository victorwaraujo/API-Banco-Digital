const pool = require('../conexao')

const verificarEmailEmUso = async (req, res, next) => {
  const { email } = req.body

  try {
    const emailExiste = await pool.query(
      'select * from usuarios where email = $1',
      [email]
    )

    if (emailExiste.rowCount > 0) {
      return res.status(400).json({
        mensagem: 'Já existe usuário cadastrado com o e-mail informado.'
      })
    }

    next()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

const verificarEmailExistente = async (req, res, next) => {
  const { email } = req.body

  try {
    const emailExiste = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    )

    if (emailExiste.rowCount === 0) {
      return res.status(400).json({
        mensagem: 'Email ou senha inválida.'
      })
    }

    next()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = { verificarEmailEmUso, verificarEmailExistente }
