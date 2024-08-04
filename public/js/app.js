

/*----- Cached Element References  -----*/

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const openModalBtn = document.querySelector('.btn-open')
const closeModalBtn = document.querySelector('.btn-close')

/*-------------- Functions -------------*/

const openModal = function () {
    modal.classList.remove("hidden")
    overlay.classList.remove("hidden")
}

const closeModal = function () {
    modal.classList.add("hidden")
    overlay.classList.add("hidden")
}

/*----------- Event Listeners ----------*/


openModalBtn.addEventListener("click", openModal)
closeModalBtn.addEventListener("click", closeModal)