const form = document.querySelector("#infos-prod");
const divErro = document.querySelector("#msg-erro");;
const tabela = document.querySelector("#tbody");
let idx = form.idx.value;

let usuarioId = Number(sessionStorage.getItem('logado'));
const session = localStorage.getItem("session");

logadoOuNao();

function logadoOuNao(){
    if(session){
        sessionStorage.setItem("log", session);
        usuarioId = session
    }

    if(!usuarioId){
        window.location.href = "login.hmtl"
        return
    }

}

console.log(usuarioId);

const atualizarLocalStorage = (produtos) =>{
    localStorage.setItem("produtos",JSON.stringify(produtos));
}

const recuperarLocalStorage = () =>{
    const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    return produtos;
}
const salvarProduto = (event) => {
    event.preventDefault();
    console.log("passou pelo o evento");
    divErro.innerHTML = "";
    const nome = form.nome.value;
    const preco = Number(form.preco.value);
    const prime = form.prime.checked;
    const erros = [];

    if (!nome || nome.lenght < 2){
        erros.push("<p>Nome inválido</p>")
    }
    if (!preco || preco <= 0){
        erros.push("<p>Preço inválido</p>")
    }
    if (erros.lenght > 0){
        divErro.innerHTML = erros.join(" ");
        return
    }

    console.log(idx)

    if(idx === "novo"){
    const produtos = recuperarLocalStorage();
    //produtos.push({ id: produtos.legth + 1, nome , preco, prime});
    let idp = 0;
    for(const pro of produtos){
        if(pro.usuarioId === usuarioId){
            idp = Number(pro.id);
        }
    }
    produtos.push({ id: idp+= 1, nome , preco, prime, usuarioId});
    atualizarLocalStorage(produtos);
    preenchertabela();
    form.reset();
    console.log(idx, "teste")
   }else{
    let produto = {
        id: idx, nome, preco, prime, usuarioId
    }
    editar(idx, produto);
    preencherTabela();
    form.reset();
    idx = "novo"
    console.log("editar", idx);

   }
 
}
const preenchertabela = () =>{
    const produtos = recuperarLocalStorage();
    tabela.innerHTML = "";
    for (const produto of produtos){
        if(produto.usuarioId === usuarioId){
            tabela.innerHTML += 
            `
            <tr>
                <th scope = "row">${produto.id}</th>
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco},00</td>
                <td> ${produto.prime ? "Sim" : "Não"}</td>
                <td>
                    <img type="button" width="40" src="img/lixeira.png" onclick="removerProduto(${produto.id})"/>
                    <img type="button" width="40" src="img/img.png" onclick="editarProduto(${produto.id})"/>
                </td>
            </tr>
            `
        }
    }
}

const removerProduto = (id) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id);
    if (indexProduto < 0)
        return;
    produtos.splice(indexProduto, 1);
    atualizarLocalStorage(produtos);
    preenchertabela();
}

function editar(idx, produto){
    const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    const indexProduto = produtos.findIndex((p) => p.id === idx && p.usuarioId == usuarioId);
    produtos[indexProduto] = produto;
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

const atualizarProduto = (id) =>{
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id && produto.usuarioId == usuarioId);

    form.nome.value = produtos[indexProduto].nome
    form.preco.value = produtos[indexProduto].preco
    form.prime.value = produtos[indexProduto].prime
    idx = id
    console.log(idx)
}

form === null || form === void 0 ? void 0 : form.addEventListener("submit",salvarProduto);
document.addEventListener("DOMContentLoaded", preenchertabela);

document.querySelector("#sair").addEventListener('click',function(){
    saindo()
});
function saindo(){
    sessionStorage.removeItem("logado");
    localStorage.removeItem("session");

    window.location.href = "login.html"
}
