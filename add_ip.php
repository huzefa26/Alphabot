<?php
	header('Access-Control-Allow-Origin: *');
	$ip = $_POST['ip'];
	$city = $_POST['city'];
	$state = $_POST['state'];
	$zip = $_POST['zip'];
	$country = $_POST['country'];
	$device = $_POST['device'];
	$proxy = $_POST['proxy'];
	$latitude = $_POST['latitude'];
	$longitude = $_POST['longitude'];
	if($proxy == True){
		$query = "INSERT INTO user_details(IP,City,State,Zip,Country,Device,Proxy,Latitude,Longitude)VALUES('$ip','$city','$state','$zip','$country','$device',1,'$latitude','$longitude')";
	}
	else{
		$query = "INSERT INTO user_details(IP,City,State,Zip,Country,Device,Proxy,Latitude,Longitude)VALUES('$ip','$city','$state','$zip','$country','$device',0,'$latitude','$longitude')";
	}
	$con = mysqli_connect('localhost','root','','user_details');
	if(mysqli_query($con,$query)){
		echo "Data Entered Successfully";
	}
	else{
		echo mysqli_error($con);
	}
?>