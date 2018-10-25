<!DOCTYPE html>
<html lang="en">
<head>
<title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
<?php
	$login=mysqli_connect('localhost','root','','user_details');
	if($login==null){
		echo'Error connecting to teh Database.';	
	}
	$sql="select * from user_details";
	$result=mysqli_query($login,$sql); ?>
		<div class="container">
			<center><h2>Login Logs</h2></center>
		</div>
		<div class="container">
			<table class='table table-striped' border='2' padding='5px'>
				<thead>
					<tr>
						<th>ID</th>
						<th>IP</th>
						<th>City</th>
						<th>State</th>
						<th>Zip</th>
						<th>Country</th>
						<th>Device</th>
						<th>Proxy</th>
						<th>Latitude</th>
						<th>Longitude</th>	
					</tr>
				</thead>
				<?php 
				while($row=mysqli_fetch_array($result))
				{ ?>
					<tr>
						<td><?= $row['ID']; ?></td>
						<td><?= $row['IP'] ?></td>
						<td><?= $row['City'] ?></td>
						<td><?= $row['State'] ?></td>
						<td><?= $row['Zip'] ?></td>
						<td><?= $row['Country'] ?></td>
						<td><?= $row['Device'] ?></td>
						<td><?= $row['Proxy'] ?></td>
						<td><?= $row['Latitude'] ?></td>
						<td><?= $row['Longitude'] ?></td>
					</tr>
				<?php 
				} ?>
			</table>
		</div>
</body>
</html>
