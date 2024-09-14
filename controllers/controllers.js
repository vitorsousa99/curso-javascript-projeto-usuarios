class UserControllers{

    constructor(formId, tableId){

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();

    }

    onSubmit(){

      
        
        this.formEl.addEventListener('submit', event => {

            event.preventDefault();

            let values = this.getValues()

            this.getPhoto().then(function(){

            }, function(){

            });

            this.getPhoto((content)=>{

                values.photos = content;
                this.addLine(values); 

            });
            
        });
        

    }// fechando o metodo onSubmit

    getPhoto(){

        return Promise(function(resolve, reject){

        })
        let fileReader = FileReader()
      // this antes tinha ...
       let elements =  [...this.formEl.elements].filter(item =>{

            if (item.name === "photo"){
                return item;
            }
        })

        fileReader.onload = () => {

            resolve(FileReader.result);

        }

        fileReader.onerror = (e) => {

            reject (e);

        }

        fileReader.readAsDataURL(file);

        
        


    }

    getValues(){
     // getValues é um metodo

     let user = {};

     [...this.formEl.elements].forEach (function (field, index) {

     if(field.name == 'gender'){
                
                if(field.checked)
                    user[field.name] = field.value;
        
                console.log('Sim', field)
            
            }else{
        
                user[field.name] = field.value;
        
            }
        
        })

    
        
        return new User(user.name, user.gender, user.birth, user.email,user.password, user.country, user.photo, user.admin);



    }//fechando oo metodo getValues
    
    addLine(dataUser){
   
        this.tableEl.innerHTML = ` 
                 <tr>
                     <td><img src =${dataUser.photo} alt ="User Image" class = " img-circle img-sm"> </td>
                     <td> ${dataUser.name}</td>
                     <td> ${dataUser.email}</td>
                     <td> ${dataUser.admin}</td>
                     <td> ${dataUser.birth}</td>
                     </td>
                       <td>
                         <button type = "button" class = "btn btn-primary btn-xs btn-flat">Editar</button>
                         <button type = "button" class = "btn btn-danger btn-xs btn-flat">Exclui</button>
                      </td>'
                </tr>`;
                 }
}