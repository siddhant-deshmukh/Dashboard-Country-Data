import strawberry
from typing import Optional, List

@strawberry.type
class Country:
    name: str
    iso: str
    code: int

@strawberry.type 
class Subject:
    name: str
    code: str
    scale: Optional[str]
    units: str 

@strawberry.type 
class YearlyData:
    year: int
    value: float

@strawberry.type 
class DataRow:
    country_code: str 
    subject_code: str 
    values: List[YearlyData]