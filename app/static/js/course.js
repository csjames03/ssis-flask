window.addEventListener('DOMContentLoaded', async ()=>{
    if(window.location.href === window.origin + '/courses/'){
        const editCourseCancelButton = document.querySelector('#edit_course_cancel_button')
        const editCourseCloseButton = document.querySelector('#edit-course-close')
        const addCourseCancelButton = document.querySelector('#add_course_cancel_button');
        const addCourseCloseButton = document.querySelector('#add-course-close')
        const addCourseButton = document.querySelector('#add-course-modal-button');
        addCourseButton.addEventListener('click', ()=>{
            ShowModal('add-course-modal-container')
        })

        editCourseCloseButton.addEventListener('click', ()=>{
            HideModal('edit-course-modal-container')
        })

        editCourseCancelButton.addEventListener('click', ()=>{
            HideModal('edit-course-modal-container')
        })

        addCourseCloseButton.addEventListener('click', ()=>{
            HideModal('add-course-modal-container')
        })
        addCourseCancelButton.addEventListener('click', ()=>{
            HideModal('add-course-modal-container')
        })


        //Add Course Submit
        document.querySelector('#add_course_submit_button').addEventListener('click', async (event)=>{
            event.preventDefault();
            const courseIdInput = document.querySelector('#course_id_add')
            const courseNameInput = document.querySelector('#course_name_add')
            const collegeCodeInput = document.querySelector('#college_code_course_add')
            console.log(courseIdInput.value, courseNameInput.value, collegeCodeInput.value)


            if(courseIdInput.value == "" || courseNameInput.value == ""){
                ModalError('add-course-modal-container')
                Error('Please fill all fields')
                return
            }

            const url = window.origin + '/courses/add'
            const data = {
                course_code: courseIdInput.value,
                course_name: courseNameInput.value,
                college_code: collegeCodeInput.value
            }
            const data2 = {
                college_code: collegeCodeInput.value
            }
            const college_name = await fetch(window.origin + '/colleges/get',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            const college = await college_name.json()
            console.log(college)
            
            const response = await fetch(url,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            if(response.ok){
                const res = await response.json()
                Success(res.message)
                AddCourseCard(data.course_code, data.course_name, college.college_name)
                HideModal('add-course-modal-container')
            }


            const res = await response.json()
            Error(res.message)
            console.log(res.message)


        })

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

        function ModalError(id){
            document.querySelector(`#${id}`).style.boxShadow = ' 0 8px 16px 0 #DC3545';
            setTimeout(()=>{
                document.querySelector(`#${id}`).style.boxShadow =  '0 4px 8px 0 rgba(0,0,0,0.2)';
            }, 1500)
        }





        function HideModal(id){
            document.querySelector(`#${id}`).classList.add('hide-modal')
            document.querySelector(`#${id}`).classList.remove('show-modal')
    
        }
        function ShowModal(id){
            document.querySelector(`#${id}`).classList.add('show-modal')
            document.querySelector(`#${id}`).classList.remove('hide-modal')
        }

        function AddCourseCard(course_code, course_name, college_name){
            const mainContainer = document.querySelector('.course-main-container')
            const container = document.createElement('div')
            container.classList.add('course-container')
            container.innerHTML =`
            <div class="course-card-title">
                <div class="course-code-container">
                    <p>${course_code} <span>| ${college_name}</span></p>
                </div>
                <div class="course-title-container">
                    <p>${course_name}</p>
                    <div class="student-count-container">
                        <p>Students Enrolled: 0</p>
                    </div>
                </div>
                <div class="course-action">
                    <div class="edit-icon-course-container" id="edit-student-{{course.course_code}}">
                        <img src="/static/images/editIcon.png" alt="Edit Icon">
                    </div>
                    <div class="delete-icon-course-container" id="delete-student-{{course.course_code}}">
                        <img src="/static/images/deleteIcon.png" alt="Delete Icon">
                    </div>
                </div>
            </div>
            `
            mainContainer.appendChild(container)
        }


        async function GetCourseCodes(){
            const url = window.origin + '/courses/'
            const response = await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if(response.ok){
                const res = await response.json()
                AddEditEventListener(res)
                return
            }
        }
        GetCourseCodes()

        async function AddEditEventListener(courses){
            console.log(courses)
            for (let i = 0; i < courses.length; i++) {
                let element = document.querySelector(`#edit-course-${courses[i].course_code}`);
                if (element) {
                    element.addEventListener('click', async () => {
                        ShowModal('edit-course-modal-container');
                        const course = await getCourseFromDatabase(courses[i].course_code)
                        document.querySelector('#course_id_edit').value = course.course_code
                        document.querySelector('#course_name_edit').value = course.course_name
                        document.querySelector('#college_code_course_edit').value = course.college_code
                    });
                } else {
                    console.warn(`Element #edit-course-${courses[i].course_code} not found.`);
                }
            }
        }


        async function getCourseFromDatabase(code){
            const url = window.origin +'/courses/get'
            const data = {
                course_code: code
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if(response.ok){
                const res = await response.json()
                return res
            }
        }


















    }
})