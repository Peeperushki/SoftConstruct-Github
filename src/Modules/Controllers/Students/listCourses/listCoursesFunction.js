// Display all courses taken by a student
export function displayCoursesInStudent(data, to, ID) {
    if (data == null) { return };
    to.replaceChildren();

    data.forEach((x, i) => {
        let result = document.createElement("div")
        result.id = `course-data-container-${x.code}-${ID}`

        let courseData = document.createElement("span")
        courseData.id = `course-data-${x.code}-${ID}`
        courseData.textContent = `[${i + 1}] ${x.name} | ${x.code} | ${x.creditHour} | ${x.msTeamsLink} | ${x.type}`
        result.appendChild(courseData);

        to.appendChild(result)
    });
}

// Display a course taken by a student
export function displaySingleCourseInStudent(data, order, to, ID) {
    if (data == null) { return };
    to.replaceChildren();

    let result = document.createElement("div")
    result.id = `course-data-container-${data.code}-${ID}`

    let courseData = document.createElement("span")
    courseData.id = `course-data-${data.code}-${ID}`
    courseData.textContent = `[${order}] ${data.name} | ${data.code} | ${data.creditHour} | ${data.msTeamsLink} | ${data.type}`
    result.appendChild(courseData);

    to.appendChild(result);
}

// Find a specific course taken by a student
export function findCourse(to, ID, htmlList) {
    // Fetch students data
    let students = JSON.parse(localStorage.getItem("students")) || []

    // Search creation
    let container = document.createElement("div");
    container.id = `find-course-container-${ID}`

    let searchLabel = document.createElement("label");
    searchLabel.textContent = "Search course";
    searchLabel.for = `find-course-search-${ID}`;
    container.appendChild(searchLabel);
    container.appendChild(document.createElement("br"));

    let search = document.createElement("input");
    search.type = "search";
    search.placeholder = "Enter course code";
    search.id = `find-course-search-${ID}`
    search.name = `find-course-search-${ID}`
    search.setAttribute("list", "courses-history");
    container.appendChild(search);

    search.addEventListener("input", function (event) {
        event.preventDefault();

        // Check if value is not empty
        if (search.value != "" && search.value.length > 0) {
            students.forEach((x, _) => {
                if (x.id == ID) {
                    x.courses.forEach((course, i) => {
                        if (course.code === search.value) {
                            displaySingleCourseInStudent(course, i+1, htmlList, ID);
                        }
                    });
                }
            });
        } else {
            students.forEach((x, _) => {
                if (x.id == ID) {
                    displayCoursesInStudent(x.courses, htmlList, ID);
                }
            })
        }
    })

    to.appendChild(container);
}