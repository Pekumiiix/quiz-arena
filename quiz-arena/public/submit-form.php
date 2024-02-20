<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$response = ["message" => "", "error" => ""];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conn = mysqli_connect('localhost', 'root', '', 'quiz_arena') or die("Connection failed: " . mysqli_connect_error());

    if (
        isset($_POST["question"]) &&
        isset($_POST["options"]) &&
        isset($_POST["subject"]) &&
        isset($_POST["difficulty"])
    ) {
        // Sanitize and retrieve form data
        $question = mysqli_real_escape_string($conn, $_POST['question']);
        $subject = mysqli_real_escape_string($conn, $_POST['subject']);
        $difficulty = mysqli_real_escape_string($conn, $_POST['difficulty']);
    
        $insertQuestion = "INSERT INTO `quiz_details` (`question`, `subject`, `difficulty`) VALUES ('$question', '$subject', '$difficulty')";
    
        $query = mysqli_query($conn, $insertQuestion);
    
        if ($query) {
            $questionId = mysqli_insert_id($conn); //Get the question_id generated for the inserted question

            $response["success"] = true;
            $response["message"] = "Entry Successful";
            
            if(isset($_POST['options']) && is_array($_POST['options'])) {
                $index = 0;

                foreach ($_POST['options'] as $optionText) {
                    $isCorrect = $_POST['is_correct_'.$index] === "true" ? 1 : 0;
            
                    //Escape option text
                    $optionText = mysqli_real_escape_string($conn, $optionText);
            
                    $insertOption = "INSERT INTO `option_table` (`question_id`, `option_text`, `is_correct`) VALUES ('$questionId', '$optionText', '$isCorrect')";
                    mysqli_query($conn, $insertOption);

                    $index++;
                }
            } else {
                echo "Error: Options are not received as an array.";
            }
        } else {
            $response["success"] = false;
            $response["message"] = "An error occurred while processing your request";

            //Handle query execution failure
            echo "Error: " . mysqli_error($conn);
        }
    }
    

    //Close the database connection
    mysqli_close($conn);
}

//Return a JSON response
echo json_encode($response);

?>