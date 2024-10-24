class UserControllers{

    constructor(formIdCreate,formIdUpdate, tableId){

        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEditCancel();

    }

    onEdit(){

        document.querySelector("#box-user-update .box-cancel").addEventListener(e=>{

            this.showPanelCreate();
        });
        this.formUpdateEl.addEventListener("submit", event =>{
            event.preventDefault();

            let btn = this.formUpdateEl.querySelector(["type=submit"]);
            btn.disabled = true;

            let values = this.getValues(this.formUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex;

            let tr = this.tableEl.rows[index]

            tr.dataset.user = JSON.stringify(values);

            tr.innerHTML = ` 
                     <td><img src =${dataUser.photo} alt ="User Image" class = " img-circle img-sm"> </td>
                     <td> ${values.name}</td>
                     <td> ${values.email}</td>
                     <td> ${(values.admin) ? "sim" : "não"}  </td>
                     <td> ${Utils.dateFormat(values.register)}</td>
                     </td>
                       <td>
                         <button type = "button" class = "btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                         <button type = "button" class = "btn btn-danger btn-xs btn-flat">Exclui</button>
                      </td>'`;

                      this.addEventsTr(tr)

                      this.updateCount()
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

     [...formEl.elements].forEach (function (field, index) {

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
                      
                      this.showPanelUpdate()
                      
                    
                    this.addEventsTr(tr)
                    
                    this.tableEl.appendChild(tr); 
                    this.updateCount();
        }

        addEventsTr(){
            tr.querySelector('.btn-edit').addEventListener('click', e=>{

                let json = JSON.parse(tr.dataset.user)
    
                this.formUpdateEl.dataset.trIndex = tr.sectionRowIndexrowIndex
    
                for(let name in json){
    
                    let field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") +"] ")
                    
                    
    
                    if(field){
    
                        switch(field.type){
                            case "file":
                             continue;
                             break;
    
                           case "radio":
                            
                            field = this.formUpdateEl.querySelector("[name=" +   
                            name.replace("_", "")+ "][value=" + json  
                            [name]+"]");  
                            field.checked = true;
                           break;
    
                           case "checkbox":
                            field.checkbox = json[name];
                            break;
    
                            default:
                                field.value = json[name]
                           }

                        }
    
                        
                    }

                    this.formUpdateEl.querySelector('.photo').src = json._photo;

                    this.showPanelUpdate()
                    
            });
                    
                }
                showPanelCreate() {
    
   
                    // Mostra o painel de criação e esconde o de atualização
                        document.querySelector('#box-user-create').style.display = "block";
                        
                       
                    document.querySelector("#box-user-update").style.display = "none";
                    }
                    
        
                }
                    
                    showPanelCreate(){
            
                        document.querySelector('#box-user-create').style.display = "block";
                        document.querySelector("#box-user-update").style.display = "none"
                    }
                    
                    showPanelUpdate(){
                    
                        document.querySelector('#box-user-create').style.display = "none";
                        document.querySelector("#box-user-update").style.display = "block";
                        
                    }
                    
                    updateCount(){
                     
                    let numberUser = 0;
                    let numberAdmin = 0;
                    
                    this.tableEl.children.forEach(tr =>{
                    
                        numberUser++;
                    
                        let user = JSON.parse(tr.dataset.user)
                    
                        if (user._admin) numberAdmin++;
                    })
                    
                    document.querySelector("#number-user").innerHTML = numberUser;
                    document.querySelector("#number-user-admin").innerHTML = numberAdmin;
                    
                    }    
                        
            }
