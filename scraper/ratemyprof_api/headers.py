import pandas as pd

input_file = "C:\\Users\\Jahiem\\profs.csv"
output_file = "cleaned_data.csv"

correct_headers = ["dept", "first", "last", "numratings", "prof", "overall_rating"]

df = pd.read_csv(input_file, skipinitialspace=True)

df.columns = [col.strip().lower() for col in df.columns]  
df.rename(
    columns={
        "dept": "dept",
        "first": "first_name",
        "last": "last_name",
        "total": "numratings",
        "prof": "prof",
        "rating": "overall_rating"
    },
    inplace=True,
)

df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)

df.to_csv(output_file, index=False, header=correct_headers)

print(f"Cleaned data saved to {output_file}")
