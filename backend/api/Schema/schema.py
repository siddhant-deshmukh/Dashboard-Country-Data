import typing
from strawberry import type, field, Schema
from api.Schema.types import Country, Subject, DataRow
from api.Schema.resolver import get_all_countries, get_all_subjects, get_data_for_country, get_data_for_subject_country

@type
class Query:
    countries: typing.List[Country] = field(resolver=get_all_countries)
    subjects: typing.List[Subject] = field(resolver=get_all_subjects)
    countrySubData: typing.Optional[DataRow] = field(resolver=get_data_for_subject_country)
    countryData: typing.Optional[typing.List[DataRow]] = field(resolver=get_data_for_country)


schema = Schema(query=Query)

