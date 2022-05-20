<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Map extends Model
{
    use HasFactory;

    /**
     * Get the post that owns the comment.
     */
    public function relation()
    {
        return $this->belongsTo(Relation::class);
    }
}
