class UserControllers {
    constructor(formIdCreate, formIdUpdate, tableId) {
      this.formEl = document.getElementById(formIdCreate);
      this.formUpdateEl = document.getElementById(formIdUpdate);
      this.tableEl = document.getElementById(tableId);
      this.onSubmit();
      this.onEdit();
    }
  
    onEdit() {
      document.querySelector("#box-user-update .box-cancel").addEventListener("click", e => {
        this.showPanelCreate();
      });
      this.formUpdateEl.addEventListener("submit", event => {
        event.preventDefault();
        let btn = this.formUpdateEl.querySelector("[type=submit]");
        btn.disabled = true;
        let values = this.getValues(this.formUpdateEl);
        let index = this.formUpdateEl.dataset.trIndex;
        let tr = this.tableEl.rows[index];
        let userOld = JSON.parse(tr.dataset.user);
        let result = Object.assign({}, userOld, values);
        
        

       this.showPanelCreate();

       this.getPhoto(this.formUpdateEl).then(content => {

        if(!values._photo){
         result._photo = userOld._photo;
        }else{
            result._photo = content 
        }

        tr.dataset.user = JSON.stringify(result);

        tr.innerHTML = `
          <td><img src=${result._photo} alt="User Image" class="img-circle img-sm"></td>
          <td>${result._name}</td>
          <td>${result._email}</td>
          <td>${result._admin ? "sim" : "não"}</td>
          <td>${Utils.dateFormat(result._register)}</td>
          <td>
            <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
          </td>`;
        
       this.addEventsTr(tr);
        
       this.updateCount();
        
        this.formUpdateEl.reset()

        btn.disabled = false;

      },
      (e) => {
        console.error(e);
      }
    )
      });
  
    onSubmit() {
      this.formEl.addEventListener('submit', event => {
        event.preventDefault();

        let btn = this.formEl.querySelector("[type=submit]");

        btn.disabled = true;

        let values = this.getValues(this.formEl);

        if (!values) return false;

        this.getPhoto(this.formEl).then(content => {
          values.photo = content;

          this.addLine(values);

          this.formEl.reset();

          btn.disabled = false;

        }).catch(e => {
          console.error(e);
        });
      });
    }
  
    getPhoto() {
      return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        let elements = [...formEl.elements].filter(item => item.name === "photo");
        let file = elements[0].files[0];
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (e) => {
          reject(e);
        };
        if (file) {
          fileReader.readAsDataURL(file);
        } else {
          resolve();
        }
      });
    }
  
    getValues(formEl) {
      let user = {};
      let isValid = true;
      [...formEl.elements].forEach((field, index) => {
        if (["name", "email", "password"].indexOf(field.name) > -1 && !field.value) {
          field.parentElement.classList.add("has-error");
          isValid = false;
        }
        if (field.name == 'gender') {
          if (field.checked) user[field.name] = field.value;
        } else if (field.name == "admin") {
          user[field.name] = field.checked;
        } else {
          user[field.name] = field.value;
        }
      });
      if (!isValid) {
        return false;
      }
      return new User(user.name, user.gender, user.birth, user.email, user.password, user.country, user.photo, user.admin);
    }
  
    addLine(dataUser) {
      let tr = document.createElement("tr");
      tr.dataset.user = JSON.stringify(dataUser);
      tr.innerHTML = `
        <td><img src=${dataUser.photo} alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin ? "sim" : "não"}</td>
        <td>${Utils.dateFormat(dataUser.register)}</td>
        <td>
          <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
          <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>`;
      this.showPanelUpdate();
      this.addEventsTr(tr);
      this.tableEl.appendChild(tr);
      this.updateCount();
    }
  
    addEventsTr(tr) {
      tr.querySelector('.btn-edit').addEventListener('click', e => {
        let json = JSON.parse(tr.dataset.user);
        this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;
        for (let name in json) {
          let field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "]");
          if (field) {
            switch (field.type) {
              case "file":
                continue;
              case "radio":
                field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] + "]");
                field.checked = true;
                break;
              case "checkbox":
                field.checked = json[name];
                break;
              default:
                field.value = json[name];
            }
          }
        }
        this.formUpdateEl.querySelector('.photo').src = json.photo;
        this.showPanelUpdate();
      });
    }
  
    showPanelCreate() {
      document.querySelector('#box-user-create').style.display = "block";
      document.querySelector("#box-user-update").style.display = "none";
    }
  
    showPanelUpdate() {
      document.querySelector('#box-user-create').style.display = "none";
      document.querySelector("#box-user-update").style.display = "block";
    }
  
    updateCount() {
      let numberUser = 0;
      let numberAdmin = 0;
      [...this.tableEl.children].forEach(tr => {
        numberUser++;
        let user = JSON.parse(tr.dataset.user);
        if (user.admin) numberAdmin++;
      });
      document.querySelector("#number-user").innerHTML = numberUser;
      document.querySelector("#number-user-admin").innerHTML = numberAdmin;
    }
}