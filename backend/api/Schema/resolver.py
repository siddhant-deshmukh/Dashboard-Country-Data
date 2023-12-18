from typing import List
from sqlalchemy import text

from api.Models.db import db
from api.Models.World_data import World_data, subject_code_names
from api.Schema.types import Country, DataRow, YearlyData, Subject
from api.Schema.inputs import InputGetDataForCountry, InputGetDataForSubCountry


def get_all_countries():
    countries = World_data.query.distinct().with_entities(World_data.country_code, World_data.country, World_data.iso).all()
    res  = []
    for row in countries:
        code, name, iso = row.tuple()
        res.append(Country(code=code, name=name, iso=iso))
    return res

def get_all_subjects():
    query_ = World_data.query.distinct().with_entities(World_data.subject_code, World_data.scale, World_data.units)
    subjects = query_.all()
    res  = []
    
    for row in subjects:
        subject_code, scale, units = row.tuple()
        res.append(Subject(code=subject_code, scale=scale, units=units, name=subject_code_names[subject_code]))
    return res

def get_data_for_subject_country(fields: InputGetDataForSubCountry):
    
    if not checkYears(fields.years):
       raise Exception("Improper years")
    
    selected_columns = "iso, subject_code, "
    for year in fields.years:
        selected_columns += "year_" + str(year) + ", " 
    query = f"SELECT {selected_columns[:-2]} FROM world_data WHERE subject_code='{fields.subject_code.name}' AND iso='{fields.iso}'"
    # print(query)
    # result = World_data.query.from_statement(text(query)).all()
    # stmt = text(query)
    query_result = db.session.execute(text(query)).all()


    if(len(query_result) > 0):
        res_ = query_result[0]
        country_code = res_[0]
        subject_code = res_[1]
        values : List[YearlyData] = []
        for i in range(len(fields.years)):
            values.append(YearlyData(year=fields.years[i], value=res_[i+2]))
            # values.append({ 'year': fields.years[i], 'value': res_[i+2] })
        
        # print(country_code, subject_code, values)
        return DataRow(
            country_code=country_code,
            subject_code=subject_code,
            values=values
        )
    else:
        return None

def get_data_for_country(fields: InputGetDataForCountry):
    
    if not checkYears(fields.years):
       raise Exception("Improper years")
    
    selected_columns = "iso, subject_code, "
    for year in fields.years:
        selected_columns += "year_" + str(year) + ", " 
    sub_codes = ""
    for code in fields.subjectCodes:
        sub_codes += "'" + code.name + "', "
    query = f"SELECT {selected_columns[:-2]} FROM world_data WHERE subject_code IN ({sub_codes[:-2]}) AND iso='{fields.iso}'"
    # print('query :', query)
    
    query_result = db.session.execute(text(query)).all()

    if(len(query_result) == 0):
        return None
    
    res : List[DataRow] = []
    for row in query_result:
        country_code = row[0]
        subject_code = row[1]
        values : List[YearlyData] = []
        for i in range(len(fields.years)):
            values.append(YearlyData(year=fields.years[i], value=row[i+2]))

        res.append(DataRow(
            country_code=country_code,
            subject_code=subject_code,
            values=values
        ))
    return res


def checkYears(years : List | int):
  if type(years) is int:
    if years > 2001 and years < 2027 :
      return True
    else:
      return False
  else:
    for year in years:
      if year < 2002 or year > 2026 :
        return False
  return True