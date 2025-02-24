<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Class Identifier</title>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="./script/script.js"></script>
    <link rel="stylesheet" href="./styles/styles.css">
</head>
<body>
    <div class="container">
        <h1>Class Identifier v1</h1>
        <div class="rgbBorder"></div>
        <form class="card" id="card" method="POST" onsubmit="return validateInput()">
                <div class="input-group">
                    <label for="fName">First Name *</label>
                    <input type="text" name="fName" id="fName" data-counter="#fNameCtr" placeholder="Enter your first name." required>
                    <span id="fNameCtr">0/50</span>
                </div>
                <div class="input-group">
                    <label for="lName">Last Name *</label>
                    <input type="text" name="lName" id="lName" data-counter="#lNameCtr" placeholder="Enter your last name." required>
                    <span id="lNameCtr">0/50</span>
                </div>
                <div class="input-group">
                    <label>Gender *</label>
                    <div class="option-group">
                        <label class="opt1">
                            <input type="radio" name="genderOpt" id="maleOption" value="3" checked required>
                            <span>Male</span>
                        </label>
                        <label class="opt2">
                            <input type="radio" name="genderOpt" id="femaleOption" value="4" required>
                            <span>Female</span>
                        </label>
                    </div>
                </div>
                <div class="input-group">
                    <label for="age">Age *</label>
                    <input type="number" inputmode="numeric" name="age" id="age" min="3" max="100" placeholder="Enter your age." required>
                </div>
                <div class="input-group">
                    <label for="address">Address *</label>
                    <textarea name="address" id="address" rows="4" cols="50" data-counter="#addressCtr" placeholder="Type your address here." required></textarea>
                    <span id="addressCtr">0/150</span>
                </div>
                <span id="message"></span>
                <button class="identifyBtn" type="submit">Identify</button>
        </form>
    </div>
</body>
</html>

<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // kunin yung values ng mga input fields, if may laman, kunin yung value, else, empty string
        
        $fName = isset($_POST["fName"]) ? $_POST["fName"] : '';
        $lName = isset($_POST['lName']) ? $_POST["lName"] : '';
        $surname = isset($_POST["lName"]) ? strtoupper($_POST["lName"]) : ''; // kunin then i-uppercase
        $gender = isset($_POST["genderOpt"]) ? $_POST["genderOpt"] : ''; 
        $age = isset($_POST["age"]) ? $_POST["age"] : '';
        $address = isset($_POST['address']) ? $_POST['address'] : '';

        $section = "Unknown";  //default value 

        if (!empty($surname) && !empty($fName)) {
            $firstLetter = $surname[0];
            $surnameGroup = ($firstLetter >= 'A' && $firstLetter <= 'M') ? 1 : 2;
    
            if ($surnameGroup == 1 && $gender == "3") {
                $section = "Class A";
            } elseif ($surnameGroup == 2 && $gender == "4") {
                $section = "Class B";
            } elseif ($surnameGroup == 2 && $gender == "3") {
                $section = "Class C";
            } elseif ($surnameGroup == 1 && $gender == "4") {
                $section = "Class D";
            }
        }

        if ($gender == "3") {
            $gender = "Male";
        } else {
            $gender = "Female";
        }
        
        echo "<script>
        Swal.fire({
            title: 'Section Identified!',
            text: 'You belong to $section',
            icon: 'success',
            confirmButtonText: 'Cool!'
        }).then(() => {
            Swal.fire({
                title: 'Summary of Input',
                html: 'Name: $fName $lName <br> Gender: $gender <br> Section: $section <br> Age: $age <br> Address: $address',
                icon: 'info',
                confirmButtonText: 'Cool!'
            });
        });
        </script>";
   
        exit;
    }
?>