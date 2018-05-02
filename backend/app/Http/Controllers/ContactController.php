<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function __invoke() {
        $msg = "First line of text\nSecond line of text";

// use wordwrap() if lines are longer than 70 characters
        $msg = wordwrap($msg,70);

// send email
        $a = mail("benabbou.yassine@yahoo.fr","My subject",$msg);

        dd($a);
    }
}
