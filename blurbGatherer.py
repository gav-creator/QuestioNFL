import requests, time, csv, random
from bs4 import BeautifulSoup

#skill and injury keyword lists for filtering later
skill_positions = ["QB","RB","WR","TE", 
                   "Quarterback", "Runningback", 
                   "Wide receiver", "Tight end", 
                   "Offense", "Offensive", "receiver",
                   "routes", "passes", "catching"]
injury_terms = ["injury", "questionable",
                "doubtful", "ankle", "hamstring",
                "lingering", "strain", "sprain",
                "tightness", "soreness", "sore",
                "bruise", "tweak", "groin", "knee"]

#Function that gets URLs from internet archive
def get_wayback_urls(urls, from_date, to_date):
    wayback_api_url = "http://web.archive.org/cdx/search/cdx"
    available_urls = {}

    for url in urls:
        params = {
            "url": url,
            "from": from_date,
            "to": to_date,
            "output": "json",
            "fl": "timestamp,original",
            "filter": ["statuscode:200"],
            # "collapse": "timestamp:4"   # 1 capture per year
        }
        response = requests.get(wayback_api_url, params=params)
        data = response.json()

        url_dict = {
            item[0]: f"http://web.archive.org/web/{item[0]}/{item[1]}"
            for item in data[1:]
        }
        
        available_urls.update(url_dict)

    return available_urls


urls = [
        "https://www.nbcsports.com/fantasy/football/player-news"
    ]
from_date = "20230625"  # YYYYMMDD
to_date = "20250911"  # YYYYMMDD
wayback_urls = get_wayback_urls(urls, from_date, to_date)

print(f"Amount of URLs: {len(wayback_urls.keys())}")

rows = []

subset = list(sorted(wayback_urls.items()))[220:240] #Adjust this to keep on savin blurbs

for i, (snap_date, url) in enumerate(subset, start=1):
    try:
        print(f"[{i}/{len(subset)}] {snap_date} -> fetching {url}")
        resp = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=20)
        soup = BeautifulSoup(resp.text, "html.parser")

        blurbs = soup.find_all("div", class_="PlayerNewsPost-analysis")
        for b in blurbs:
            snippet = b.get_text(" ", strip=True)
            if any(pos in snippet for pos in skill_positions) and any(term in snippet.lower() for term in injury_terms):
                rows.append([snap_date, url, snippet])

        # delay between requests
        time.sleep(5)

    except Exception as e:
        print(f"Error on {snap_date}: {e}")

# Save after all 20 are done
with open("rotoworld_injury_blurbs_batch.csv", "a", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["snapshot_date", "snapshot_url", "snippet"])
    writer.writerows(rows)

print(f"✅ Done. Saved {len(rows)} blurbs from {len(subset)} snapshots.")
print("Rows written this run:", len(rows))
