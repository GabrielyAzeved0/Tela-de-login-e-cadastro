//localstorage - grava no navegador e fica lá ate ser apagado.
//sessionstorage - grava no navegador, mas ao sair ele apaga.
document.querySelector('#login').addEventListener('click', (e) => {
    e.preventDefault();
    entrar()
    

});
//pegar tudo do localstorage

function entrar() {
    let usuario = document.querySelector('#usuario').value;
    let senha = document.querySelector('#senha').value;
    
    let listarUser = [];

    let usuarioValido = {
        login: '',
        senha: ''
    }
        

    listarUser = JSON.parse(localStorage.getItem('usuarios'))
    
    listarUser.forEach(elemento => {
        if (usuario=== elemento.login && senha === elemento.senha) {
            usuarioValido = {
                id: elemento.id,
                login: elemento.login,
                senha: elemento.senha
            }
        }
    })
        
        if(usuario === '' && senha === ''){
            alert('Preencha os campos abaixo')
        }else if(usuario === usuarioValido.login && senha === usuarioValido.senha) {
                alert('Seja bem vindo(a)');
                saveSession(usuarioValido.id);
                window.location.href = "home.html";
                
        } else {
                alert('LOGIN OU SENHA INCORRETO')
        }
        
}

function saveSession(data){
    if(saveSession){
        localStorage.setItem("session", data);
    }
    
    sessionStorage.setItem("logado",JSON.stringify(data));
}

