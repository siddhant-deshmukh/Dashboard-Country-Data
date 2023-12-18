# from db import db
from api.Models.db import db
from sqlalchemy import Integer, String, Float
from sqlalchemy.orm import Mapped, mapped_column

class World_data(db.Model):
  __tablename__ = 'world_data'
  id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)
  iso: Mapped[str] = mapped_column(String(4), nullable=False)
  country: Mapped[str] = mapped_column(String(40), nullable=False)
  units: Mapped[str] = mapped_column(String(30), nullable=False)
  country_code: Mapped[str] = mapped_column(Integer, nullable=False)
  subject_code: Mapped[str] = mapped_column(String(20), nullable=False)
  scale: Mapped[str] = mapped_column(String(30))

  year_2002: Mapped[float] = mapped_column(Float)
  year_2003: Mapped[float] = mapped_column(Float)
  year_2004: Mapped[float] = mapped_column(Float)
  year_2005: Mapped[float] = mapped_column(Float)
  year_2006: Mapped[float] = mapped_column(Float)
  year_2007: Mapped[float] = mapped_column(Float)
  year_2008: Mapped[float] = mapped_column(Float)
  year_2009: Mapped[float] = mapped_column(Float)
  year_2010: Mapped[float] = mapped_column(Float)
  year_2011: Mapped[float] = mapped_column(Float)
  year_2012: Mapped[float] = mapped_column(Float)
  year_2013: Mapped[float] = mapped_column(Float)
  year_2014: Mapped[float] = mapped_column(Float)
  year_2015: Mapped[float] = mapped_column(Float)
  year_2016: Mapped[float] = mapped_column(Float)
  year_2017: Mapped[float] = mapped_column(Float)
  year_2018: Mapped[float] = mapped_column(Float)
  year_2019: Mapped[float] = mapped_column(Float)
  year_2020: Mapped[float] = mapped_column(Float)
  year_2021: Mapped[float] = mapped_column(Float)
  year_2022: Mapped[float] = mapped_column(Float)
  year_2023: Mapped[float] = mapped_column(Float)
  year_2024: Mapped[float] = mapped_column(Float)
  year_2025: Mapped[float] = mapped_column(Float)
  year_2026: Mapped[float] = mapped_column(Float)

# print("Through world data")
subject_code_names = {
  'NGDP_R' : 'GDP (Constant)',
  'NGDP' : 'GDP (Current)',
  'NGDPD' : 'GDP (Current)', # USD
  'NGDPRPC' : 'GDP Per Capita (Constant)',
  'NGDPDPC' : 'GDP Per Capita (Current)', #USD
  'PPPSH' : 'GDP (PPP)',
  'NID_NGDP' : 'Total Investment',
  'NGSD_NGDP' : 'Gross national savings',
  'PCPI' : 'Inflation',
  'PCPIPCH' : 'Inflation (Avg Consumer Prices)',
  'TM_RPCH' : 'Imports',
  'TX_RPCH' : 'Exports',
  'LUR' : 'Unemployment rate',
  'LP' : 'Population',
  'GGR' : 'Goverment Revenue',
  'GGX' : 'Goverment Expenditure',
  'GGXCNL' : 'Goverment Borrowing',
  'GGXWDN' : 'Goverment Debt',
}