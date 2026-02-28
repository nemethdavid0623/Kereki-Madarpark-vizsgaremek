<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Opening extends Model
{
    protected $table = 'openings';

    protected $fillable = [
        'day',
        'open_time',
        'close_time',
        'is_closed'
    ];
}
