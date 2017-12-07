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
            if (err)
                callback(err);
            usuarioId = usuarioAutenticado.listaFamiliarId;
            Producto.updateAll({listaFamiliarId: usuarioId}, {comprar: 'false'}, function (err, info) {
                callback(null, salida);
            });
        });

    };

//    Producto.beforeRemote('post', function (context, Producto, next) {
//
//        Producto.updateAll({}, function(err, info){
//            
//        });
//        next();
//    });

    /**
     * Deberá negar el atributo comprar del producto indicado, es decir, si anteriormente estaba a false se pondrá a true y viceversa
     * @param {object} contexto contexto
     * @param {Function(Error, array)} callback
     */

    Producto.prototype.comprado = function (callback) {
       // var productosUsuarioAutenticado;
        var productos = this;

        productos.comprar = !(productos.comprar);
        productos.save(function (err) {
             if(err) callback(err);
            Producto.find({where: {listaFamiliarId: productos.listaFamiliarId}}, function (err, products) {
                if(err) callback(err);
                callback(null, products);
            });
        });

    };
};
