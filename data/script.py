import csv 

def getInt(str : str):
  try:
    return int(str)
  except:
    return -1
def getFloat(str : str):
  try:
    return float(str)
  except:
    return None
  
with open ('./WEOApr2021all.csv', mode='r')as file:
  csvFile = csv.reader(file)

  count : int = 0
  headers : list[int | str | None] = []
  data : list[list[float| int | str | None]] = []

  for line in csvFile:
    if(count == 0):
      for word in line:
        _int = getInt(word)
        if _int == -1:
          headers.append(word)
        elif _int < 2013:
          headers.append(None)
        else:
          headers.append(_int)
      print(headers)  
    else:
      curr_data = []
      for _ in range(0, len(headers)):
        if(headers[_] == None):
          continue
        try :
          if(line[_] == 'n/a' or line[_] == ''):
            curr_data.append(None)
          elif(type(headers[_]) is int):
            _float = getFloat(line[_])
            if _float == None:
              curr_data.append(None)
            else:
              curr_data.append(_float)
          else:
            curr_data.append(line[_])
        except :
          if(len(curr_data) == _):
            curr_data.append(None)
    count+= 1