# YU Sync

## Modifying repo
Upon opening the project in your IDE you *may* find errors all over the place, enter the following commands in your terminal **CREATE A PYTHON VIRTUAL ENV FOR THE SECOND COMMAND** <br>

npm update <br>
pip install -r requirements.txt 

## Links
See below for link navigation
**http://localhost:5173/** is the *home* page <br>
**http://localhost:5173/explore** is where *all courses* are visible <br>
**http://localhost:5173/explore/dept** is where all courses with the corresponding *dept* are shown <br>
**http://localhost:5173/explore/dept/code** is where a singular course is shown, this is where the *bulk of users* will dump data <br>
**http://localhost:5173/*** and/or **http://localhost:5173/lost** help redirect the user back to the homepage <br>
**http://localhost:5173/about** leads to the *about* page, basically YU Sync History and Team Info  <br>
**http://localhost:5173/privacy** is the *privacy policy* page, this page **MUST NOT** be touched without review <br>


## Changes to JSON data
As of 2024/11/03 there is no defined way to send changed JSON data without using the SQL Shell to export the data as a csv file, then adding that file to the Supabase Table. I will update on a refined method shortly.