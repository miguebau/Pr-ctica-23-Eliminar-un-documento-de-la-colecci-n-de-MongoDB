let express = require('express');
let router = express.Router(); //usamos export.Router 
const mongoose = require('mongoose');
let Person = require('../models/person'); // importamos nuestro esquema de personas

router.post('/personJson',express.json({type:'*/*'}),(req,res)=>{
    console.log(`Nombre: ${req.body.Nombre}\nApellido: ${req.body.Apellido}`)  //Mostramos la informacion
});

router.get('/',async (req,res)=>{ //Definimos como index la tabla de persons
    let data = await Person.find({}); // Crear una consulta a mongo
    res.render('index', {data})
    
});

router.get('/student',  (req, res) => {
    res.render('student'); // creamos una nueva vista ejs 
});

router.post('/addStudent', (req, res) => { 
    const persona = Person({"Nombre":req.body.nombre,"Edad":req.body.edad,"Nss":req.body.nss,"TpSangre":req.body.tpSangre})
    
    persona.save().then(()=>{res.redirect('/');}); 
    
})
router.get('/findById/:id', (req, res)=>{ // buscar por ID 
    Person.findById(req.params.id).then((myPerson)=>{res.render('personUpdate',{myPerson})}).catch((err)=>{res.json({message:err});})
})
router.post('/updatePerson', (req, res)=>{ 
    Person.findByIdAndUpdate(req.body.objId, //Buscar por Id 
        {
            Nombre:req.body.nombre,
            Edad:req.body.edad,
            TpSangre:req.body.tpSangre,
            Nss:req.body.nss
        })
        .then((data)=>{res.redirect('/')}) 
        .catch((err)=>{
            res.json({message: err}) //error 
        });
})
router.get('/deletePerson/:id', (req, res)=>{ // buscar por ID 
    Person.findByIdAndDelete(req.params.id).then(()=>{res.redirect('/')}).catch((err)=>{res.json({message:err});})
})
module.exports = router; //exportamos el router 