<?php

$app = new Phalcon\Mvc\Micro();

$app->get('/', function(){echo "<h1>Appoint</h1>";});


$app->post('/book', function(){
		
		$request = new \Phalcon\Http\Request();
    
        $req =  $request->getJsonRawBody();
        
        
        $name = $req->name;
        $mobile = $req->mobile;

        $date = $req->date;
        $ymd = DateTime::createFromFormat('Y-m-d', $date)->format('Y-m-d');
        //$mysqldate = date( 'Y-m-d', $ymd );
        $today = date("Y-m-d G:i:s");      
        
        require 'PasswordHash.php';
        require 'data.php';
        
        // Are we debugging this code?  If enabled, OK to leak server setup details.
        $debug = FALSE;

        function fail($pub, $pvt = '')
        {
            global $debug;
            $msg = $pub;
            if ($debug && $pvt !== '')
                $msg .= ": $pvt";
        
            exit("An error occurred ($msg).\n");
        }

        $db = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);
        if (mysqli_connect_errno())
            fail('MySQL connect'.mysqli_connect_error(), mysqli_connect_error());

        ($stmt = $db->prepare('select max(token) AS token from patients where date = ?'))
            || fail('MySQL prepare'.$db->error, $db->error);
        $stmt->bind_param('s', $ymd)
            || fail('MySQL bind_param', $db->error);

        if (!$stmt->execute()) {
       
            if ($db->errno === 1062 )
                fail('This username is already taken');
            else
                fail('MySQL execute'.$db->error, $db->error);
        }
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $token = 0;
        if($row['token']==NULL){
        	$token = 1;
        }else{
        	$token = $row['token']+1;
        } 
        
        $stmt->close();

        ($stmt = $db->prepare('insert into patients (token, name, mobile, date, entry_on) values (?, ?, ?, ?, ?)'))
            || fail('MySQL prepare'.$db->error, $db->error);
        $stmt->bind_param('isiss', $token, $name, $mobile, $ymd, $today)
            || fail('MySQL bind_param', $db->error);
        $r=-1;
        if (!$stmt->execute()) {
       
            if ($db->errno === 1062 )
                fail('This username is already taken');
            else
                fail('MySQL execute'.$db->error.$user.$hash.$user_type.$owner, $db->error);
        }else $r = $db->insert_id;
        
       

        $stmt->close();
        $db->close();

        $res = array(
            "total"=> $token
            );

        $response = new \Phalcon\Http\Response();

		//Set status code
		$response->setHeader("Content-Type", "application/json");
		
		//Set the content of the response
		$response->setContent(json_encode($res));

		//Send response to the client
		$response->send();
});































$app->get('/add', 'func1');
$app->get('/some/route', 'func2');

function func1(){
echo "string";
}
function func2(){
echo "string2";
}
$app->handle();