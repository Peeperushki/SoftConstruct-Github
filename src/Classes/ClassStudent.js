import { searchWith } from "../Modules/Controllers/Course/Search/searchFunction.js"

export class Student {
    constructor(name, id, email, phoneNumber) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    addCourse(course, index) {
        let coursesData = JSON.parse(localStorage.getItem("courses")) || [];
        let studentsData = JSON.parse(localStorage.getItem("students")) || [];
        let getStudentData = studentsData[index];

        if (!getStudentData.courses) {
            getStudentData.courses = [];
        }

        getStudentData.courses.push(course);
        localStorage.setItem("students", JSON.stringify(studentsData));

        console.log(studentsData);
    }

    findCourse(searchInput) {
        // Retrieve course data from local storage
        let getData = searchWith(searchInput, "code", "courses");

        if (!getData) {
            // TO DO
        }
    }
}