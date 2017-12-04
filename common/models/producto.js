'use strict';

module.exports = function (Producto) {

    /**
     * Crear un método que ponga el atributo comprar de todos los productos de una lista a false.
     * @param {number} idProducto id de los productos
     * @param {string} contexto context
     * @param {Function(Error, number)} callback
     */

    Producto.limpiarLista = function (context, callback) {
        var salida;
        var userId = context.req.accessToken.userId;
        var Usuario = Producto.app.models.Usuario;
        var usuarioId;

        Usuario.findById(userId, function (err, usuarioAutenticado) {
            if (err) callback(err);
            usuarioId=usuarioAutenticado.listaFamiliarId;
           Producto.updateAll({listaFamiliarId:usuarioId},{comprar:'false'}, function(err, info) {
               callback(null, salida);
            });
        });
       
    };

};
