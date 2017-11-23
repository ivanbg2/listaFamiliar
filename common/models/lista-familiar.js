'use strict';

module.exports = function (ListaFamiliar) {
    ListaFamiliar.beforeRemote('create', function (context, Listafamiliar, next) {

        context.args.data.owner = context.req.accessToken.userId;
        next();
    });
    ListaFamiliar.afterRemote('create', function (context, Listafamiliar, next) {
        var app = ListaFamiliar.app;
        var userId = context.req.accessToken.userId;
        var id = context.args.data.listaFamiliarId;

        
        var Usuario = app.models.Usuario;
        console.log(Usuario);
        Usuario.findById(userId, function(err, usuario){
        if(err) next(err)
        usuario.listaFamiliarId=Listafamiliar.id;
        usuario.save();
        next();
    })
        
    })

};
