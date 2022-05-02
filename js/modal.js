'use strict'

const openModal = (botao) => {
    console.log('oi')
    document.getElementById('modal').classList.add('active')

     if(botao == 'cadastrar'){
         console.log('salvar');
         document.getElementById('editarmodal').setAttribute('hidden',true)
         document.getElementById('salvar').removeAttribute('hidden') 
    }else if(botao == 'editar'){
        console.log('editar');
        document.getElementById('salvar').setAttribute('hidden',true)
        document.getElementById('editarmodal').removeAttribute('hidden')
    }
}


const closeModal = () => document.getElementById('modal').classList.remove('active')


document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('cancelar').addEventListener('click', closeModal)

//Para exportar
export{
    openModal,
    closeModal
}