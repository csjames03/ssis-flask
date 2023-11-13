window.addEventListener('DOMContentLoaded',()=>{
    const addStudentContainer = document.querySelector('#add-student-modal-container')
    const editStudentContainer = document.querySelector('#edit-student-modal-container')
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
            return 
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
         
        const url = window.origin+'/students/add'
        const data = {
            student_id: studentIdWithoutSpaces,
            first_name: firstname.value,
            last_name: lastname.value,
            gender: gender,
            year_level: yearlevel.value,
            course_code: course.value,
          };
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if(response.ok){
            const res = await response.json()
            console.log(res)
            ModalSuccess()
            Success(res.message)
            AppendStudentCard(data.student_id, data.first_name, data.last_name, data.gender, data.year_level, data.course_code)
            return
        }
        
        const res = await response.json()
        ModalError('add-student-modal-container')
        Error(res.message)
        return  
        
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

    function ModalSuccess(){
        HideModal('add-student-modal-container')
        addStudentButton.style.right = '-1%';
        const studentId =  document.querySelector('#student_id_add')
        const firstname =  document.querySelector('#first_name_add')
        const lastname =  document.querySelector('#last_name_add')
        studentId.value = ""
        firstname.value = ""
        lastname.value = ""
    }
    function Error(message){
        document.querySelector(`.error`).classList.remove('hide-message')
        document.querySelector('.error-p').innerText = message
        document.querySelector(`.error`).classList.add('show-message')
        setTimeout(()=>{
            document.querySelector(`.error`).classList.remove('show-message')
            document.querySelector(`.error`).classList.add('hide-message')
            
        },1500)
    }
    function Success(message){
        document.querySelector(`.success`).classList.remove('hide-message')
        document.querySelector('.success-p').innerText = message
        document.querySelector(`.success`).classList.add('show-message')
        setTimeout(()=>{
            document.querySelector(`.success`).classList.remove('show-message')
            document.querySelector(`.success`).classList.add('hide-message')
            
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
      
    function AppendStudentCard(id, fname, lname, gender, year, course){
        const div = document.createElement('div')
        const container = document.querySelector('.student-main-container')
        div.id = `student-info-container-${id}`
        div.classList.add('student-info-container')
        div.innerHTML =`
                    ${ gender === 'Male' ?
                    (`<img class="student-avatar" src="/static/images/boy.png" alt="Boy Icon">}`):(`
                        <img class="student-avatar" src="/static/images/girl.png" alt="Girl Icon">  
                    `)}
                    
                    <p>${fname}${lname}</p>
                    <p>${gender}</p>
                    <p>${year}</p>
                    <p>${course}</p>
                    <div class="student-action">
                        <div class="edit-icon-student-container">
                            <img src="/static/images/editIcon.png" alt="Edit Icon">
                        </div>
                        <div class="delete-icon-student-container">
                            <img src="/static/images/deleteIcon.png" alt="Delete Icon">

                        </div>
                    </div>
        `
        container.appendChild(div)

    }

    async function StudentEditInfoGetter(){
        const url = window.origin +'/students/'
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:{}
        })

        if(response.ok){
            const res = await response.json()
            AddEvents(res)
            return
        }
        const res = await response.json()
        console.log(res)
    }
    StudentEditInfoGetter()



    function AddEvents(students){
        //variables for edit modal input 
        const idInputEdit = document.querySelector('#student_id_edit')
        const fnameInputEdit = document.querySelector('#first_name_edit')
        const lnameInputEdit = document.querySelector('#last_name_edit')
        const maleGenderInputEdit = document.querySelector('#student-gender-male-edit')
        const femaleGenderInputEdit = document.querySelector('#student-gender-female-edit')
        const yearLevelInputEdit = document.querySelector('#year_level_edit')
        const courseInputEdit = document.querySelector('#course_edit')
        console.log(courseInputEdit)

        for (const student of students){
            document.querySelector(`#edit-student-${student.student_id}`).addEventListener('click',()=>{
                ShowModal('edit-student-modal-container')
                idInputEdit.value = student.student_id
                fnameInputEdit.value = student.first_name
                lnameInputEdit.value = student.last_name
                student.sex === "Male" ? (maleGenderInputEdit.checked = true) : (femaleGenderInputEdit.checked = true);
                yearLevelInputEdit.value = student.year_level
                courseInputEdit.value = student.course_code
                console.log(student)
            })
        }
    }

    document.querySelector('#edit-student-close').addEventListener('click',()=>{
        HideModal('edit-student-modal-container')
    })
    document.querySelector('#edit_student_cancel_button').addEventListener('click',()=>{
        HideModal('edit-student-modal-container')
    })

})