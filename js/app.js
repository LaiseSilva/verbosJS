'use strict'
//Se não estiver marcado(html) como module, o importe não funciona

//Importe sendo feito
import{openModal, closeModal} from './modal.js'
import{readClientes, criarCliente, deletarCliente, selecionarCliente, editarCliente} from './clientes.js'

//Criando as tr 
const createTr = (cliente) => {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.email}</td>
        <td>${cliente.celular}</td>
        <td>${cliente.cidade}</td>

        <td>
            <button type="button" class="button green" id="editar-${cliente.id}">editar</button>
            <button type="button" class="button red" id="excluir-${cliente.id}">excluir</button>
        </td>
    `

    return row
}

const carregarTabela = async () =>{
    const clientesContainer = document.getElementById('clientes-container')

    //Ler API e armazenar o resultado em uma váriavel
    const clientes = await readClientes()

    //Preencher a tabela com as informações
    const linhas = clientes.map(createTr)
    clientesContainer.replaceChildren(...linhas)
}

const salvarCliente = async () => {
    //Criar um JSON com as informações do cliente
    const cliente = {
        'id': '',
        'nome': document.getElementById('nome').value,
        'email': document.getElementById('email').value,
        'celular': document.getElementById('celular').value,
        'cidade': document.getElementById('cidade').value
    }

    //Enviar para o servidor API
    await criarCliente(cliente)

    //Fechar a modal
    closeModal()

    //Atualizar a tabela
    carregarTabela()
}

const preencherTabela = (dados) =>{
    const id = document.getElementById('id')
    id.value = dados['id']

    const nome = document.getElementById('nome')
    nome.value = dados['nome']

    const email = document.getElementById('email')
    email.value = dados['email'] 

    const celular = document.getElementById('celular')
    celular.value = dados['celular']

    const cidade = document.getElementById('cidade')
    cidade.value = dados['cidade']
}

const editarTabela = async (codigo) =>{
    const cliente = {
        'id': codigo,
        'nome': document.getElementById('nome').value,
        'email': document.getElementById('email').value,
        'celular': document.getElementById('celular').value,
        'cidade': document.getElementById('cidade').value
    }
    //Enviar para o servidor API
     await editarCliente(codigo,cliente)

     closeModal()

     carregarTabela()
}

const actionCliente = async (event) => {
    if (event.target.type == 'button'){

        const [action,codigo] = event.target.id.split('-')

        if(action == 'editar'){
            console.log('action')
           openModal('editar');
           console.log(codigo);
            const dados = await selecionarCliente(codigo);
            preencherTabela(dados)    

        }else if(action == 'excluir'){
           await deletarCliente(codigo)
            carregarTabela()
        }
    }
}


carregarTabela()

//Eventos
// porque só funciona com arrow function???????
document.getElementById('cadastrarCliente').addEventListener('click', ()=> openModal('cadastrar') )

document.getElementById('salvar').addEventListener('click', salvarCliente)
document.getElementById('editarmodal').addEventListener('click',() => editarTabela(document.getElementById('id').value))


document.getElementById('clientes-container').addEventListener('click', actionCliente)