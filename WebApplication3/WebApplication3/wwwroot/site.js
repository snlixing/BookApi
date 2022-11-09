const uri = "api/book";
let books = null;
function getCount(data) {
    const el = $("#counter");
    let name = "book";
    if (data) {
        if (data > 1) {
            name = "book-s";
        }

        el.text(data + " " + name);
    } else {
        el.text("No " + name);
    }
}

$(document).ready(function () {
    getData();

});

function getData() {
    $.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function (data) {
            const tBody = $("#books");
            $(tBody).empty();
            getCount(data.length);

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(item.id))
                    .append($("<td></td>").text(item.name))
                    .append($("<td></td>").text(item.releaseDate))
                    .append($("<td></td>").text(item.author))
                    .append($("<td></td>").text(item.price))
                    .append($("<td></td>").text(item.publishing))
                    .append(
                        $("<td></td>").append(

                            $("<button class=\"btn btn-default btn-sm\" >Edit</button>").on("click", function () {
                                editItem(item.id);
                            })
                        )
                    )
                    .append(
                        $("<td></td>").append(

                            $("<button class=\"btn btn-default btn-sm\">Delete</button>").on("click", function () {
                                deleteItem(item.id);
                            })
                        )
                    );
                tr.appendTo(tBody);
            });
            books = data;
        }
    });
}

function addItem() {
    const item = {
        Name: $("#AddName").val(),
        ReleaseDate: $("#AddReleaseDate").val(),
        Author: $("#AddAuthor").val(),
        Publishing: $("#AddPublishing").val(),
        Price: $("#AddPrice").val(),

        ID: 0
    };

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },

        success: function (result) {
            getData();
            $("#add-name").val("");
        }
    });
}

function deleteItem(id) {
    $.ajax({
        url: uri + "/" + id,
        type: "DELETE",
        success: function (result) {
            getData();
        }
    });
}

function editItem(id) {
    $.each(books, function (key, item) {
        if (item.id === id) {
            $("#Name").val(item.name);
            $("#BookID").val(item.id);
            $("#ReleaseDate").val(item.releaseDate);

            $("#Author").val(item.author);
            $("#Publishing").val(item.publishing);
            $("#Price").val(item.price);
            $("#RowVersion").val(item.rowVersion);
        }
    });
    $("#spoiler").css({ display: "block" });
}

$(".my-form").on("submit", function () {
    const item = {
        Name: $("#Name").val(),
        ReleaseDate: $("#ReleaseDate").val(),
        Author: $("#Author").val(),
        Publishing: $("#Publishing").val(),
        Price: $("#Price").val(),
        RowVersion: $("#RowVersion").val(),
        ID: $("#BookID").val()
    };

    $.ajax({
        url: uri + "/" + $("#BookID").val(),
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});

function closeInput() {
    $("#spoiler").css({ display: "none" });
}