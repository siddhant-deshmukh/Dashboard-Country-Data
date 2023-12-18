from enum import Enum
from typing import List
from strawberry import input, enum

@enum
class EnumSubjectCodes(Enum):
    GGR = "GGR"
    GGX = "GGX"
    GGXCNL = "GGXCNL"
    GGXWDN = "GGXWDN"
    LP = "LP"
    LUR = "LUR"
    NGDP = "NGDP"
    NGDPD = "NGDPD"
    NGDPDPC = "NGDPDPC"
    NGDP_R = "NGDP_R"
    NGDPRPC = "NGDPRPC"
    NGSD_NGDP = "NGSD_NGDP"
    NID_NGDP = "NID_NGDP"
    PCPI = "PCPI"
    PCPIPCH = "PCPIPCH"
    PPPSH = "PPPSH"
    TM_RPCH = "TM_RPCH"
    TX_RPCH = "TX_RPCH"

@input 
class InputGetDataForSubCountry:
    iso: str 
    subject_code: EnumSubjectCodes 
    years: List[int]

@input 
class InputGetDataForCountry:
    iso: str 
    subjectCodes: List[EnumSubjectCodes] 
    years: List[int]

