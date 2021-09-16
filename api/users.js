const User = require('../models/User')
const fs = require('fs')
const multer  = require('multer')
require('express-zip');

module.exports = app => {
    const getAll = async (req,res)=> {
        User.query().withGraphFetched('Role')
        .orderBy('id')
        .then(users => res.status(200).json(users))           
        //.catch(error => res.status(500).send(error)) 
    }
    
    const getById = async (req,res)=> {
        User.query().withGraphFetched('Role').findById(req.params.id)
        .then(users => res.status(200).json(users))   
        //.catch(error => res.status(500).send(error)) 
    }


    const insert = async (req,res) => {
        const user = req.body
        user.role_id=1
        User.query().insert(user)
        .then(user => res.status(201).json(user))
        .catch(error => res.status(500).json(error))
    }

    const update = (req,res) => {     
        const user = req.body   
        user.role_id=1
        User.query().findById(req.params.id).patch(user)
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error))
    }

    
    //File operations
    const storage = multer.diskStorage({
        destination: (req,file,cb) => {
            const id = req.params.id
            const path = `${__dirname}/../filesStorage/user/${id}`
            if(!fs.existsSync(path)) fs.mkdirSync(path)
            cb(null,path)
        },
        filename: (req, file,cb) => {
            cb(null,file.originalname)
        }
    })
    const userFiles = multer({ storage })
    
    const saveFiles = (req, res ) => {
        res.status(200).send('arquivo salvo com sucesso')        
    }

    const getFiles = (req,res) => {
        const id = req.params.id
        const path = `${__dirname}/../filesStorage/user/${id}`
        fs.readdir(path,(err, files) => {
            const fileZip = []            
            files.forEach(file => {
                console.log(file)
                fileZip.push( { path: `${path}/${file}`, name: file })
            })            
            res.zip(fileZip,'anexos.zip')  
        })                
    }

    const getFileByName = (req, res) => {
        const id = req.params.id
        const fileName = req.query.fileName
        const userPath = `${__dirname}/../filesStorage/user/${id}/${fileName}`
        const path = require('path')
        res.download(path.resolve(userPath))  
    }

    const getFileNames = (req, res) => {
        const id = req.params.id
        const path = `${__dirname}/../filesStorage/user/${id}`
        fs.readdir(path,(err,files) => {
            res.status(200).json(files)
        })
    }

    const deleteFile = (req, res ) => {
        const id = req.params.id
        const fileName = req.query.fileName
        const userPath = `${__dirname}/../filesStorage/user/${id}/${fileName}`
        fs.unlink(userPath,(err) => {
            res.status(200).send('Arquivo deletado com sucesso!')
        })
    }

    return { getAll, 
             insert, 
             getById, 
             update, 
             userFiles, 
             saveFiles, 
             getFiles,
             getFileNames,
             getFileByName,
             deleteFile
            }
}