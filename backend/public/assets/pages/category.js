$(document).ready(function () {

    $("#categoryForm").on("submit", async function (e) {

        e.preventDefault();

        const id = $("#categoryId").val();

        const payload = {
            name: $("#name").val().trim(),
            status: $("#status").val() === "true"
        };

        if (!payload.name) {
            return Swal.fire({
                icon: "warning",
                title: "Validation Error",
                text: "Category name is required."
            });
        }

        try {

            const url = id
                ? `/api/categories/${id}`
                : "/api/categories";

            const method = id
                ? "PUT"
                : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok && data.success) {

                await Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: data.message
                });

                window.location.href = "/categories";

            } else {

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.message || "Something went wrong."
                });

            }

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong."
            });

        }

    });

});