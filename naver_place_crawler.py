import requests
import json
import base64
import time
import random
from datetime import datetime
from urllib.parse import quote

# 설정
QUERY = "부평 맛집"
MAX_PLACES = 10

# 실제 브라우저와 최대한 유사한 헤더 설정
HEADERS_BASE = {
    "accept": "*/*",
    "accept-language": "ko,en-US;q=0.9,en;q=0.8",
    "content-type": "application/json",
    "origin": "https://m.place.naver.com",
    "sec-ch-ua": '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
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
            "restaurantListInput": {
                "query": QUERY, "x": "126.7237", "y": "37.4925", "start": 1, "display": 20, "deviceType": "pc"
            },
            "isNmap": False, "isBounds": False
        },
        "query": """query getRestaurantList($restaurantListInput: RestaurantListInput) {
            restaurants: restaurantList(input: $restaurantListInput) {
                items { id name visitorReviewCount category }
            }
        }"""
    }]
    try:
        resp = requests.post(url, headers=headers, json=payload, timeout=15)
        return resp.json()[0]['data']['restaurants']['items'][:MAX_PLACES]
    except:
        return []

def get_real_view_counts(place_id):
    """제공된 curl의 정밀한 변수들을 적용"""
    url = "https://api.place.naver.com/graphql"
    wtm = make_wtm_header(place_id)
    headers = {
        **HEADERS_BASE, 
        "x-wtm-graphql": wtm, 
        "referer": f"https://m.place.naver.com/restaurant/{place_id}/review/visitor"
    }
    
    # curl에 포함되었던 상세 변수들 추가
    payload = [{
        "operationName": "getVisitorReviews",
        "variables": {
            "input": {
                "businessId": str(place_id),
                "businessType": "restaurant",
                "item": "0",
                "size": 10,
                "isPhotoUsed": False,
                "includeContent": True,
                "getUserStats": True,
                "includeReceiptPhotos": True,
                "getReactions": True,
                "getTrailer": True
            }
        },
        "query": """query getVisitorReviews($input: VisitorReviewsInput) {
          visitorReviews(input: $input) {
            items {
              viewCount
            }
            total
          }
        }"""
    }]

    try:
        # 깃허브 액션 환경에서는 차단이 잦으므로 대기시간을 더 늘림 (3~6초)
        wait_time = random.uniform(3.0, 6.0)
        time.sleep(wait_time)
        
        resp = requests.post(url, headers=headers, json=payload, timeout=20)
        data = resp.json()[0]['data']['visitorReviews']
        
        total = data.get('total', 0)
        items = data.get('items', [])
        
        view_counts = []
        for i in items:
            vc = i.get('viewCount')
            if vc is not None:
                view_counts.append(int(vc))
        
        # 만약 가져온 데이터가 모두 0이거나 가짜 데이터(198 등)라면 실패로 간주
        if view_counts and all(v in [0, 99, 198] for v in view_counts):
            return total, view_counts, "MOCK_DATA"
            
        return total, view_counts, "SUCCESS"
    except Exception as e:
        return 0, [], str(e)

def main():
    print(f"Starting Analysis for: {QUERY}")
    items = get_search_list()
    if not items:
        print("Failed to get search list.")
        return
    
    final_data = []
    for idx, item in enumerate(items, 1):
        p_id, name = item['id'], item['name']
        print(f"[{idx}/10] Fetching: {name} (ID: {p_id})")
        
        tab_total, views, status = get_real_view_counts(p_id)
        
        # 결과 로깅
        print(f"      Status: {status}, Views: {views}")
        
        final_data.append({
            "rank": idx, 
            "name": name, 
            "list_cnt": item.get('visitorReviewCount', 0), 
            "tab_cnt": tab_total, 
            "sum": sum(views), 
            "views": views,
            "status": status
        })

    # HTML 보고서 생성 (상태 표시 추가)
    html = """
    <html><head><meta charset='utf-8'>
    <style>
        body { font-family: sans-serif; padding: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #f4f4f4; }
        .mock { color: orange; font-weight: bold; }
        .fail { color: red; }
        .success { color: green; font-weight: bold; }
    </style></head><body>
    """
    html += f"<h1>Naver Place Analysis: {QUERY}</h1>"
    html += f"<p>Generated at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>"
    html += "<table><tr><th>Rank</th><th>Name</th><th>List Count</th><th>Tab Count</th><th>View Sum</th><th>Views</th><th>Status</th></tr>"
    
    for d in final_data:
        st_class = "success" if d['status'] == "SUCCESS" else "mock" if d['status'] == "MOCK_DATA" else "fail"
        html += f"""
        <tr>
            <td>{d['rank']}</td>
            <td>{d['name']}</td>
            <td>{d['list_cnt']}</td>
            <td>{d['tab_cnt']}</td>
            <td>{d['sum']:,}</td>
            <td>{d['views']}</td>
            <td class='{st_class}'>{d['status']}</td>
        </tr>"""
    
    html += "</table></body></html>"
    
    with open("report.html", "w", encoding="utf-8") as f:
        f.write(html)

if __name__ == "__main__":
    main()
