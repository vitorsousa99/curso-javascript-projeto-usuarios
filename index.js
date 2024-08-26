/*
let nome = document.querySelector('#exampleInputName')
let gender = document.querySelectorAll('#form-user-create [name=gender]:checked') // => o conchetes serve para filtrar, pois aqui só queremos saber se vai ser masculino ou feminino (entao nao precisa fazer duas variaveis). // => Os : é psideucodigo so interessa quem está marcado  
let birth = document.querySelector('#exampleInputBirth')
let country = document.querySelector('#exampleInputCountry')
let email = document.querySelector('#exampleInputEmail')
let password = document.querySelector('#exampleInputPassword')
let photo = document.querySelector('#exampleInputFile')
let admin = document.querySelector('#admin')*/


var fields = document.querySelectorAll('#form-user-create [name]')
var user = {}// utilizando json

//forEach irá percorrer cada array linha com uma função dentro.
fields.forEach(function(field,index){

    if(field.name == 'gender'){

        if(field.checked)
            user[field.name] = field.value;

        console.log('Sim', field)
    
    }else{

        user[field.name] = field.value;// utilizando json

    }

  

})
