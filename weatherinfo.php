<?php
 
    $city=$_GET['city'];
    $content = file_get_contents("http://t.weather.sojson.com/api/weather/city/".$city);
    echo $content;

?>