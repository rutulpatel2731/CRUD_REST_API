$(document).ready(function() {
    function loadTable() {
        $("#loadData").html("");
        $.ajax({
            url: "http://php/Practial%20Task/CRUD_REST_API/api-fetch-all.php",
            type: "GET",
            success: function(data) {
                // console.log(data);
                if (data.status == false) {
                    $("#loadData").append("<tr><td colspan='6' class='text-center'>" + data.message + "</td></tr>");
                } else {
                    $.each(data, function(key, value) {
                        $("#loadData").append(
                            "<tr>" +
                            "<td>" + value.id + "</td>" +
                            "<td>" + value.student_name + "</td>" +
                            "<td>" + value.age + "</td>" +
                            "<td>" + value.city + "</td>" +
                            "<td> <button type='button' data-bs-toggle='modal' data-bs-target='#exampleModal' class='btn btn-success updateBtn' data-eid='" + value.id + "'>Edit</button></td>" +
                            "<td> <button id='deleteBtn' class='btn btn-danger' data-did='" + value.id + "'>Delete</button></td>" +
                            "</tr>");
                    });
                }
            }
        });
    }
    loadTable();

    // function for form data at the time of insert and update
    function jsonData(targetForm) {
        var arr = $(targetForm).serializeArray();
        // console.log(arr);
        var obj = {};
        for (var a = 0; a < arr.length; a++) {
            if (arr[a].value == "") {
                return false;
            }
            obj[arr[a].name] = arr[a].value;
        }
        // console.log(obj); js object
        var json_string = JSON.stringify(obj);
        // console.log(json_string);
        return json_string;
    }

    // function for alert message
    function message(message, status) {
        if (status == true) {
            $("#successMsg").removeClass('d-none').html(message);
            setTimeout(function() {
                $("#successMsg").addClass('d-none');
            }, 4000)
        } else if (status == false) {
            $("#errorMsg").removeClass('d-none').html(message);
            setTimeout(function() {
                $("#errorMsg").addClass('d-none');
            }, 4000)
        }

    }

    //fetch single record show in modal box
    $(document).on("click", ".updateBtn", function(e) {
        var studentId = $(this).data("eid");
        var obj = { sid: studentId };
        var myJson = JSON.stringify(obj);
        $.ajax({
            url: "http://php/Practial%20Task/CRUD_REST_API/api-fetch-single.php",
            type: "POST",
            data: myJson,
            success: function(data) {
                // console.log(data);
                $("#edit-id").val(data[0].id);
                $("#edit-name").val(data[0].student_name);
                $("#edit-age").val(data[0].age);
                $("#edit-city").val(data[0].city);
            }
        })
    })


    // insert data
    $("#sendData").on("click", function(e) {
        e.preventDefault();
        var jsonObj = jsonData("#addForm");
        if (jsonObj == false) {
            message("All fields are required", false);
        } else {
            $.ajax({
                url: "http://php/Practial%20Task/CRUD_REST_API/api-insert.php",
                type: "POST",
                data: jsonObj,
                success: function(data) {
                    // console.log(data);
                    message(data.message, data.status);
                    if (data.status == true) {
                        loadTable();
                        $("#addForm").trigger("reset");
                    }
                }
            })
        }
    })

    // update modal data
    $("#updateBtn").on("click", function(e) {
        e.preventDefault();
        var jsonObj = jsonData("#updateForm");
        if (jsonObj == false) {
            message("All fields are required", false);
        } else {
            $.ajax({
                url: "http://php/Practial%20Task/CRUD_REST_API/api-update.php",
                type: "POST",
                data: jsonObj,
                success: function(data) {
                    // console.log(data);
                    message(data.message, data.status);
                    if (data.status == true) {
                        loadTable();
                        $(".modal").modal("hide");
                    }
                }
            })
        }
    })

    $(document).on("click", "#deleteBtn", function() {
        var studentId = $(this).data("did");
        var myObj = { id: studentId }; // js Object
        console.log(myObj);
        var jsonObj = JSON.stringify(myObj);
        console.log(jsonObj);
        $.ajax({
            url: "http://php/Practial%20Task/CRUD_REST_API/api-delete.php",
            type: "POST",
            data: jsonObj,
            success: function(data) {
                message(data.message, data.status);
                if (data.status == true) {
                    loadTable();
                }
            }
        })
    })
})