# YU Sync

## Modifying repo
Upon opening the project in your IDE you *may* find errors all over the place, enter the following commands in your terminal, **make sure it is in the project directory**:

**CREATE A PYTHON VIRTUAL ENV FOR THE SECOND COMMAND**
npm update
pip install -r requirements.txt 

I will add any npm packages you need here to render some of the stuff: <br>
npm i install react-router-dom <br>
npm i react-infinite-scroll-component <br>
npm install @supabase/supabase-js

## Links
See below for link navigation
**http://localhost:5173/** is the *home* page <br>
**http://localhost:5173/explore** is where *all courses* are visible <br>
**http://localhost:5173/explore/dept** is where all courses with the corresponding *dept* are shown <br>
**http://localhost:5173/explore/dept/code** is where a singular course is shown, this is where the *bulk of users* will dump data <br>
**http://localhost:5173/*** and/or **http://localhost:5173/lost** help redirect the user back to the homepage <br>
**http://localhost:5173/about** leads to the *about* page, basically YU Sync History and Team Info  <br>
**http://localhost:5173/privacy** is the *privacy policy* page, this page **MUST NOT** be touched without review <br>
**http://localhost:5173/signup** handles *any accounts made through YU Sync's built-in user creation* <br>

## Changes to JSON data
Should you change data belonging to YU Sync's Courses JSON data, kill any running process for backend and frontend, make sure your current directory is C:\Users\User\your_folders\YU-Sync\backend> and run: **python manage.py import_courses** only once. 