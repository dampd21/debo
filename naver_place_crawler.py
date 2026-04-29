import requests
import json
import base64
import time
import random
import os
from datetime import datetime
from urllib.parse import quote

# 설정
QUERY = "부평 맛집"
MAX_PLACES = 10

HEADERS_BASE = {
    "accept": "*/*",
    "accept-language": "ko",
    "content-type": "application/json",
    "origin": "https://m.place.naver.com",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
}

def make_wtm_header(place_id):
    payload = {"arg": str(place_id), "type": "restaurant", "source": "place"}
    json_str = json.dumps(payload, ensure_ascii=False)
    return base64.b64encode(json_str.encode("utf-8")).decode("utf-8")

def get_search_list():
    url = "https://api.place.naver.com/graphql"
    wtm = make_wtm_header(QUERY)
    headers = {**HEADERS_BASE, "x-wtm-graphql": wtm, "referer": f"https://m.place.naver.com/restaurant/list?query={quote(QUERY)}"}
    payload = [{
        "operationName": "getRestaurantList",
        "variables": {
            "restaurantListInput": {"query": QUERY, "x": "126.9783882", "y": "37.5666103", "start": 1, "display": 20, "deviceType": "pc"},
            "isNmap": False, "isBounds": False
        },
        "query": "query getRestaurantList($restaurantListInput: RestaurantListInput) { restaurants: restaurantList(input: $restaurantListInput) { items { id name visitorReviewCount category } } }"
    }]
    try:
        resp = requests.post(url, headers=headers, json=payload, timeout=15)
        return resp.json()[0]['data']['restaurants']['items'][:MAX_PLACES]
    except:
        return []

def get_real_view_counts(place_id):
    url = "https://api.place.naver.com/graphql"
    wtm = make_wtm_header(place_id)
    headers = {**HEADERS_BASE, "x-wtm-graphql": wtm, "referer": f"https://m.place.naver.com/restaurant/{place_id}/review/visitor"}
    payload = [{
        "operationName": "getVisitorReviews",
        "variables": {"input": {"businessId": str(place_id), "businessType": "restaurant", "size": 10}},
        "query": "query getVisitorReviews($input: VisitorReviewsInput) { visitorReviews(input: $input) { total items { viewCount } } }"
    }]
    try:
        time.sleep(random.uniform(2.0, 4.0)) # 깃허브 액션에서는 더 넉넉하게 대기
        resp = requests.post(url, headers=headers, json=payload, timeout=15)
        data = resp.json()[0]['data']['visitorReviews']
        return data.get('total', 0), [int(i['viewCount']) for i in data.get('items', []) if i.get('viewCount') is not None]
    except:
        return 0, []

def main():
    items = get_search_list()
    if not items: return
    
    final_data = []
    for idx, item in enumerate(items, 1):
        p_id, name = item['id'], item['name']
        print(f"Processing {idx}: {name}")
        tab_total, views = get_real_view_counts(p_id)
        final_data.append({"rank": idx, "name": name, "list_cnt": item.get('visitorReviewCount', 0), "tab_cnt": tab_total, "views": views, "sum": sum(views)})

    # HTML 생성
    html = "<html><head><meta charset='utf-8'><style>table{width:100%;border-collapse:collapse;}th,td{border:1px solid #ddd;padding:8px;}</style></head><body>"
    html += f"<h1>Naver Place Analysis: {QUERY}</h1><table><tr><th>Rank</th><th>Name</th><th>List Count</th><th>Tab Count</th><th>View Sum</th><th>Views</th></tr>"
    for d in final_data:
        html += f"<tr><td>{d['rank']}</td><td>{d['name']}</td><td>{d['list_cnt']}</td><td>{d['tab_cnt']}</td><td>{d['sum']}</td><td>{d['views']}</td></tr>"
    html += "</table></body></html>"
    
    with open("report.html", "w", encoding="utf-8") as f:
        f.write(html)

if __name__ == "__main__":
    main()
