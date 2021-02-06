<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new User();
        $admin->email = 'admin@user.com';
        $admin->role = 'admin';
        $admin->password = bcrypt('password');
        $admin->name = 'Admin User';
        $admin->save();

        $superAdmin = new User();
        $superAdmin->email = 'peter@gmail.com';
        $superAdmin->role = 'super-admin';
        $superAdmin->password = bcrypt('password');
        $superAdmin->name = 'Peter Braganza';
        $superAdmin->save();
    }
}
