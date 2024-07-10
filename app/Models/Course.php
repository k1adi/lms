<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $fillable = ['name','type','trainer','thumbnail','url_attachment','prerequisite','description'];

    // Self-referential relationship
    public function prerequisiteCourse()
    {
        return $this->belongsTo(Course::class, 'prerequisite');
    }

    public function coursesWithThisAsPrerequisite()
    {
        return $this->hasMany(Course::class, 'prerequisite');
    }
}
