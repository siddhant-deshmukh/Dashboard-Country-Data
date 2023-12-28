# from db import db
from api.Models.db import db
from sqlalchemy import Integer, String, Float, Text
from sqlalchemy.orm import Mapped, mapped_column

class Subjects_data(db.Model):
  __tablename__ = 'subject_data'
  id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)
  subject_code: Mapped[str] = mapped_column(String(10), nullable=False)
  description: Mapped[str] = mapped_column(Text)
  notes: Mapped[str] = mapped_column(Text)
  units: Mapped[str] = mapped_column(String(30), nullable=False)
  scale: Mapped[str] = mapped_column(String(8))

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