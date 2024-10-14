class UserControllers{

    constructor(formId, tableId){

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEditCancel();

    }

    onEditCancel(){

        document.querySelector("#box-user-update .box-cancel").addEventListener(e=>{

            this.showPanelCreate();
        });
    }

    onSubmit(){

      
        
        this.formEl.addEventListener('submit', event => {

            event.preventDefault();

            let btn = this.formEl.querySelector(["type=submit"]);
            btn.disabled = true;

            let values = this.getValues()

            if (!values) return false;

            this.getPhoto().then(()=>{

                values.photos = content;

                this.addLine(values);
            
               this.formEl.reset();

                btn.disabled = false;

            },(e)=>{
                console.error(e);

            });  

            });
            
        

    }// fechando o metodo onSubmit

    getPhoto(){

        return new Promise((resolve, reject)=>{

        
        let fileReader = FileReader()
      // this antes tinha ...
       let elements =  [...this.formEl.elements].filter(item =>{

            if (item.name === "photo"){
                return item;
            }
        
        })

        let file = elements[0].files[0];

        fileReader.onload = () => {

            resolve(FileReader.result);

        }

        fileReader.onerror = (e) => {

            reject (e);

        }

        if (file){
         
            fileReader.readAsDataURL(file);
        
        }else{

                 resolve();       
        }

        
        
    })

    }

    getValues(){
     // getValues é um metodo

     let user = {};
     let isValid = true;

     [...this.formEl.elements].forEach (function (field, index) {

        if (["name", "email", "password"].indexOf(field.name) > -1 && !field.value){

        field.parentElement.classList.add("has-error");

        isValid = false

        }

     if(field.name == 'gender'){
                
                if(field.checked)
                    user[field.name] = field.value;
        
                
              //contém um erro para corrigir -->
              console.log('Sim', field)
            
            }else if (field.name == "admin") {

                user[field.name] = field.checked
                
            }else{
        
                user[field.name] = field.value;
        
            }
        
        })

        if (!isValid){

            return false;
            
        }
    
        
        return new User(user.name, user.gender, user.birth, user.email,user.password, user.country, user.photo, user.admin);



    }//fechando oo metodo getValues
    
    addLine(dataUser){

        let tr = document.createElement("tr");

        tr.dataset.user = JSON.stringify(dataUser);
        tr.innerHTML = ` 
                     <td><img src =${dataUser.photo} alt ="User Image" class = " img-circle img-sm"> </td>
                     <td> ${dataUser.name}</td>
                     <td> ${dataUser.email}</td>
                     <td> ${(dataUser.admin) ? "sim" : "não"}  </td>
                     <td> ${Utils.dateFormat(dataUser.register)}</td>
                     </td>
                       <td>
                         <button type = "button" class = "btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                         <button type = "button" class = "btn btn-danger btn-xs btn-flat">Exclui</button>
                      </td>'`;
   
        this.tableEl.appendChild(tr); 

        tr.querySelector('.btn-edit').addEventListener('click', e=>{

            let json = JSON.parse(tr.dataset.user)
            let form = document.querySelector("#form-user-update")

            for(let name in json){

                let field = form.querySelector("[name=" + name.replace("_", "") +"] ")
                
                field.value = json[name];

                
            }
        
            this.showPanelUpdate()
         
        })

        this.updateCount();
        }

        showPanelCreate(){
            
            document.querySelector('#box-user-create').style.display = "block";
            document.querySelector("#box-user-update").style.display = "none"

        }
    
        showPanelUpdate(){

            document.querySelector('#box-user-create').style.display = "none";
            document.querySelector("#box-user-update").style.display = "block"
            
        }

    updateCount(){
         
        let numberUser = 0
        let numberAdmin = 0

        this.tableEl.children.forEach(tr =>{

            numberUser++;

            let user = JSON.parse(tr.dataset.user)

            if (user._admin) numberAdmin++;
        })

        document.querySelector("#number-user").innerHTML = numberUser;
        document.querySelector("#number-user-admin").innerHTML = numberAdmin;

    }    
   
}