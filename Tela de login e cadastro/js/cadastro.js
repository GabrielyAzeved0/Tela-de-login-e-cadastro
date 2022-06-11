
document.querySelector('#cadastrar').addEventListener('click', (evento) => {
    evento.preventDefault();
    let email = document.querySelector('#usuario').value;
    let senha = document.querySelector('#senha').value;

    salvar(email, senha);
});

function salvar(e,s){
    //crio um objeto
    let db = JSON.parse(localStorage.getItem('usuarios') || '[]');
    let usuario = {
        id: db.length + 1,
        login: e,
        senha: s
    }

    //jogar o objeto dentro do vetor
    //db objeto e usario vetor
    db.push(usuario);
    //salvo no localStorage
    localStorage.setItem('usuarios', JSON.stringify(db));
    location.href = 'login.html';   
     alert("usuário cadastrado")
}
