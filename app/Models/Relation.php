<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Relation extends Model
{
    use HasFactory;

    /**
     * Get the comments for the blog post.
     */
    public function maps()
    {
        return $this->hasMany(Map::class);
    }

    /**
     * Get the comments for the blog post.
     */
    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    /**
     * Get the comments for the blog post.
     */
    public function sources()
    {
        return $this->hasMany(Source::class);
    }
}
