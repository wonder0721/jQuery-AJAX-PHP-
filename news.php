<?php
 
    $type=$_GET['type'];
    $content = file_get_contents("http://v.juhe.cn/toutiao/index?type=".$type."&key=f35aa3799a0ab1a479014f1f2412662a");
    echo $content;

?>