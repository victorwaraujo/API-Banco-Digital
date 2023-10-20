// const validarNomeEmailSenha = (req, res, next) => {
//   const { nome, email, senha } = req.body

//   if (!nome || !email || !senha) {
//     return res
//       .status(400)
//       .json({ mensagem: 'Os campos nome, email e senha são obrigatórios.' })
//   }
//   next()
// }

// const validarEmailSenha = (req, res, next) => {
//   const { email, senha } = req.body

//   if (!email || !senha) {
//     return res
//       .status(400)
//       .json({ mensagem: 'Os campos email e senha são obrigatórios.' })
//   }
//   next()
// }

// const validarCamposTransacao = (req, res, next) => {
//   const { descricao, valor, data, categoria_id, tipo } = req.body

//   if (!descricao || !valor || !data || !categoria_id || !tipo) {
//     return res.status(400).json({
//       mensagem: 'Todos os campos obrigatórios devem ser informados.'
//     })
//   }

//   next()
// }

const validarCorpoRequisicao = joiSchema => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body)
    next()
  } catch (error) {
    // console.log(error)
    return res.status(400).json({ mensagem: error.message })
  }
}

module.exports = {
  validarCorpoRequisicao
}
