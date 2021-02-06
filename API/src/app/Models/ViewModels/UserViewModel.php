<?php

namespace App\Models\ViewModels;

use App\Models\User;

class UserViewModel
{
    /**
     * @var string
     */
    public $role;

    /**
     * @var string
     */
    public $name;

    /**
     * @var string
     */
    public $email;

    /**
     * UserViewModel constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->email = $user->email;
        $this->role = $user->role;
        $this->name = $user->name;

    }
}
