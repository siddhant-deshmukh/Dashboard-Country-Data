from typing import List
from sqlalchemy import text

from api.Models.db import db
from api.Models.Subjects_data import Subjects_data
from api.errors import APIBadRequestError, APINotFoundError
from api.Models.World_data import World_data, subject_code_names
from api.Schema.types import Country, DataRow, YearlyData, Subject
from api.Schema.inputs import InputGetDataForCountry, InputGetDataForSubCountry

# * Get the list of all DISTINCT countries inside the database with their iso, country_code
def get_all_countries():
    countries = World_data.query.distinct().with_entities(World_data.country_code, World_data.country, World_data.iso).all()
    res  = []
    for row in countries:
        code, name, iso = row.tuple()
        res.append(Country(code=code, name=name, iso=iso))
    return res
    
# * Get the list of all subjects with their code, description and notes
def get_all_subjects():
    query_ = Subjects_data.query.with_entities(Subjects_data.subject_code, Subjects_data.description, Subjects_data.notes, Subjects_data.scale, Subjects_data.units)
    # query_ = World_data.query.distinct().with_entities(World_data.subject_code, World_data.scale, World_data.units)
    subjects = query_.all()
    res  = []
    for row in subjects:
        subject_code, description, notes, scale, units = row.tuple()
        res.append(Subject(code=subject_code, scale=scale, units=units, name=subject_code_names[subject_code], description=description, notes=notes))
    return res
    

# * Get the yearly data for a single country for a single subject
def get_data_for_subject_country(fields: InputGetDataForSubCountry):
    if not checkYears(fields.years):
        raise Exception('Incorrect fields')
    
    selected_columns = "iso, subject_code, "
    for year in fields.years:
        selected_columns += "year_" + str(year) + ", " 
    query = f"SELECT {selected_columns[:-2]} FROM world_data WHERE subject_code='{fields.subject_code.name}' AND iso='{fields.iso}'"
    query_result = db.session.execute(text(query)).all()

    if(len(query_result) > 0):
        res_ = query_result[0]
        country_code = res_[0]
        subject_code = res_[1]
        values : List[YearlyData] = []
        for i in range(len(fields.years)):
            values.append(YearlyData(year=fields.years[i], value=res_[i+2]))
            
        return DataRow(
            country_code=country_code,
            subject_code=subject_code,
            values=values
        )
    else:
        raise APINotFoundError('Query returns empty')

# * Get the yearly data for a single country for various subjects
def get_data_for_country(fields: InputGetDataForCountry):
    if not checkYears(fields.years):
        raise APIBadRequestError("Improper years")
    
    selected_columns = "iso, subject_code, "
    for year in fields.years:
        selected_columns += "year_" + str(year) + ", " 
    sub_codes = ""
    for code in fields.subjectCodes:
        sub_codes += "'" + code.name + "', "
    query = f"SELECT {selected_columns[:-2]} FROM world_data WHERE subject_code IN ({sub_codes[:-2]}) AND iso='{fields.iso}'"
    
    query_result = db.session.execute(text(query)).all()

    if(len(query_result) == 0):
        raise APINotFoundError('Query returns empty')
    
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
    

def checkYears(years : List):
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