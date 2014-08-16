<?php
$loader = new \Phalcon\Loader();

$app = new Phalcon\Mvc\Micro();

$app->get('/', function(){echo "<h1><a href='http://www.google.com'>sid</a></h1>";});
$app->get('/add', 'func1');
$app->get('/some/route', 'func2');

function func1(){
echo "string";
}
function func2(){
echo "string2";
}
$app->handle();