let express=require('express'); //importamos express
const mongoose = require('mongoose'); // importamos mongoose para poder realizar la coneccion con mongodb Atlas

//Rutas
let personsRoutes = require('./src/routes/person');//definimos una variable 

mongoose.Promise = global.Promise;
let app=express(); // variable para usar express
let port=process.env.PORT || 3000; //
require('dotenv').config(); //dotenv permite usar las variables 

//Configuraciones
mongoose.connect(process.env.MONGODB).then(()=>console.log("Base en linea")).catch((err)=>console.log(err)); 

app.use('/assets', express.static(__dirname+'/public'));
app.use(express.urlencoded({extended: false})) 
app.set('view engine', 'ejs'); // Usamos el motor de vistas 
app.use('/',(req, res, next) => {
    console.log('Request URL:' + req.url);
    next()
});

//Redireccion
app.use(personsRoutes); // Llamamos a la variable 

app.listen(port,()=>{console.log("Servidor en linea")}); // Inicamos el server


