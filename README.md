# YU Sync

## Modifying Repo
A brief mention of tech stack, this repo uses React + Typescript & TailwindCSS + DaisyUI, along with some basic python for csv cleaning and web scraping, with a Supabase backend. <br>

Python modules can be installed via *pip install -r requirements.txt* <br>

NPM modules can be installed via *npm update* <br>

Start up the project using *npm run dev*

### File Structure
You may see there are various files and what not, mainly being the *src* and *scraper*, see below for more detail. <br>

**src**: There are tons of files here, so I did my best to organize it cleanly. there are 4 main folders as you'll see, including smaller folders in them. <br>

**components**: This folder is as it states, however, *subcomponents* contains components that are used for *1 page only*. Add here to keep it linear. <br>

**elective-finder**: Simple enough, as of my current readme update there is only 2 file, but I expect it to grow further, **this will be updated if so**. <br>

**pages**: The holy grail of the site, be very careful with these pages and only if necessary touch the *return ()* parts purely to style UI, the logic has no need to change, unless necessary. <br>

**utils**: Makes life easy, the main one you'll see used is *callAPI*, this simply contains the init of a supabase instance to allow access to the database(s). <br>

**scraper**: You only really need to touch *ratemyprof_api* and *headers.py*, the scraper will take some time to work, and ensure you run headers.py with the **absolute** filepath to your csv file, relative has errors (at least for me).

## Links
See below for link navigation, as found in *routes.tsx*
**http://localhost:5173/** is the *home* page <br>
**http://localhost:5173/explore** is where *popular courses* are visible <br>
**http://localhost:5173/explore/courses** is where *all courses* are visible <br>
**http://localhost:5173/explore/professors** is where all professor info is visible <br>
**http://localhost:5173/explore/dept** is where all courses with the corresponding *dept* are shown <br>
**http://localhost:5173/explore/dept/code** is where a singular course is shown, this is where the *bulk of users* will dump data <br>
**http://localhost:5173/*** and/or **http://localhost:5173/lost** help redirect the user back to the homepage <br>
**http://localhost:5173/faq** leads to the *faq* page  <br>
**http://localhost:5173/about** leads to the *about* page,<br>
**http://localhost:5173/privacy** is the *privacy policy* page, this page **MUST NOT** be touched without review <br>
