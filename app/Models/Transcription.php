<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transcription extends Model
{
    use HasFactory;

    /**
     * Get the post that owns the comment.
     */
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
