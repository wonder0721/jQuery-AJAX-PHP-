<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>贪吃蛇</title>
	<link rel="stylesheet" href="./lib/tanchishe.css" type="text/css"/>	
</head>
<body>
	<?php
		echo '<div class = "game-wrapper">
				<div class = "game1-main" id = "main">
					<div class = "startimg" id = "startimg">
						<div class = "hand"></div>
					</div>
					<div class = "gameover" id = "gameover">
						<div class = "cha" id = "cha"></div>
						<div class = "record">最终得分：<span id = "record"></span></div>
					</div>
					<div class = "speed" id = "speed">
						<span speed = "400">慢</span>
						<span speed = "200">中</span>
						<span speed = "100" class = "current">快</span>
					</div>
				</div>
				<div class = "score" id = "score">
					&nbsp得分：<span id = "num">0</span>
				</div>
				<div class = "pause" id = "pause"></div>
				<div class = "start" id = "start"></div>
			</div>'
	?>
</body>
</html>