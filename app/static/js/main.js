window.addEventListener('DOMContentLoaded',async ()=>{
    const colleges = window.origin+'/colleges/'
    const students = window.origin+'/students/'
    const courses = window.origin+'/courses/'

    if(window.location.href  === students){
        document.querySelector('.instudents').style.color = "#4154F1"
    }

    if(window.location.href  === colleges){
        document.querySelector('.incolleges').style.color = "#4154F1"
    }

    if(window.location.href  === courses){
        document.querySelector('.incourses').style.color = "#4154F1"
    }
})