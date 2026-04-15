import { Student } from '../../Classes/ClassStudent.js'

// Retrieve student data from local storage
const STUDENTS = JSON.parse(localStorage.getItem("students")) || [];

const FORM = document.getElementById("formStudent");
const BUTTON = document.getElementById("submitStudent");
const CONTAINER = document.getElementById("containerStudent");

if (BUTTON != null) {
    BUTTON.addEventListener('click', function(event) {
        event.preventDefault()
        
        // Fetch data from the form
        const FORM_DATA = new FormData(FORM);
        const NAME = FORM_DATA.get("studentName");
        const ID = FORM_DATA.get("studentID");
        const EMAIL = FORM_DATA.get("studentEmail");
        const PHONE_NUM = FORM_DATA.get("phoneNumber");

        // Create the new student
        var NewStudent = new Student(NAME, ID, EMAIL, PHONE_NUM);

        STUDENTS.push(NewStudent);

        // Save the student data to localstorage
        localStorage.setItem("students", JSON.stringify(STUDENTS))

        CONTAINER.innerHTML = "Successfully added student."

        console.log(STUDENTS)
    })
} 