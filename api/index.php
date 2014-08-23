<?php

$app = new Phalcon\Mvc\Micro();

$app->get('/', function(){echo "<h1>Appoint</h1>";});


$app->post('/book', function(){
		$res = array(
            "result"=> 6,
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