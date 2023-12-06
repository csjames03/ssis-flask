const collegeAddForm = document.querySelector('#add-college-modal-container')


document.querySelector('#add-college-modal-button').addEventListener('click', ()=>{
    ShowModal('add-college-modal-container')
})

document.querySelector('#add-college-close').addEventListener('click', ()=>{
    HideModal('add-college-modal-container')
})

document.querySelector('#add_college_cancel_button').addEventListener('click', ()=>{
    HideModal('add-college-modal-container')
})

document.querySelector('#edit-college-close').addEventListener('click', ()=>{
    HideModal('edit-college-modal-container')
})

document.querySelector('#edit_college_cancel_button').addEventListener('click', ()=>{
    HideModal('edit-college-modal-container')
})


collegeAddForm.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const collegeCode = document.querySelector('#college_code_add')
    const collegeName = document.querySelector('#college_name_add')
    console.log(collegeCode.value, collegeName.value)
    if(collegeCode.value === ""){
        ModalError('add-college-modal-container')
        Error('Please enter college code')
        return
    }else if(collegeName.value === ""){
        ModalError('add-college-modal-container')
        Error('Please enter college name')
        return
    }

    const url = window.origin +'/colleges/add'

    const data = {
        college_code: collegeCode.value,
        college_name: collegeName.value
    }

    const req = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if(req.ok){
        const request = await req.json()
        Success(request.message)
        HideModal('add-college-modal-container')
        AddCollegeCard(data.college_code, data.college_name)
        return
    }
    const request = await req.json()
    Error(request.message)
    ModalError('add-college-modal-container')


})













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
function Error(message){
    document.querySelector(`.error`).classList.remove('hide-message')
    document.querySelector('.error-p').innerText = message
    document.querySelector(`.error`).classList.add('show-message')
    setTimeout(()=>{
        document.querySelector(`.error`).classList.remove('show-message')
        document.querySelector(`.error`).classList.add('hide-message')
        
    },1500)
}


function AddCollegeCard(collegeCode, collegeName){
    const mainContainer = document.querySelector('.college-main-container')
    const container = document.createElement('div')
    container.classList.add('college-container')
    container.innerHTML =`
    <div class="college-clippath">
            </div>
            <div class="college-details">
                <p>${collegeName} <span>(${collegeCode})</span></p>
                <p>Course Count: 0</p>
            </div>
            <div class="college-action">
                <div class="edit-icon-college-container" id="edit-college-${collegeCode}">
                    <img src="/static/images/editIcon.png" alt="Edit Icon">
                </div>
                <div class="delete-icon-college-container" id="delete-college-${collegeCode}">
                    <img src="/static/images/deleteIcon.png" alt="Delete Icon">
                </div>
            </div>
        </div>
    `
    mainContainer.appendChild(container)
}


async function GetCourseCodes(){
    const url = window.origin + '/colleges/all'
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if(response.ok){
        const res = await response.json()
        AddEditEventListener(res)
        AddDeleteEventListener(res)
        return
    }
}

GetCourseCodes()

async function AddEditEventListener(colleges){
    console.log(colleges)
    for (let i = 0; i < colleges.length; i++) {
        //edit-college-{{college.college_code}}
        let element = document.querySelector(`#edit-college-${colleges[i].college_code}`);
        if (element) {
            element.addEventListener('click', async () => {
                ShowModal('edit-college-modal-container');
                const college = await getCollegeFromDatabase(colleges[i].college_code)
                document.querySelector('#college_code_edit').value = college.college_code
                document.querySelector('#college_name_edit').value = college.college_name
            });
        } else {
            console.warn(`Element #edit-college-${colleges[i].college_code} not found.`);
        }
    }
}


async function AddDeleteEventListener(colleges){
    console.log(colleges)
    for (let i = 0; i < colleges.length; i++) {
        let element = document.querySelector(`#delete-college-${colleges[i].college_code}`);
        if (element) {
            element.addEventListener('click', async () => {
                ShowModal('delete-college-modal-container');
                document.querySelector(`#delete-id-college-span`).innerText = `${colleges[i].college_code}`
                document.querySelector(`#delete-college-id`).value = `${colleges[i].college_code}`
            });
        } else {
            console.warn(`Element #edit-college-${colleges[i].course_code} not found.`);
        }
    }
}


async function getCollegeFromDatabase(code) {
    // Construct the URL
    const url = window.origin + '/colleges/get';
  
    // Prepare the data payload
    const data = {
      'college_code': code
    };
  
    // Make an asynchronous POST request using the Fetch API
    const request = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  
    // Check if the request was successful (status code 200-299)
    if (request.ok) {
      // If successful, parse the JSON response
      const response = await request.json();
      return response;
    }
  
    // If the request was not successful, return null
    return null;
  }
  
// Submit Edit 

document.querySelector('#edit-college-modal-container').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const code = document.querySelector('#college_code_edit').value;
    const name = document.querySelector('#college_name_edit').value
    const dbData = await getCollegeFromDatabase(code);
    console.log(dbData);

    if(name === ""){
        ModalError('edit-college-modal-container')
        Error('Please enter a College Name')
        return
    }else if (name === dbData.college_name){
        ModalError('edit-college-modal-container')
        Error('Nothings Changed')
        return

    }

    const url = window.origin + '/colleges/edit'
    const data = {
        college_code: code,
        college_name: name
    }

    const request = await fetch(url,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if(request.ok){
        const req = await request.json();
        Success(req.message)
        HideModal('edit-college-modal-container')
        console.log( document.querySelector(`#college-name-${data.college_code}`))
        document.querySelector(`#college-name-${data.college_code}`).innerHTML = `
        ${name} <span>(${code})</span>
        `
        return
    }
    else{
        const req = request.json();
        Error(req.message)
        ModalError('edit-college-modal-container')
    }
  });
  

  document.querySelector('#delete-college-form').addEventListener('submit', async(event) =>{
    event.preventDefault()

    const code = document.querySelector('#delete-college-id').value
    const url = window.origin + '/colleges/delete'
    const data = {
        college_code: code,
    }

    const req = await fetch(url,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    if(req.ok){
        const request = await req.json()
        Success(request.message)
        HideModal('delete-college-modal-container')
        document.querySelector(`#college-container-${data.college_code}`).style.display = 'none'
        return
    }
    const request = await req.json()
    Error(request.message)
    HideModal('delete-college-modal-container')
    ModalError('delete-college-modal-container')
    return
  })