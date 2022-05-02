'use strict'

const url = 'https://testeleonid.herokuapp.com/clientes'

const readClientes = async () => {
  
    const response = await fetch(url)
    return await response.json()
}

const criarCliente = async(cliente) =>{
    const options = {
        method: 'POST',
        //stringify transforma o array em uma string, porque não aceita o array
        body: JSON.stringify(cliente),

        headers:{
            'content-type':'application/json'
        }
    }

    const response = await fetch(url,options)

}

const deletarCliente = async(codigo) => {
    const options = {
        method: 'DELETE'
    }

    const response = await fetch(`${url}/${codigo}`, options)
}

const editarCliente = async (codigo, cliente)=>{
    const options = {
        method: 'PUT',  
        body: JSON.stringify(cliente),
        headers:{
            'content-type':'application/json'
        }
    }
    
     await fetch(`${url}/${codigo}`, options)
}

const selecionarCliente = async (codigo) =>{
    const response = await fetch(`${url}/${codigo}`)
    return await response.json()
}


export{
    readClientes,
    criarCliente,
    deletarCliente,
    selecionarCliente, 
    editarCliente
}