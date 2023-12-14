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

    const searchqueryForm = document.querySelector('#search')
    const location = window.location.href
    const colleges = window.origin+'/colleges/'
    const students = window.origin+'/students/'
    const courses = window.origin+'/courses/'
    searchqueryForm.addEventListener('input',async (event)=>{
        event.preventDefault();
        const query = document.querySelector("#search-query").value
        if(location === students){
            searchStudent(query)
        }
        return
    })

    searchqueryForm.addEventListener('submit',async (event)=>{
        event.preventDefault();
    })


    async function searchStudent(query){
        const url = window.origin+'/students/search'
        const data = {
            query: query,
        }
        const request = await fetch(url,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if (request.ok) {
            const containers = document.querySelectorAll('.student-info-container');
            containers.forEach(container => container.remove());
        
            const students = await request.json();
        
            students.forEach(student => AppendStudentCard(student.student_id, student.first_name, student.last_name, student.sex, student.year_level, student.course_code, student.img_url, student.college_info,));
            AddDeleteEvents(students);
            AddEditEvents(students);
        }

    }

    addStudentContainer.addEventListener('submit',async (event)=>{
        event.preventDefault()
        document.querySelector('#add_student_submit_button').disabled = true;
        document.querySelector('#add_student_submit_button').value = 'Uploading...'
        const studentId =  document.querySelector('#student_id_add')
        const studentIdWithoutSpaces = studentId.value.trim();
        const firstname =  document.querySelector('#first_name_add')
        const lastname =  document.querySelector('#last_name_add')
        const yearlevel =  document.querySelector('#year_level_add')
        const course =  document.querySelector('#course_add')
        const gender = getSelectedRadioValue('student_gender_add')
        const studentIdYear = studentIdWithoutSpaces.split('-')[0]
        const studentIdNumber = studentIdWithoutSpaces.split('-')[1]
        const fileInput = document.getElementById('fileInput');

        if(studentIdWithoutSpaces.length === 0){
            ModalError('add-student-modal-container')
            Error('Student ID is empty!')
            document.querySelector('#add_student_submit_button').disabled = false;
            document.querySelector('#add_student_submit_button').value = 'Submit'
            return
        }else if(studentIdWithoutSpaces[4] != '-' || studentIdYear.length != 4 || studentIdNumber.length != 4 ) {
            ModalError('add-student-modal-container')
            Error('Student ID is not in the correct format!')
            document.querySelector('#add_student_submit_button').disabled = false;
            document.querySelector('#add_student_submit_button').value = 'Submit'
            return 
        }else if(firstname.value.length === 0){
            ModalError('add-student-modal-container')
            Error('Student Firstname is empty!')
            document.querySelector('#add_student_submit_button').disabled = false;
            document.querySelector('#add_student_submit_button').value = 'Submit'
            return
        }else if(lastname.value.length === 0){
            ModalError('add-student-modal-container')
            Error('Student Lastname is empty!')
            document.querySelector('#add_student_submit_button').disabled = false;
            document.querySelector('#add_student_submit_button').value = 'Submit'
            return
        }else if ( gender == null){
            ModalError('add-student-modal-container')
            Error('Please select a gender')
            document.querySelector('#add_student_submit_button').disabled = false;
            document.querySelector('#add_student_submit_button').value = 'Submit'
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
        const formData = new FormData();
        formData.append('img', fileInput.files[0] || document.querySelector('#avatar').src);
        formData.append('student_id', studentIdWithoutSpaces)
        formData.append('first_name', firstname.value)
        formData.append('last_name', lastname.value)
        formData.append('gender', gender)
        formData.append('year_level', yearlevel.value)
        formData.append('course_code', course.value)

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        })

        if(response.ok){
            const res = await response.json()
            ModalSuccess()
            console.log(res.message.message)
            Success(res.message.message)
            AppendStudentCard(data.student_id, data.first_name, data.last_name, data.gender, data.year_level, data.course_code, res.img_url)
            StudentEditInfoGetter()
            document.querySelector('#add_student_submit_button').disabled = false;
            document.querySelector('#add_student_submit_button').value = 'Submit'
            return
        }
        
        const res = await response.json()
        ModalError('add-student-modal-container')
        Error(res.message.message)
        document.querySelector('#add_student_submit_button').disabled = false;
        document.querySelector('#add_student_submit_button').value = 'Submit'
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
      
    function AppendStudentCard(id, fname, lname, gender, year, course, img_url, college='',ccode=''){
        const div = document.createElement('div')
        const container = document.querySelector('.student-main-container')
        div.id = `student-info-container-${id}`
        div.classList.add('student-info-container')
        div.innerHTML =`
                    <img class="student-avatar" id="student-avatar-${id}" src="${img_url}" alt="Avatar Icon">
                    
                    <p id="student-id-${id}">${id}</p>
                    <p  id="student-fullname-${id}">${fname} ${lname}</p>
                    <p  id="student-sex-${id}">${gender}</p>
                    <p  id="student-year-${id}">${year}</p>
                    <p  id="student-course-${id}">${course}</p>
                    <p id="student-college-${id}">${college}</p>
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
                console.log(newStudentInfo.img_url)
                document.querySelector(`#edit-avatar`).src = newStudentInfo.img_url
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

    document.querySelector('#edit-fileInput').addEventListener('change',()=>{
        const editfileInput = document.querySelector('#edit-fileInput')
        const avatar = document.getElementById('edit-avatar')
        avatar.src = URL.createObjectURL(editfileInput.files[0]);
    })

    editStudentContainer.addEventListener('submit', async (event)=>{
        event.preventDefault()
        document.getElementById('edit_student_submit_button').value = 'Updating...'
        document.querySelector('#edit_student_submit_button').disabled = true;
        const editfileInput = document.querySelector('#edit-fileInput')
        const avatar = document.getElementById('edit-avatar')
        const editedGender = maleGenderInputEdit.checked ? ('Male') : ('Female')
        const studentUneditedInfo = await getStudentInfoFromDatabase(idInputEdit.value)
        if(fnameInputEdit.value === '' || lnameInputEdit.value === "" || editedGender === "" || yearLevelInputEdit.value === "" || courseInputEdit.value === "" ){
            Error('Cannot Leave the input field Empty')
            ModalError('edit-student-modal-container')
            document.querySelector('#edit_student_submit_button').disabled = false;
            document.getElementById('edit_student_submit_button').value = 'Submit'
            return
        }
        else if(!editfileInput.files[0] && fnameInputEdit.value === studentUneditedInfo.first_name && lnameInputEdit.value === studentUneditedInfo.last_name && editedGender === studentUneditedInfo.sex && yearLevelInputEdit.value === studentUneditedInfo.year_level && courseInputEdit.value === studentUneditedInfo.course_code ){
            Error('Nothings Changed!')
            ModalError('edit-student-modal-container')
            document.querySelector('#edit_student_submit_button').disabled = false;
            document.getElementById('edit_student_submit_button').value = 'Submit'
            return
        }
        //ParaEdit
        const formData = new FormData()
        formData.append('student_id', idInputEdit.value)
        formData.append('first_name', fnameInputEdit.value)
        formData.append('last_name', lnameInputEdit.value)
        formData.append('sex', editedGender)
        formData.append('course_code', courseInputEdit.value)
        formData.append('year_level', yearLevelInputEdit.value)
        formData.append('img_url', editfileInput.files[0])
        formData.append('last_image_url', studentUneditedInfo.img_url)
        const url = window.origin + '/students/edit'
        const response = await fetch(url, {
            method: 'post',
            body: formData
        });
        
        
        if(response.ok){
            const res = await response.json()
            Success(`Student ${formData.student_id} was successfully updated`)
            HideModal('edit-student-modal-container')
            document.querySelector('#edit_student_submit_button').disabled = false;
            document.getElementById('edit_student_submit_button').value = 'Submit'
            //Update the Card Here
            UpdateStudentCardInformation(idInputEdit.value, fnameInputEdit.value, lnameInputEdit.value,editedGender, yearLevelInputEdit.value, courseInputEdit.value, res.img_url)
            return
        }

        const res = await response.json()
        Error(`Student ${formData.student_id} was unsuccessfully updated.`)
        document.querySelector('#edit_student_submit_button').disabled = false;
        document.getElementById('edit_student_submit_button').value = 'Submit'


        
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
        

    function UpdateStudentCardInformation(id, first_name, last_name, gender, year, course, img_url){
        document.getElementById(`student-avatar-${id}`).src = img_url
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

    const fileInput = document.getElementById('fileInput');
    const avatar = document.querySelector('#avatar');


        fileInput.addEventListener('change', ()=>{
            const file = fileInput.files[0];
            if (file) {
                // Check file size (less than 1MB)
                if (file.size > 1024 * 1024) {
                    Error('File size must be less than 1MB.');
                    fileInput.value = ''; // Clear the file input
                    
                }
            }

            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
                Error('Only .jpg, .jpeg, and .png files are allowed.');
                fileInput.value = ''; // Clear the file input
                return;
            }

                
            avatar.src = URL.createObjectURL(fileInput.files[0]);

        })



})