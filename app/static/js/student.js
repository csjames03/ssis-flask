window.addEventListener('DOMContentLoaded',()=>{
    const addStudentContainer = document.querySelector('#add-student-modal-container')
    const addStudentButton= document.querySelector('#add-student-modal-button')
    const addStudentClose = document.querySelector('#add-student-close')
    const addStudentButtonClose = document.querySelector('#add_student_cancel_button')

    addStudentContainer.addEventListener('click',()=>{
        
    })

    addStudentContainer.addEventListener('submit',async (event)=>{
        event.preventDefault()
        const studentId =  document.querySelector('#student_id_add')
        const studentIdWithoutSpaces = studentId.value.trim();
        const firstname =  document.querySelector('#first_name_add')
        const lastname =  document.querySelector('#last_name_add')
        const yearlevel =  document.querySelector('#year_level_add')
        const course =  document.querySelector('#course_add')
        const gender = getSelectedRadioValue('student_gender_add')
        const studentIdYear = studentIdWithoutSpaces.split('-')[0]
        const studentIdNumber = studentIdWithoutSpaces.split('-')[1]

        if(studentIdWithoutSpaces.length === 0){
            console.log('Student ID is empty!')
            ModalError('add-student-modal-container')
            Error('Student ID is empty!')
            return
        }else if(studentIdWithoutSpaces[4] != '-' || studentIdYear.length != 4 || studentIdNumber.length != 4 ) {
            console.log('Student ID is not in the correct format!')
            ModalError('add-student-modal-container')
            Error('Student ID is not in the correct format!')
        }else if(firstname.value.length === 0){
            console.log('First name is empty!')
            ModalError('add-student-modal-container')
            Error('Student Firstname is empty!')
            return
        }else if(lastname.value.length === 0){
            console.log('Last name is empty!')
            ModalError('add-student-modal-container')
            Error('Student Lastname is empty!')
            return
        }else if ( gender == null){
            ModalError('add-student-modal-container')
            Error('Please select a gender')
            return
        }
         
        const url = window.origin+'/student/add'
        const data = {
            student_id: studentIdWithoutSpaces,
            first_name: firstname.value,
            lastname: lastname.value,
            gender: gender,
            year_level: yearlevel.value,
            course: course.value,
          };
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if(response.ok){
            const res = await response.json()
            console.log(res)
        }
        
        const res = await response.json()
        console.log(res)
        
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



    function getSelectedRadioValue(groupName) {
        var radios = document.getElementsByName(groupName);
      
        for (var i = 0; i < radios.length; i++) {
          if (radios[i].checked) {
            return radios[i].value;
          }
        }
        return null;
      }
      
      
      
})