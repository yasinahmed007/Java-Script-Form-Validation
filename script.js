$(document).ready(function () {
    // Check for existing cookies
    if (getCookie("skills") && getCookie("college")) {
        $('input[name="skills"]').each(function() {
            if (getCookie("skills").includes($(this).val())) {
                $(this).prop('checked', true);
            }
        });
        $('#college').val(getCookie("college"));
    }

    $("#registrationForm").on("submit", function (e) {
        e.preventDefault();

        // Validate form fields
        const name = $("#name").val().trim();
        const username = $("#username").val().trim();
        const password = $("#password").val();
        const rePassword = $("#rePassword").val();
        const gender = $("input[name='gender']:checked").val();
        const contactNo = $("#contactNo").val().trim();
        const email = $("#email").val().trim();
        const college = $("#college").val();

        // Basic validation
        if (!name || !username || !password || !rePassword || !gender || !contactNo || !email || !college) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== rePassword) {
            alert("Passwords do not match.");
            return;
        }

        // If "Remember Me" is checked, save the skills and college in cookies
        if ($("#rememberMe").is(":checked")) {
            let skills = [];
            $('input[name="skills"]:checked').each(function() {
                skills.push($(this).val());
            });
            setCookie("skills", skills.join(','), 7);
            setCookie("college", college, 7);
        } else {
            // Clear cookies if "Remember Me" is not checked
            setCookie("skills", "", -1);
            setCookie("college", "", -1);
        }

        alert("Form submitted successfully!");

        // Reset form fields
        this.reset();
    });
});

// Cookie functions
function setCookie(name, value, days) {
    const expires = days ? "; expires=" + new Date(Date.now() + days * 864e5).toUTCString() : "";
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
    return document.cookie.split('; ').reduce((r, c) => {
        const [key, value] = c.split('=');
        return key === name ? decodeURIComponent(value) : r;
    }, '');
}
