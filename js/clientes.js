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
    console.log(response.ok)

}

const deletarCliente = async(codigo) => {
    const options = {
        method: 'DELETE'
    }

    const response = await fetch(`${url}/${codigo}`, options)
}


export{
    readClientes,
    criarCliente,
    deletarCliente
}