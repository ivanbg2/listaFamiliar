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
        Usuario.findById(userId, function (err, usuario) {
            if (err)
                next(err)
            usuario.listaFamiliarId = Listafamiliar.id;
            usuario.save();
            next();
        });

    });
    //Debemos crear un punto de entrada POST /ListasFamiliares/{id}/solicitar, que inserte en la 
    //tabla de solucitudes una fila que contenga el id de la lista familiar a la que se quiere 
    //pertenecer y el id del usuario que está autenticado.

    /**
     * inserta tabla de solicitudes id
     * @param {Function(Error, object)} callback
     */

    ListaFamiliar.prototype.solicitar = function (context, callback) {
        var salida;
        var userId = context.req.accessToken.userId;
        var lista = this;
        var Usuario = ListaFamiliar.app.models.Usuario;

        Usuario.findById(userId, function (err, pepe) {
            if (err)
                callback(err);
            lista.solicitudes.add(pepe,
                    function (err, vuelta) {
                        salida = vuelta;
                        callback(null, salida);
                    });
        });




    };



};

          