const fs = require('fs');
const express = require('express');
const app = express();
const puerto = 8080;

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
        async function exe() {
            await fs.promises.readFile(`./${nombreArchivo}`, 'utf-8')
                .then(async (data) => {
                    if(data.length === 0){
                        console.log('el archivo estaba vacio, se ha reseteado a un arr vacio')
                        await fs.promises.writeFile(`./${nombreArchivo}`, '[]')
                    }
                })
                .catch(async (err) => {
                    console.log('se ha creado el archivo')
                    await fs.promises.writeFile(`./${nombreArchivo}`, '[]')
                })
        }
        exe();
    }

    getById(id) {
        setTimeout(async () => {
            let archivo = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            archivo = JSON.parse(archivo);
            let obj = archivo.find(obj => obj.id === id)
            if (obj) {
                console.log(obj);
            } else {
                console.log(null)
            }
        }), 1000
    }

    async getAll() {
        let archivo = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8');
        archivo = JSON.parse(archivo);
        return archivo;
    }
    }

/* COMANDO PARA CREAR EL ARCHIVO */
const productos = new Contenedor('productos.txt'); 

app.get('/', (req, res) => {
    res.send(

       ` <h1 style="color: black" id="af" >Holanda</h1>
         <a href="http://localhost:8080/productos">Productos</a> 
         <a href="http://localhost:8080/productosRandom">Productos random</a> 
       `
    )
} )

app.get('/productos', async(req, res) => {
    const allProducts = await productos.getAll();
    if(allProducts.length === 0){
        res.send('no hay productos');
    }else{
        res.send(allProducts);
    }
})

app.get('/productosRandom', async(req, res) => {
    const prodRandom = await productos.getAll();
    if(prodRandom.length === 0){
        res.send('no hay productos');
    }else{
        const random = Math.floor(Math.random() * prodRandom.length);
        res.send(prodRandom[random]);
    }
})

app.listen(puerto, err => {
    if (err) {
        console.log(`Hubo un error al inciar el servidor : ${err}`)
    } else {
        console.log(`Servidor escuchando el puerto: ${puerto}`)
    }
})