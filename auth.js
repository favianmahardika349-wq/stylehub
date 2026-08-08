// ================================
// REGISTER
// ================================

const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "registerName"
                ).value;

            const email =
                document.getElementById(
                    "registerEmail"
                ).value;

            const password =
                document.getElementById(
                    "registerPassword"
                ).value;


            let users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];


            const exists =
                users.find(
                    user => user.email === email
                );


            if (exists) {

                alert(
                    "Email sudah terdaftar!"
                );

                return;

            }


            users.push({

                name,
                email,
                password

            });


            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );


            alert(
                "Registrasi berhasil! Silakan login."
            );


            window.location.href =
                "login.html";

        }
    );

}


// ================================
// LOGIN
// ================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value;

            const password =
                document.getElementById(
                    "loginPassword"
                ).value;


            const users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];


            const user =
                users.find(
                    item =>
                        item.email === email &&
                        item.password === password
                );


            if (!user) {

                alert(
                    "Email atau password salah!"
                );

                return;

            }


            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );


            alert(
                `Selamat datang, ${user.name}!`
            );


            window.location.href =
                "index.html";

        }
    );

}


// ================================
// LOGIN BUTTON
// ================================

function updateAuthButton() {

    const button =
        document.getElementById(
            "authButton"
        );

    if (!button) return;


    const user =
        JSON.parse(
            localStorage.getItem("currentUser")
        );


    if (user) {

        button.textContent =
            `Hi, ${user.name}`;

        button.href =
            "#";

        button.onclick =
            function() {

                logout();

            };

    }

}


// ================================
// LOGOUT
// ================================

function logout() {

    localStorage.removeItem(
        "currentUser"
    );


    alert(
        "Kamu berhasil logout."
    );


    window.location.href =
        "index.html";

}

