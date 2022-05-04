'use strict'

import {openModal, closeModal} from './modal.js'
import {readClients, createClient, deleteClient, uptadeClient} from './clients.js'

const createRow = ({nome,email,celular,cidade,id}) => {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>${nome}</td>
        <td>${email}</td>
        <td>${celular}</td>
        <td>${cidade}</td>
        <td>
            <button type="button" class="button green" onClick="editCliente(${id})">editar</button>
            <button type="button" class="button red" onClick="delCliente(${id})">excluir</button>
        </td>
    `
    return row
}

const updateTable = async () => {
    const clientsContainer = document.getElementById('clients-container')

    // Ler a API e armazenar o resultado em uma variavel
    const clients = await readClients()
    
    // Preencher a tabela com as informações
    const rows = clients.map(createRow)
    clientsContainer.replaceChildren(...rows)
}

//hasAttribute pregunta se existe aquele atributo e retorna um verdadeiro ou falso
const isEdit = () => document.getElementById('nome').hasAttribute('data-id')

const saveClient = async() => {
    // Criar um json com as informações do cliente
    const client = {
        "nome": document.getElementById('nome').value,
        "email": document.getElementById('email').value,
        "celular": document.getElementById('celular').value,
        "cidade": document.getElementById('cidade').value
    }

    //Verificação de editar 
    if(isEdit()){
        client.id = document.getElementById('nome').dataset.id
         await uptadeClient(client)
    }else{
        //Envia json para a API
        await createClient(client)
    }

    // Fechar a modal
    closeModal()

    // Atualizar a tabela
    updateTable()
}

const fillForm = (client) =>{
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade

    //adicionando um novo 'atributo' para identificar o id
    document.getElementById('nome').dataset.id = client.id
}

//criada dentro da global porque ela é chamada através do elemento html
globalThis.editCliente = async(id) =>{
    //Armazenar as informações do clinte selecionado em uma váriavel
    const client = await readClients(id)

    //preencher o formulário com as informações
    fillForm(client[0])

    //abrir a modal no estado de edição
    openModal()

}

globalThis.delCliente = async(id) =>{
    await deleteClient(id)
    updateTable()
}

/*const actionClient = async (event) => {
    if (event.target.type == 'button'){

        const [action, codigo] = event.target.id.split('-')

        if (action == 'editar'){
            // função para editar o cliente
        }else if (action == 'excluir'){
            await deleteClient(codigo)
            updateTable()
        }
    }
}*/

updateTable()

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('salvar').addEventListener('click', saveClient)
//document.getElementById('clients-container').addEventListener('click', actionClient )