window.addEventListener('DOMContentLoaded',()=>{
    const addStudentContainer = document.querySelector('#add-student-modal-container')
    const addStudentButton= document.querySelector('#add-student-modal-button')
    const addStudentClose = document.querySelector('#add-student-close')
    const addStudentButtonClose = document.querySelector('#add_student_cancel_button')

    addStudentContainer.addEventListener('click',()=>{
        
    })

    addStudentContainer.addEventListener('submit',(event)=>{
        event.preventDefault()
        const studentId =  document.querySelector('#student_id_add')
        const firstname =  document.querySelector('#first_name_add')
        const lastname =  document.querySelector('#last_name_add')
        const middlename =  document.querySelector('#middle_name_add')
        const yearlevel =  document.querySelector('#year_level_add')
        const course =  document.querySelector('#course_add')
        const email =  document.querySelector('#student_email_add')

        console.log(studentId.value, firstname.value, lastname.value, middlename.value, yearlevel.value, course.value, email.value)
        
        if(studentId.value.length === 0){
            console.log('Student ID is empty!')
            ModalError('add-student-modal-container')
            Error('Student ID is empty!')
            return
        }else if(firstname.value.length === 0){
            console.log('First name is empty!')
            ModalError('add-student-modal-container')
            return
        }else if(lastname.value.length === 0){
            console.log('Last name is empty!')
            ModalError('add-student-modal-container')
            return
        }else if(email.value.length === 0){
            console.log('Email is empty!')
            ModalError('add-student-modal-container')
            return
        }

    })

    addStudentButton.addEventListener('click',()=>{
        ShowModal('add-student-modal-container')
        addStudentButton.style.right = '-100%';
    })
    addStudentClose.addEventListener('click',()=>{
        HideModal('add-student-modal-container')
        addStudentButton.style.right = '-1%';
    })

    addStudentButtonClose.addEventListener('click',()=>{
        HideModal('add-student-modal-container')
        addStudentButton.style.right = '-1%';
    })

    function HideModal(id){
        document.querySelector(`#${id}`).classList.add('hide-modal')
        document.querySelector(`#${id}`).classList.remove('show-modal')

    }
    function ShowModal(id){
        console.log('show', id)
        document.querySelector(`#${id}`).classList.add('show-modal')
        document.querySelector(`#${id}`).classList.remove('hide-modal')

    }

    function ModalError(id){
        document.querySelector(`#${id}`).style.boxShadow = ' 0 8px 16px 0 #DC3545';
        console.log(document.querySelector(`#${id}`))
        setTimeout(()=>{
            document.querySelector(`#${id}`).style.boxShadow =  '0 4px 8px 0 rgba(0,0,0,0.2)';
        }, 1500)
    }

    function Error(message){
        document.querySelector(`.error`).classList.remove('hide-message')
        document.querySelector(`.error`).classList.add('show-message')
        setTimeout(()=>{
            document.querySelector(`.error`).classList.remove('show-message')
            document.querySelector(`.error`).classList.add('hide-message')
        },1500)
    }
})