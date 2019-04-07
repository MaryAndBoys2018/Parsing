import requests
import json
import re

#===============================================================================

def extractData():
    r = requests.get("http://loe.lviv.ua/ua/planovi_vidkluchenna")
    pattern_for_site = r"<table style=\"width: 100%\" cellspacing=\"5\" cellpadding=\"5\"><tr><th style=\"padding: 10px; font-weight: bold; width: 20%\">Район</th><th style=\"font-weight: bold; width: 20%\">Нас. пункт</th><th style=\"font-weight: bold; width: 20%\">Вулиця</th><th style=\"font-weight: bold; width: 15%\">Буд.</th><th style=\"font-weight: bold; width: 25%\">Період</th></tr><tr><td>.+</td></tr></table><br><br />"
    table = re.findall(pattern_for_site, r.text)
    pattern_for_table = r"<tr><td>.+</td></tr>"
    return re.findall(pattern_for_table, table[0])

#===============================================================================

def convert(notifications):
    pattern = r"<td>\w+</td>"
    data = []
    for notification in notifications:
        buffer = []
        dict_buffer = {}
        buffer.extend(notification.split("><"))
        buffer = buffer[1:-1]
        for i in range(len(buffer)):
            buffer[i] = buffer[i][3:-4]
            
        dict_buffer["Район"] = buffer[0]
        dict_buffer["Нас.пункт"] = buffer[1]
        dict_buffer["Вулиця"] = buffer[2]
        dict_buffer["Буд."] = buffer[3]
        dict_buffer["Період"] = buffer[4]
        
        data.append(dict_buffer)

    return data

#================================================================================

def writeJSON(data):
    with open('notifications.json', 'w', encoding = 'utf-8') as f:
        json.dump(data, f, ensure_ascii = False)

def readJSON():
    with open('notifications.json') as f:
        return json.load(f)

#===============================================================================
    
if __name__ == "__main__":
    data = convert(extractData())
    writeJSON(data)
    
