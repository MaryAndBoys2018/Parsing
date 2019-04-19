import requests
import json
import re

#===============================================================================
class Parser:

    def _parse_lviv_obl_energo(self):
        r = requests.get("http://loe.lviv.ua/ua/planovi_vidkluchenna")
        pattern_for_site = r"<table style=\"width: 100%\" cellspacing=\"5\" cellpadding=\"5\"><tr><th style=\"padding: 10px; font-weight: bold; width: 20%\">Район</th><th style=\"font-weight: bold; width: 20%\">Нас. пункт</th><th style=\"font-weight: bold; width: 20%\">Вулиця</th><th style=\"font-weight: bold; width: 15%\">Буд.</th><th style=\"font-weight: bold; width: 25%\">Період</th></tr>.+</table><br><br />"
        table = re.findall(pattern_for_site, r.text)
        dirty_data = table[0].split("</tr>")
        clear_data = []
        for i in range(0, len(dirty_data)):
            if i % 11 != 0:
                clear_data.append(dirty_data[i])
        return clear_data[0:-1]

    def _convert_data_from_loe(self, notifications):
        pattern = r"<td>\w+</td>"
        data = []
        for notification in notifications:
            buffer = []
            dict_buffer = {}
            buffer.extend(notification.split("><"))
            buffer = buffer[1:6]
            for i in range(len(buffer)):
                buffer[i] = buffer[i][3:-4]

            dict_buffer["region"] = buffer[0]
            dict_buffer["locality"] = buffer[1]
            dict_buffer["street"] = buffer[2]
            dict_buffer["house"] = buffer[3]
            dict_buffer["period"] = buffer[4][0:-1]
            dict_buffer["information"] = "Відключення світла"

            data.append(dict_buffer)

        return data

    def get_loe_info(self):
        return self._convert_data_from_loe(self._parse_lviv_obl_energo())

    def writeJSON(self, data):
        with open('notifications.json', 'w', encoding = 'utf-8') as f:
            json.dump(data, f, ensure_ascii = False)

    def readJSON(self):
        with open('notifications.json') as f:
            return json.load(f)

#===============================================================================

if __name__ == "__main__":
    parser = Parser()
    data = parser.get_loe_info()
    parser.writeJSON(data)
    for notification in data:
        print(notification)
