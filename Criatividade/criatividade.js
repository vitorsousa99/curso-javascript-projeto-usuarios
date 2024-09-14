const relogio = document.querySelector('.Relogio')

function mostrarHoraAtual(){
    const data = new Date()
    const hours = data.getHours()
    const minutes = data.getMinutes()
    const segundos = data.getSeconds()

   relogio.innerHTML = hours + ":" +  minutes + ":" + segundos;
}

mostrarHoraAtual()
