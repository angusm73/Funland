<?php
/**
 * Inline CMS Core Include
 *
 * @author  Angus Moore <angusmoore73@gmail.com>
 * @license MIT <https://opensource.org/licenses/MIT>
 */

date_default_timezone_set('Australia/Sydney');
$env = parse_ini_file("$_SERVER[DOCUMENT_ROOT]/../env.ini");

session_start();
$_SESSION['csrf_token'] = md5(session_id() . date('d'));

// /* Connect to MySQL server */
// $dbc = new mysqli($env['db_host'], $env['db_user'], $env['db_pass'], "crossfit_huey");

// if (mysqli_connect_errno()) {
//     echo "MySQL connection error: " . mysqli_connect_error();
// }

$google_api_key = $env['google_api_key'];

// /* Get shared content */
// $content = [];
// $_content = mysqli_query($dbc, "SELECT * FROM content WHERE ISNULL(page)");
// if ($_content && mysqli_num_rows($_content)) {
//     while ($i = mysqli_fetch_object($_content)) {
//         $content[$i->title] = $i->body;
//     }
// }

// /* Get page content */
// $page = [];
// $pages = [];
// if ($page_id) {
//     $_page_info = mysqli_query($dbc, "SELECT * FROM pages");
//     if ($_page_info && mysqli_num_rows($_page_info)) {
//         while ($info = mysqli_fetch_assoc($_page_info)) {
//             $pages[$info['id']] = $info;
//             if ($info['id'] == $page_id) {
//                 $page['title'] = $info['title'];
//                 $page['metaTitle'] = $info['metaTitle'];
//                 $page['metaKeywords'] = $info['metaKeywords'];
//                 $page['metaDescription'] = $info['metaDescription'];
//             }
//         }
//     }
//     $_page = mysqli_query($dbc, "SELECT * FROM content WHERE page = '$page_id'");
//     if ($_page && mysqli_num_rows($_page)) {
//         while ($i = mysqli_fetch_object($_page)) {
//             $page[$i->title] = $i->body;
//         }
//     }
// }

// /* Check if logged in */
// $check_login = mysqli_query($dbc, "SELECT * FROM users WHERE token = '$_SESSION[csrf_token]'");
// $logged_in = $check_login && mysqli_num_rows($check_login);
// if ($logged_in) {
//     $user = mysqli_fetch_object($check_login);
// }

function write_log($msg)
{
    $log = fopen($_SERVER['DOCUMENT_ROOT'] . '/../website.log', 'a');
    $timestamp = date('Y-m-d H:i:s');
    fwrite($log, "[$timestamp] $msg\n");
    fclose($log);
}
