function start() {
    getAPI(function (courses) {
        showCourse(courses)
    })
}
start()

function getAPI(callback) {
    fetch("http://localhost:3004/courses")
        .then(function (courses) {
            return courses.json()
        })
        .then(callback)
}

function showCourse(courses) {
    var html = courses.map(function (value) {
        return `
        <li id="course_id_${value.id}">
        <h3>${value.name}</h3>
        
            <p>${value.description}</p>
            <button onclick="deleteCourse(${value.id})">Xóa</button>
        </li>
        
        `
    }).join("")
    var ulElement = document.getElementById("show_courses")
    ulElement.innerHTML = html
}

// Phương thức API
function createCourse() {
    var nameText = document.getElementById("name").value
    var descriptionText = document.getElementById("description").value

    if (nameText == "" || descriptionText == "")
        alert("Nhập hết thông tin đi đã. ")
    else {
        var jsonCourse = {
            name: nameText,
            description: descriptionText
        }
        fetch("http://localhost:3004/courses", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(jsonCourse)
        })
            .then(function (respond) {
                return respond.json()
            })

    }

}

function deleteCourse(id) {
    fetch("http://localhost:3004/courses" + "/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },

    })
        .then(function (respond) {
            return respond.json()
        })
}