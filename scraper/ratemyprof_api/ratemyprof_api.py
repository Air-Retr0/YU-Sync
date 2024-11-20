import requests
import json
import math
import csv
import os


class Professor:
    def __init__(self, data):
        self.tDept = data.get("tDept", "")
        self.tSid = data.get("tSid", "")
        self.institution_name = data.get("institution_name", "")
        self.tFname = data.get("tFname", "")
        self.tMiddlename = data.get("tMiddlename", "")
        self.tLname = data.get("tLname", "")
        self.tid = data.get("tid", "")
        self.tNumRatings = data.get("tNumRatings", 0)
        self.rating_class = data.get("rating_class", "")
        self.contentType = data.get("contentType", "")
        self.categoryType = data.get("categoryType", "")
        self.overall_rating = data.get("overall_rating", "")


class RateMyProfApi:
    def __init__(self, school_id: str = "1074"):
        self.UniversityId = school_id
        self.professors = {}

        self.output_dir = f"SchoolID_{self.UniversityId}"
        os.makedirs(self.output_dir, exist_ok=True)

    def fetch_page(self, url: str) -> dict:
        try:
            response = requests.get(url)
            response.raise_for_status()
            return json.loads(response.content)
        except requests.RequestException as e:
            print(f"Error fetching URL {url}: {e}")
            return {}

    def get_num_of_professors(self) -> int:
        url = (
            f"http://www.ratemyprofessors.com/filter/professor/?&page=1&filter=teacherlastname_sort_s+asc"
            f"&query=*%3A*&queryoption=TEACHER&queryBy=schoolId&sid={self.UniversityId}"
        )
        data = self.fetch_page(url)
        return data.get("remaining", 0) + 20

    def scrape_professors(self):
        num_of_prof = self.get_num_of_professors()
        num_of_pages = math.ceil(num_of_prof / 20)

        for page_num in range(1, num_of_pages + 1):
            url = (
                f"http://www.ratemyprofessors.com/filter/professor/?&page={page_num}&filter=teacherlastname_sort_s+asc"
                f"&query=*%3A*&queryoption=TEACHER&queryBy=schoolId&sid={self.UniversityId}"
            )
            data = self.fetch_page(url)
            for prof_data in data.get("professors", []):
                professor = Professor(prof_data)
                self.professors[professor.tid] = professor

    def write_professor_list_to_csv(self):
        csv_file = os.path.join(self.output_dir, f"SchoolID_{self.UniversityId}.csv")
        csv_columns = [ # this needs to be updated
            "tDept", "tSid", "institution_name", "tFname", "tMiddlename",
            "tLname", "tid", "tNumRatings", "rating_class", "contentType",
            "categoryType", "overall_rating"
        ]

        professors_data = [ # same as above
            {
                "tDept": prof.tDept,
                "tSid": prof.tSid,
                "institution_name": prof.institution_name,
                "tFname": prof.tFname,
                "tMiddlename": prof.tMiddlename,
                "tLname": prof.tLname,
                "tid": prof.tid,
                "tNumRatings": prof.tNumRatings,
                "rating_class": prof.rating_class,
                "contentType": prof.contentType,
                "categoryType": prof.categoryType,
                "overall_rating": prof.overall_rating,
            }
            for prof in self.professors.values()
        ]

        with open(csv_file, "w", newline="") as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
            writer.writeheader()
            writer.writerows(professors_data)

        print(f"Professor data saved to {csv_file}")


if __name__ == '__main__':
    yorku = RateMyProfApi("1495")  
    print("Scraping professor data")
    yorku.scrape_professors()
    print("Writing data to CSV")
    yorku.write_professor_list_to_csv()
    print("Done")
