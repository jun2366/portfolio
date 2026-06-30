import json
import urllib.request
import urllib.error

urls = [
    'https://gemini.googleapis.com/v1/models/gemini-1.0:generateMessage',
    'https://gemini.googleapis.com/v1/models/gemini-1.0:generateText',
    'https://gemini.googleapis.com/v1/models/gemini-1.0:predict',
    'https://gemini.googleapis.com/v1beta2/models/gemini-1.0:generateMessage',
    'https://gemini.googleapis.com/v1beta2/models/gemini-1.0:generateText',
    'https://gemini.googleapis.com/v1beta2/models/gemini-1.0:predict',
    'https://generativeai.googleapis.com/v1beta2/models/gemini-1.0:generateMessage',
    'https://generativeai.googleapis.com/v1beta2/models/gemini-1.0:generateText',
    'https://generativeai.googleapis.com/v1beta2/models/gemini-1.0:predict',
    'https://api.generativeai.googleapis.com/v1beta2/models/gemini-1.0:generateMessage',
    'https://api.generativeai.googleapis.com/v1beta2/models/gemini-1.0:generateText',
    'https://api.generativeai.googleapis.com/v1beta2/models/gemini-1.0:predict',
]
headers = {
    'Authorization': 'Bearer REDACTED',
    'Content-Type': 'application/json',
}
body = json.dumps({
    'model': 'gemini-1.0',
    'messages': [
        {'role': 'system', 'content': 'You are a friendly assistant.'},
        {'role': 'user', 'content': 'What time is he available?'}
    ],
    'temperature': 0.2,
    'max_output_tokens': 50,
}).encode('utf-8')

for u in urls:
    print('---', u)
    try:
        req = urllib.request.Request(u, data=body, headers=headers, method='POST')
        with urllib.request.urlopen(req, timeout=20) as resp:
            txt = resp.read(2000).decode('utf-8', errors='replace')
            print('STATUS', resp.status)
            print(txt)
    except urllib.error.HTTPError as e:
        print('STATUS', e.code)
        print(e.read(2000).decode('utf-8', errors='replace'))
    except Exception as e:
        print('ERROR', type(e).__name__, e)
