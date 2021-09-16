
module.exports = app => {
    app.route('/roles')
        .get(app.api.roles.getAll)    
        .post(app.api.roles.insert)


    app.route('/soap')
        .get(app.api.soap.testSoap) 
    
    app.route('/roles/:id')        
        .put(app.api.roles.update)
        .delete(app.api.roles.del)
        .get(app.api.roles.getOne)


    app.route('/users')
        .get(app.api.users.getAll)
        .post(app.api.users.insert)
        //.post(app.api.users.insert)
    
    app.route('/users/:id')
    .get(app.api.users.getById)
    .patch(app.api.users.update)

    app.route('/userfiles/:id')
    .post(app.api.users.userFiles.array('file'),app.api.users.saveFiles)
    .get(app.api.users.getFiles)

    app.route('/userfilename/:id')    
    .get(app.api.users.getFileNames)
    
    app.route('/userfile/:id')    
    .get(app.api.users.getFileByName)
    .delete(app.api.users.deleteFile)

}    