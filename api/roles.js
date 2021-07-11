const Role = require('../models/Role')

module.exports = app => {
    const getAll = (req,res)=> {
        Role.query().withGraphFetched('User')
            .then(roles => res.json(roles))
                    .catch(error => res.status(500).json(error))
    }

    const getOne = (req, res) => {
        const id = req.params.id
        if(!id){
            res.status(400).json({error: "Id não informado"})
        }        
        Role.query().findById(id)
        .then(role => res.status(200).json(role))

    }

    const insert = (req, res) => {
        
        if(!req.body.role_name){
            res.status(400).json({error: "nome não informado"})
        }
        Role.query().insert(req.body)
        .then((role)=> res.status(201).json(role))
        .catch(err => res.status(500).json(err))        
    }
 
    const update = async (req,res) => {
        const id = req.params.id        
        const valid = await updateValidation(id)
        
        if(!valid.status){
            res.status(400).json(valid.message)
        }    
        let updated = req.body
        updated.id=id
        Role.query().
        findById(id)
        .patch(req.body)        
        .then(role => res.status(200).json(updated))
        .catch(error => res.status(500).json(error))
    }

    const del = async (req,res)=> {
        const id = req.params.id
        const valid = await updateValidation(id)
        if(!valid.status){            
            res.status(400).json(valid.message)
        }
        app.knex('roles').del().where({id})
        .then(_ => res.status(200).send())
        .catch(error => res.status(500).json(error))
    }


    const updateValidation = async (id) => {
        if(!id){
            return { 
                status: false,
                message: "Id não informado ou inválido"
            }
        }

        const oldRole = await app.knex('roles').select('*').where({id}).first()
        if(!oldRole){
            return {
                status: false,
                message: "Papel não localizado para atualização"
            }
        }
        return {
            status: true
        }

    }

    return { getAll, insert, update, del, getOne}
}