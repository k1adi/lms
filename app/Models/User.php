<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'full_name', 'username', 'email', 'no_hp', 'no_nik', 'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'nik',
        'phone',
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($user) {
            $user->hasRole()->detach();
            $user->hasSchedule()->detach();
            $user->buPosition()->detach();
        });
    }

    public function setPasswordAttribute($value)
    {
        if ($value) {
            $this->attributes['password'] = Hash::needsRehash($value) ? Hash::make($value) : $value;
        }
    }

    public function buPosition(): BelongsToMany
    {
        return $this->belongsToMany(Bu::class, 'user_bu_positions', 'user_id', 'bu_id')
                    ->withPivot('position_id')
                    ->using(UserBuPosition::class);
    }

    public function hasRole(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'user_role', 'user_id', 'role_id');
    }

    public function grantPermission(): Collection
    {
        return $this->hasRole->map->hasPermission->flatten()->unique();
    }

    public function hasSchedule(): BelongsToMany
    {
        return $this->belongsToMany(Schedule::class, 'schedule_accesses', 'user_id', 'schedule_id');
    }

    public function syncBuPosition(array $pivot): void
    {
        $syncData = [];

        foreach($pivot as $item) {
            $buId = $item['bu']['value'];

            if(!isset($syncData[$buId])) {
                $syncData[$buId] = ['position_id' => []];
            }

            foreach($item['position'] as $position) {
                $positionId = $position['value'];
                if (!in_array($positionId, $syncData[$buId]['position_id'])) {
                    $syncData[$buId]['position_id'][] = $positionId;
                    $this->buPosition()->attach([
                        $buId => ['position_id' => $positionId]
                    ]);
                }
            }
        }
    }

    public function courseProgress(): BelongsToMany
    {
        return $this->belongsToMany(SubSection::class, 'user_progressions', 'user_id', 'sub_section_id');
    }

    public function courseFinisheds(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_finisheds', 'user_id', 'course_id');
    }

    public function assignmentLog(): BelongsToMany
    {
        return $this->belongsToMany(Assignment::class, 'user_assignment_logs')
                    ->withPivot('score', 'status', 'created_at');
    }
}
