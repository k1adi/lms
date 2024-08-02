<?php

use Carbon\Carbon;

if (!function_exists('convertToJakartaTime')) {
    function convertToJakartaTime(string $datetime)
    {
        return Carbon::parse($datetime)
                     ->setTimezone('Asia/Jakarta')
                     ->format('Y-m-d H:i:s');
    }
}