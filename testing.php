<!DOCTYPE html>
<html lang="en">
<head>
    <title>argamee</title>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>

        // This was use to validate the input before submitting the form to the php 
        function validateForm() {
            let surname = document.forms["sectionForm"]["surname"].value;
            let nameRegex = /^[A-Za-z]{5,}$/;
            if (!nameRegex.test(surname)) {
                Swal.fire({
                    title: 'Invalid Input!',
                    text: 'Surname must contain only letters and be at least 5 characters long.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return false; 
            }
            return true;
        }
    </script>
</head>
<body>

    <h2>Find Your Section</h2>
 
    <form name="sectionForm" method="POST" onsubmit="return validateForm()">
    <label for="firstname">firstname:</label>
    <input type="text" name="firstname" required>
    
    <label for="surname">Enter Surname:</label>
        <input type="text" name="surname" required>
        
    <label for="gender">Select Gender:</label><br>
    <input type="radio" id="male" name="gender" value="3" required> 
    <label for="male">Male</label>

        <input type="radio" id="female" name="gender" value="4" required>
        <label for="female">Female</label>


        <button type="submit">Check Section</button>
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $surname = strtoupper($_POST["surname"]);
        $gender = $_POST["gender"];        

        // KUNIN FIRST LETTER NG FIRSTNAME TAPOS COMPARE SA A-M WHICH IS GROUP 1 THN PAG FALSE MAG FAFALL NA SA GROUP 2
        $firstLetter = $surname[0];
        $surnameGroup = ($firstLetter >= 'A' && $firstLetter <= 'M') ? 1 : 2;

        // ETO NAMAN BASIC NA BASIC CHECHECK LANG KUNG SAANG CLASS
        if ($surnameGroup == 1 && $gender == 3) {
            $section = "Class A";
        } elseif ($surnameGroup == 2 && $gender == 4) {
            $section = "Class B";
        } elseif ($surnameGroup == 2 && $gender == 3) {
            $section = "Class C";
        } elseif ($surnameGroup == 1 && $gender == 4) {
            $section = "Class D";
        } else {
            $section = "Unknown";
        }


        // DITO NAMAN BASIC NA BASIC DEN I RURUN LANG YUNG SWAL.FIRE NI DAMYEL.
        echo "<script>
            Swal.fire({
                title: 'Section Identified!',
                text: 'You belong to $section',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        </script>";
    }
    ?>

</body>
</html>