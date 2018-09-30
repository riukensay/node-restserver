const express = require('express'),
    fileUpload = require('express-fileupload'),
    app = express(),
    Usuario = require('../models/usuario'),
    Producto = require('../models/producto');
fs = require('fs'),
    path = require('path');

app.use(fileUpload());

app.put('/upload/:tipo/:id', function(req, res) {
    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files)
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'No se ha seleccionado ningun archivo'
                }
            });

    //Validar TIpo
    let tiposValidos = ['productos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: `El tipo no es valido, los tipos permitidos son ${tiposValidos.join(', ')}.`
                }
            });
    }


    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];
    //Extensiones validas
    let extensionesPermitidas = ['png', 'jpg', 'jpeg', 'gif'];
    console.log(extension);
    if (extensionesPermitidas.indexOf(extension) < 0) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: `La extension no es valida, solo se permiten ${extensionesPermitidas.join(', ')}.`
                }
            });
    }

    //<Cambiar nombre al Archivo
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`

    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
        if (err)
            return res.status(500)
                .json({
                    ok: false,
                    err
                });
        if (tipo == 'usuarios') {
            imagenUsuario(id, res, nombreArchivo);
        } else {
            imagenProducto(id, res, nombreArchivo);
        }
    });
});

function imagenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuarioBD) => {
        if (err) {
            borrarArchivo('usuarios', nombreArchivo);
            return res.status(500)
                .json({
                    ok: false,
                    err
                });
        }
        if (!usuarioBD) {
            borrarArchivo('usuarios', nombreArchivo);
            return res.status(400)
                .json({
                    ok: false,
                    err: {
                        message: 'Usuario no valido'
                    }
                });
        }
        borrarArchivo('usuarios', usuarioBD.img);

        usuarioBD.img = nombreArchivo;

        usuarioBD.save((err, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            });
        });
    });
}

function imagenProducto(id, res, nombreArchivo) {
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            borrarArchivo('productos', nombreArchivo);
            return res.status(500)
                .json({
                    ok: false,
                    err
                });
        }
        if (!productoDB) {
            borrarArchivo('productos', nombreArchivo);
            return res.status(400)
                .json({
                    ok: false,
                    err: {
                        message: 'Producto no valido'
                    }
                });
        }
        borrarArchivo('productos', productoDB.img);

        productoDB.img = nombreArchivo;

        productoDB.save((err, productoGuardado) => {
            res.json({
                ok: true,
                usuario: productoGuardado,
                img: nombreArchivo
            });
        });
    });
}

function borrarArchivo(tipo, nombreImagen) {
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);

    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}

module.exports = app;