<?php
/**
 * Inline CMS Backend Processing
 *
 * @author  Angus Moore <angusmoore73@gmail.com>
 * @license MIT <https://opensource.org/licenses/MIT>
 */

require "./inc/core.php";

$headers = getallheaders();

/* Check for Ajax POST request */
if ($_SERVER['REQUEST_METHOD'] != 'POST' && strtolower($headers['x-requested-with']) == 'xmlhttprequest') {
    echo "HTTP/1.1 POST request only";
    exit;
}

/* Prevent cross site requests */
if ($headers['x-csrf-token'] != $_SESSION['csrf_token']) {
    echo "CSRF token doens't match";
    exit;
}

/* Authenticate session */
$csrf_token = mysqli_real_escape_string($dbc, $_SESSION['csrf_token']);
$check_user = mysqli_query($dbc, "SELECT id FROM users WHERE token = '$csrf_token'");
if ($check_user && mysqli_num_rows($check_user)) {
    if ($_POST['page']) {
        $page_id = (int) $_POST['page'];
        unset($_POST['page']);
    }

    /* Update site content */
    foreach ($_POST as $title => $body) {
        $title = mysqli_real_escape_string($dbc, $title);
        $body = mysqli_real_escape_string($dbc, str_replace("\t", "", $body));

        if (mysqli_query($dbc, "UPDATE content SET body = '$body' WHERE title = '$title' AND page = '$page_id'")) {
            echo "success";
        } else {
            echo "Error updating content";
        }
    }
} else {
    echo "Unauthorized user";
}
