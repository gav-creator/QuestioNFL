import pandas as pd
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import nfl_data_py as nfl
from datetime import datetime

blurbs = pd.read_csv("rotoworld_injury_blurbs_batch.csv")

# Intensity analyzer
analyzer = SentimentIntensityAnalyzer()
blurbs["sentiment"] = blurbs["snippet"].apply(lambda x: analyzer.polarity_scores(str(x))["compound"])

# Importing weekly
seasons = [2023]
weekly = nfl.import_weekly_data(seasons)

# Importing schedule
schedule = nfl.import_schedules([2023])

# Proper weekly
weekly = weekly[['player_name','season','week','fantasy_points_ppr']]
weekly = weekly.merge(schedule[["season","week","gameday"]], on=["season", "week"], how='left')

# Convert date columns to datetime
blurbs['snapshot_date'] = blurbs['snapshot_date'].astype(str).str[:8]
blurbs['snapshot_date'] = pd.to_datetime(blurbs['snapshot_date'], format='%Y%m%d', errors='coerce')
weekly['gameday'] = pd.to_datetime(weekly['gameday'])

# CREATE NAME MAPPING FROM NFL DATA
def map_name_to_initial(full_name):
    # Split the full name into parts
    name_parts = full_name.strip().split()
    
    # Extract the first name and last name
    first_name = name_parts[0]
    last_name = name_parts[-1]
    
    # Format as "First Initial Last Name"
    return f"{first_name[0].upper()}.{last_name}"

# Convert blurbs player names to NFL format
blurbs['nfl_player_name'] = blurbs['player_name'].apply(map_name_to_initial)

# Enhanced function with detailed debugging
def get_next_game_points(row, weekly_df):
    player = row["nfl_player_name"]
    blurb_date = row["snapshot_date"]

    games = weekly_df[weekly_df["player_name"] == player]
    future_games = games[games["gameday"] > blurb_date]

    if future_games.empty:
        return None

    next_game = future_games.nsmallest(1, "gameday").iloc[0]

    # force scalar
    return (next_game["fantasy_points_ppr"])

print("\nProcessing players with detailed debugging...")
# Apply the function using the mapped names
blurbs["next_game_fantasy_points"] = blurbs.apply(
    lambda row: get_next_game_points(row, weekly),
    axis=1
)


# Save result
blurbs.to_csv("blurbs_sentiment_nextgame.csv", index=False)

print("Saved to blurbs_with_sentiment_and_nextgame.csv")