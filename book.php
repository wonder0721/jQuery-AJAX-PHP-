<?php
 
    $bookId=$_GET['bookId'];
    $content = file_get_contents("http://apis.juhe.cn/goodbook/query?key=df836fb37d73d7fad1d17c912816eec2&catalog_id=".$bookId."&pn=0&rn=20");
    echo $content;

?>