window.addEventListener('DOMContentLoaded', async ()=>{
    if(window.location.href === window.origin + '/students/'){
        console.log('Students')
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
            ModalError('add-student-modal-container')
            Error('Student ID is empty!')
            return
        }else if(studentIdWithoutSpaces[4] != '-' || studentIdYear.length != 4 || studentIdNumber.length != 4 ) {
            ModalError('add-student-modal-container')
            Error('Student ID is not in the correct format!')
            return 
        }else if(firstname.value.length === 0){
            ModalError('add-student-modal-container')
            Error('Student Firstname is empty!')
            return
        }else if(lastname.value.length === 0){
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
            ModalSuccess()
            Success(res.message)
            AppendStudentCard(data.student_id, data.first_name, data.last_name, data.gender, data.year_level, data.course_code)
            StudentEditInfoGetter()
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
                    (`<img class="student-avatar" id="student-avatar-${id}" src="/static/images/boy.png" alt="Boy Icon">`):(`
                        <img class="student-avatar"  id="student-avatar-${id}" src="/static/images/girl.png" alt="Girl Icon">  
                    `)}
                    
                    <p  id="student-fullname-${id}">${fname}${lname}</p>
                    <p  id="student-sex-${id}">${gender}</p>
                    <p  id="student-year-${id}">${year}</p>
                    <p  id="student-course-${id}">${course}</p>
                    <div class="student-action">
                        <div class="edit-icon-student-container">
                            <img src="/static/images/editIcon.png" alt="Edit Icon" id="edit-student-${id}">
                        </div>
                        <div class="delete-icon-student-container">
                            <img src="/static/images/deleteIcon.png" alt="Delete Icon" id="delete-student-${id}">
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
            AddDeleteEvents(res)
            AddEditEvents(res)
            return
        }
        const res = await response.json()
    }
    StudentEditInfoGetter()



    //variables for edit modal input 
    const idInputEdit = document.querySelector('#student_id_edit')

    const fnameInputEdit = document.querySelector('#first_name_edit')
    const lnameInputEdit = document.querySelector('#last_name_edit')
    const maleGenderInputEdit = document.querySelector('#student-gender-male-edit')
    const femaleGenderInputEdit = document.querySelector('#student-gender-female-edit')
    const yearLevelInputEdit = document.querySelector('#year_level_edit')
    const courseInputEdit = document.querySelector('#course_edit')

    function AddEditEvents(students){

        for (const student of students){
            document.querySelector(`#edit-student-${student.student_id}`).addEventListener('click',async ()=>{
                ShowModal('edit-student-modal-container')
                const newStudentInfo = await getStudentInfoFromDatabase(student.student_id)
                idInputEdit.value = newStudentInfo.student_id
                fnameInputEdit.value = newStudentInfo.first_name
                lnameInputEdit.value = newStudentInfo.last_name
                newStudentInfo.sex === "Male" ? (maleGenderInputEdit.checked = true) : (femaleGenderInputEdit.checked = true);
                yearLevelInputEdit.value = newStudentInfo.year_level
                courseInputEdit.value = newStudentInfo.course_code
            })
        }
    }

    document.querySelector('#delete-student-close').addEventListener('click',()=>{
        HideModal('delete-student-modal-container')
    })

    document.querySelector('#delete_student_cancel_button').addEventListener('click',()=>{
        HideModal('delete-student-modal-container')
    })

    document.querySelector('#edit-student-close').addEventListener('click',()=>{
        HideModal('edit-student-modal-container')
    })
    document.querySelector('#edit_student_cancel_button').addEventListener('click',()=>{
        HideModal('edit-student-modal-container')
    })

    editStudentContainer.addEventListener('submit', async (event)=>{
        event.preventDefault()
        const editedGender = maleGenderInputEdit.checked ? ('Male') : ('Female')
        const studentUneditedInfo = await getStudentInfoFromDatabase(idInputEdit.value)
        if(fnameInputEdit.value === '' || lnameInputEdit.value === "" || editedGender === "" || yearLevelInputEdit.value === "" || courseInputEdit.value === "" ){
            Error('Cannot Leave the input field Empty')
            ModalError('edit-student-modal-container')
            return
        }
        else if(fnameInputEdit.value === studentUneditedInfo.first_name && lnameInputEdit.value === studentUneditedInfo.last_name && editedGender === studentUneditedInfo.sex && yearLevelInputEdit.value === studentUneditedInfo.year_level && courseInputEdit.value === studentUneditedInfo.course_code ){
            Error('Nothings Changed!')
            ModalError('edit-student-modal-container')
            return
        }
        const data = {
            student_id: idInputEdit.value,
            first_name: fnameInputEdit.value,
            last_name: lnameInputEdit.value,
            sex: editedGender,
            course_code: courseInputEdit.value,
            year_level: yearLevelInputEdit.value,
        }
        const url = window.origin + '/students/edit'
        const response = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        
        if(response.ok){
            const res = await response.json()
            Success(`Student ${data.student_id} was successfully updated`)
            HideModal('edit-student-modal-container')
            //Update the Card Here
            UpdateStudentCardInformation(data.student_id, data.first_name, data.last_name, data.sex, data.year_level, data.course_code)
            return
        }

        const res = await response.json()
        Error(`Student ${data.student_id} was unsuccessfully updated.`)


        
        })



        async function getStudentInfoFromDatabase(student_id) {
            const data = {
                student_id: student_id
            };
        
            const url = window.origin + '/students/get';
        
            try {
                const student = await fetch(url, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
        
                if (student.ok) {
                    const res = await student.json();
                    return res;
                } else {
                    // Handle non-ok response (e.g., log an error, throw an exception, etc.)
                    console.error('Failed to fetch student data');
                    return undefined;
                }
            } catch (error) {
                // Handle fetch errors (e.g., network issues)
                console.error('Error during fetch:', error);
                return undefined;
            }
        }
        

    function UpdateStudentCardInformation(id, first_name, last_name, gender, year, course){
        const avatar = document.querySelector(`#student-avatar-${id}`)
        gender === 'Male' ? (avatar.src = '/static/images/boy.png') : (avatar.src = '/static/images/girl.png')

        //inserting Full Name
        document.querySelector(`#student-fullname-${id}`).innerText = `${first_name} ${last_name}`

        document.querySelector(`#student-sex-${id}`).innerText = `${gender}`

        document.querySelector(`#student-year-${id}`).innerText = `${year}`

        document.querySelector(`#student-course-${id}`).innerText = `${course}`

    }


    function AddDeleteEvents(students){
        for (const student of students) {
            const deleteButton = document.getElementById(`delete-student-${student.student_id}`);
            const deleteIdInput = document.getElementById('delete-student-id');
            const deleteIdSpan = document.getElementById('delete-id-span');
        
            deleteButton.addEventListener('click', () => {
                deleteIdInput.value = student.student_id;
                deleteIdSpan.innerText = student.student_id;
                ShowModal('delete-student-modal-container')
            });
        }
        
    }


    //Delete Student 

    document.querySelector('#delete-student-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const student_id = document.querySelector('#delete-student-id').value;
        console.log(student_id);
        HideModal('delete-student-modal-container')
        const url = window.origin + '/students/delete'
        const data ={
            student_id: student_id
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        if(response.ok){
            const res = await response.json()
            console.log(res)
            Success(`Student ${data.student_id} deleted successfully`)
            HideStudentCard(data.student_id)
        }
        
        const res = await response.json()
        console.log(res)
    })


    function HideStudentCard(id){
        document.querySelector(`#student-info-container-${id}`).classList.add('hide-this-card')
        console.log(document.querySelector(`#student-info-container-${id}`))
        setTimeout(function() {
            document.querySelector(`#student-info-container-${id}`).style.display = 'none'
        }, 1200)
    }
    }
})