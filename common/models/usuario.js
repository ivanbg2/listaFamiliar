'use strict';

module.exports = function (Usuario) {

    /**
     * Enviamos un identificador de usuario y, si ese usuario tiene alguna solicitud en la lista de la 
     * que es miembro el actualmente autenticado, esta solicitud será aprobada.
     * @param {number} idUsuario identificador de usuario
     * @param {Function(Error, string)} callback
     */
    //var app = Usuario.app;

    Usuario.prototype.aceptarSolicitud = function (context, callback) {
        var miembrosLista;
        var usu = this;
        var listaId;
        var solicitud = solicitud;
        //asigna el id del usuario autenticado a la lista 
        var userId = context.req.accessToken.userId;

        Usuario.findById(userId, function (err, usuarioAutenticado) {
            if (err)
                callback(err);
            listaId = usuarioAutenticado.listaFamiliarId;

            var ListaFamiliar = Usuario.app.models.ListaFamiliar;
            ListaFamiliar.findById(listaId, function (err, lista) {
                lista.solicitudes.findById(usu.id, function (err, ls) {

                    ls.listaFamiliarId = lista.id;
                    ls.save();

                    usu.solicitudes.remove(lista, function (err, lista) {

                    });
                });

            });

        });

        callback(null, miembrosLista);
    };

    /**
     * Enviamos un identificador de usuario y, si ese usuario tiene alguna solicitud en la lista de la que es miembro el actualmente autenticado, esta solicitud será rechazada.
     * @param {object} context contexto
     * @param {Function(Error, array)} callback
     */

    Usuario.prototype.rechazarSolicitud = function (context, callback) {
        var miembrosLista;
        var usu = this;
        var listaId;
        var solicitud = solicitud;
        var userId = context.req.accessToken.userId;

        Usuario.findById(userId, function (err, usuarioAutenticado) {
            if (err)
                callback(err);
            listaId = usuarioAutenticado.listaFamiliarId;

            var ListaFamiliar = Usuario.app.models.ListaFamiliar;
            ListaFamiliar.findById(listaId, function (err, lista) {
                lista.solicitudes.findById(usu.id, function (err, ls) {

                    usu.solicitudes.remove(lista, function (err, lista) {

                    });
                });

            });

        });


        callback(null, miembrosLista);
    };


};
