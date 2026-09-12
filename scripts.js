const datetime = document.getElementById('input-datetime')
const now = dayjs().format('YYYY-MM-DD')
const appointmentBtn = document.getElementById('add-appointment')
const list = document.querySelector('.list')
const removeAppointmentBtn = document.querySelector('.remove-appointment')
const morningPeriod = document.getElementById('morning')
const afternoonPeriod = document.getElementById('afternoon')
const nightPeriod = document.getElementById('night')
const morningUl = document.getElementById('morning-ul')
const afternoonUl = document.getElementById('afternoon-ul')
const nightUl = document.getElementById('night-ul')
const modal = document.querySelector('dialog')
const form = document.querySelector('form')
const tutorName = document.getElementById('input-tutor-name')
const petName = document.getElementById('input-pet-name')
const phoneNumber = document.getElementById('input-phonenumber')
const serviceDescription = document.getElementById('service-description')
const inputDate = document.getElementById('input-date')
const inputTime = document.getElementById('input-time')
const scheduleBtn = document.getElementById('schedule-button')
const alert = document.getElementById('alert-box')
const alertMessage = document.getElementById('alert-message')

function showToday() {
    datetime.value = now
}

function setTodayOnFixedLi() {
    const allLi = document.querySelectorAll('li')
    for (const li of allLi) {
        li.dataset.date = now
    }
}

function openModal() {
    modal.showModal()
    appointmentBtn.classList.add('hidden-button')
}

function closeModal() {
    appointmentBtn.classList.remove('hidden-button')
}

function showAlertBox(message) {
    alertMessage.textContent = message
    alert.classList.add('show-alert-box')
        setTimeout(() => {
            alert.classList.remove('show-alert-box')
        }, 2500) 
}

function validateForm() {
    if(tutorName.value === '' || petName.value === '' || phoneNumber.value === '' || serviceDescription.value === '' || inputDate.value === '' || inputTime.value === '') {
        showAlertBox('Todos os campos devem ser preenchidos')
        return false
    }
    return true
}

function addClient() {
    const time = inputTime.value
    const pet = petName.value
    const tutor = tutorName.value
    const service = serviceDescription.value
    const date = inputDate.value

    const divPetInfo = document.createElement('div')
    const li = document.createElement('li')
    const pAppointmentTime = document.createElement('p')
    const pPetName = document.createElement('p')
    const pTutorName = document.createElement('p')
    const pService = document.createElement('p')
    const btnRemoveAppointment = document.createElement('button')

    li.classList.add('list-info')
    li.dataset.date = date

    pAppointmentTime.classList.add('appointment-time')
    pAppointmentTime.textContent = time

    divPetInfo.classList.add('pet-info')
    pPetName.classList.add('pet-name')
    pPetName.textContent = pet
    pTutorName.classList.add('pet-owner')
    pTutorName.textContent = `/ ${tutor}`

    pService.classList.add('service')
    pService.textContent = service

    btnRemoveAppointment.classList.add('remove-appointment')
    btnRemoveAppointment.textContent = 'Remover agendamento'

    divPetInfo.append(pPetName, pTutorName)
    li.append(pAppointmentTime, divPetInfo, pService, btnRemoveAppointment)

    return li
}

function insertOrdered(period, ul, newLi, newTimeNumber) {
    const periodLi = period.querySelectorAll('li')

    let inserted = false
    for (const li of periodLi) {
        const existingTime = li.querySelector('.appointment-time')
        const existingTimeText = existingTime.textContent
        const oldTimeNumber = Number(existingTimeText[0])
        if(oldTimeNumber >= newTimeNumber) {
            ul.insertBefore(newLi, li)
            inserted = true
            break
        }        
    }
    if (!inserted) {
        ul.append(newLi)
    }
}
 
function toSchedule() {
    const newLi = addClient()
    
    const newTimeString = inputTime.value
    const newTimeSplited = newTimeString.split(':')
    const newTimeNumber = Number(newTimeSplited[0])
    
    if (newTimeNumber >= 9 && newTimeNumber <= 12){
        insertOrdered(morningPeriod, morningUl, newLi, newTimeNumber)
    }else if (newTimeNumber >= 13 && newTimeNumber <= 18){
        insertOrdered(afternoonPeriod, afternoonUl, newLi, newTimeNumber)
    }else if (newTimeNumber >= 19 && newTimeNumber <= 21){
        insertOrdered(nightPeriod, nightUl, newLi, newTimeNumber)
    }else {
        showAlertBox('Este horário não está em nossa grade') 
    }
    form.reset()
}

function removeSchedule(ev) {
    if (ev.target.classList.contains('remove-appointment')) {
        const isTarget = ev.target.closest('.list-info')
        isTarget.remove()
    }
}

function filterSchedule() {
    const allLi = document.querySelectorAll('li')
    const changedDatetime = datetime.value
    for (const li of allLi)  {
        const liDate = li.dataset.date 
        if (liDate != changedDatetime) {
            li.classList.add('hidden-li')
        }else {
            li.classList.remove('hidden-li')
        }
    }
    console.log(changedDatetime)
}

function hasConflict() {
    const date = inputDate.value
    const time = inputTime.value
    const allLi = document.querySelectorAll('li')

    for (const li of allLi) {
        const liDate = li.dataset.date 
        const liTime = li.querySelector('.appointment-time').textContent

        if(liDate === date && liTime === time) {
            showAlertBox('Este horário já está ocupado nesta data')
            return true
        }
    }
    return false
}

datetime.onchange = filterSchedule

showToday()
setTodayOnFixedLi()

appointmentBtn.addEventListener('click', openModal)
modal.onclose = closeModal

form.onsubmit = (ev) => {
    if (!validateForm() || hasConflict()) {
        ev.preventDefault()
    }else {
        toSchedule() //dps colocar toSchedule()
    }
}

list.addEventListener('click', removeSchedule)