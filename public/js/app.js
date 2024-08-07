
document.addEventListener("DOMContentLoaded", function() {
/*----- Cached Element References  -----*/


const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const openAddBtn = document.querySelector('.btn-open')
const closeAddBtn = document.querySelector('.btn-close')

const editModal = document.querySelector('.edit-modal')
const openEditBtn = document.querySelector('.editBtn-open')
const closeEditBtn = document.querySelector('.editBtn-close')

const expensesModal = document.querySelector('.expenses-modal')
const openExpensesBtn = document.querySelector('.expensesBtn-open')
const closeExpensesBtn = document.querySelector('.expensesBtn-close')

/*-------------- Functions -------------*/

const openModal = function () {
    modal.classList.remove("hidden")
    overlay.classList.remove("hidden")
}

const closeModal = function () {
    modal.classList.add("hidden")
    overlay.classList.add("hidden")
}

const openEditModal = function () {
    editModal.classList.remove("hide-edit")
    overlay.classList.remove("hide-edit")
}

const closeEditModal = function (){
    editModal.classList.add("hide-edit")
    overlay.classList.add("hide-edit")
}

const openExpensesModal = function () {
    expensesModal.classList.remove("hide-expenses")
    overlay.classList.remove("hide-expenses")
}
const closeExpensesModal = function () {
    expensesModal.classList.add("hide-expenses")
    overlay.classList.add("hide-expenses")
}


/*----------- Event Listeners ----------*/

if (openAddBtn && closeAddBtn) {
    openAddBtn.addEventListener("click", openModal);
    closeAddBtn.addEventListener("click", closeModal);
}

if (openEditBtn && closeEditBtn) {
    openEditBtn.addEventListener("click", openEditModal);
    closeEditBtn.addEventListener("click", closeEditModal);
}

if (openExpensesBtn && closeExpensesBtn) {
    openExpensesBtn.addEventListener("click", openExpensesModal);
    closeExpensesBtn.addEventListener("click", closeExpensesModal);
}

});