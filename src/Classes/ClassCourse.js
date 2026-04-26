import { Student } from "../Classes/ClassStudent.js"

export class Course {
    constructor(name, code, creditHour, summary, msTeamsLink, type) {
        this.name = name;
        this.code = code;
        this.creditHour = creditHour;
        this.summary = summary;
        this.msTeamsLink = msTeamsLink;
        this.type = type;
    }

    addStudent(studentIndex, courseIndex) {
        let coursesData = JSON.parse(localStorage.getItem("courses")) || [];
        let studentsData = JSON.parse(localStorage.getItem("students")) || [];
        let getStudentData = studentsData[studentIndex];
        let getCourseData = coursesData[courseIndex];
        
        if (studentIndex == null) {
            return "Student does not exist";
        }

        if (!getCourseData.students) {
            getCourseData.students = [];
        }

        for (let i=0; i<getCourseData.students.length; i++) {
            if (getCourseData.students[i].name === getStudentData.name) {
                return "Student has already enrolled this course";
            }
        }

        getCourseData.students.push(getStudentData);
        localStorage.setItem("courses", JSON.stringify(coursesData));

        let studentClass = new Student();
        Object.assign(studentClass, getStudentData);
        // console.log(coursesData);
        studentClass.addCourse(getCourseData, studentIndex);

        return "Successfully added student to course";
    }

    findStudent(searchInput) {
        // Retrieve course data from local storage
        let getData = searchWith(searchInput, "code", "students");

        if (!getData) {
            // TO DO
        }
    }
}