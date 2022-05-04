'use strict'

const url = 'http://localhost/Laise/leonid/clientes'

//Pega somente um id ou todos
const readClients = async(id='') => {
    const response = await fetch(`${url}/${id}`)
     return await response.json()
}

const createClient = async(client) => {
    const options = {
        'method': 'POST',
        'body': JSON.stringify(client),
        'headers': {
            'content-type': 'application/json'
        }
    }

    const response = await fetch(url, options)
    console.log ('CREATE',response.ok)
}

const deleteClient = async (codigo) => {
    const options = {
        'method': 'DELETE'
    }
    const response = await fetch(`${url}/${codigo}`, options)
    console.log ('DELETE',response.ok)
}

const uptadeClient = async (client) =>{
    const options = {
        'method': 'PUT',
        'body': JSON.stringify(client),

        headers:{
            'content-type': 'application/json'
        }
    }

    const response = await fetch (`${url}/${client.id}`, options)

    console.log('UPTADE', response.ok)
}

export{
    readClients,
    createClient,
    deleteClient,
    uptadeClient
}