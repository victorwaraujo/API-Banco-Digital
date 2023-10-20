const joi = require('joi')

const schemaTransacao = joi.object({
  descricao: joi.string().required().messages({
    'any.required': 'O campo descricao é obrigatório',
    'string.empty': 'O campo descricao é obrigatório'
  }),

  valor: joi.number().integer().required().messages({
    'any.required': 'O campo valor é obrigatório'
  }),

  data: joi.string().required().messages({
    'any.required': 'O campo data é obrigatório',
    'string.empty': 'O campo data é obrigatório'
  }),
  categoria_id: joi.number().required().messages({
    'any.required': 'O campo categoria_id é obrigatório'
  }),
  tipo: joi.string().required().messages({
    'any.required': 'O campo tipo é obrigatório',
    'string.empty': 'O campo tipo é obrigatório'
  })
})

module.exports = schemaTransacao
