import React, { useCallback, useEffect, useState } from "react"
import { IFieldsState, TColorThemeOptions } from "../types"
import { ApolloError, gql, useQuery } from "@apollo/client"
import { SwitchTheme } from "../Themes"

export const AppContext = React.createContext<{
  gErrors: string[]
  setGErrors: React.Dispatch<React.SetStateAction<string[]>>
  changeTheme: () => void
  colorTheme: TColorThemeOptions
  fieldsState: IFieldsState | undefined
  fields: {
    loading: boolean
    error: ApolloError | undefined
  }
}>({
  gErrors: [],
  setGErrors: () => { },
  changeTheme: () => { },
  colorTheme: "grey",
  fieldsState: {
    countries: undefined,
    subjects: undefined,
  },
  fields: {
    loading: true,
    error: undefined
  }
})

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [gErrors, setGErrors] = useState<string[]>([])
  const [colorTheme, setColorTheme] = useState<TColorThemeOptions>('grey')

  const { loading, error, data: fieldsState } = useQuery<IFieldsState>(GET_COUNTRIES_SUBJECTS, {
    fetchPolicy: 'cache-first'
  });

  // console.log('fieldState', fieldsState)

  const changeTheme = useCallback(() => {
    setColorTheme((prev) => {
      if (prev === "grey") return "dark-blue"
      else if (prev === "dark-blue") return "light-blue"
      else return "grey"
    })
  }, [setColorTheme])

  useEffect(() => {
    SwitchTheme(colorTheme, document)
  }, [colorTheme])

  return (
    <AppContext.Provider value={{ colorTheme, gErrors, setGErrors, fieldsState, fields: { loading, error }, changeTheme }}>
      {children}
    </AppContext.Provider>
  )
}

const GET_COUNTRIES_SUBJECTS = gql`
  query QueryGetDataFields {
    countries {
      code
      name
      iso
    }
    subjects {
      code
      name
      scale
      units
      description
      notes
    }
  }
`

const DefaultFieldsState = {
  countries: [
    {
      "__typename": "Country",
      "code": 111,
      "name": "United States",
      "iso": "USA"
    },
    {
      "__typename": "Country",
      "code": 534,
      "name": "India",
      "iso": "IND"
    },
    {
      "__typename": "Country",
      "code": 134,
      "name": "Germany",
      "iso": "DEU"
    },
    {
      "__typename": "Country",
      "code": 158,
      "name": "Japan",
      "iso": "JPN"
    }
  ],
  subjects: [
    {
      "__typename": "Subject",
      "code": "GGX",
      "name": "Goverment Expenditure",
      "scale": "Billions",
      "units": "National currency",
      "description": "General government total expenditure",
      "notes": "Total expenditure consists of total expense and the net acquisition of nonfinancial assets. Note: Apart from being on an accrual basis, total expenditure differs from the GFSM 1986 definition of total expenditure in the sense that it also takes the disposals of nonfinancial assets into account."
    },
    {
      "__typename": "Subject",
      "code": "NGDP",
      "name": "GDP (Current)",
      "scale": "Billions",
      "units": "National currency",
      "description": "Gross domestic product, current prices",
      "notes": "Expressed in billions of national currency units. Expenditure-based GDP is total final expenditures at purchasers' prices (including the f.o.b. value of exports of goods and services), less the f.o.b. value of imports of goods and services. [SNA 1993]"
    },
    {
      "__typename": "Subject",
      "code": "NGDPDPC",
      "name": "GDP Per Capita (Current)",
      "scale": "Units",
      "units": "U.S. dollars",
      "description": "Gross domestic product per capita, current prices",
      "notes": "GDP is expressed in current U.S. dollars per person. Data are derived by first converting GDP in national currency to U.S. dollars and then dividing it by total population."
    },
    {
      "__typename": "Subject",
      "code": "NGSD_NGDP",
      "name": "Gross national savings",
      "scale": null,
      "units": "Percent of GDP",
      "description": "Gross national savings",
      "notes": "Expressed as a ratio of gross national savings in current local currency and GDP in current local currency. Gross national saving is gross disposable income less final consumption expenditure after taking account of an adjustment for pension funds. [SNA 1993] For many countries, the estimates of national saving are built up from national accounts data on gross domestic investment and from balance of payments-based data on net foreign investment."
    },
  ]
}

const DefaultGraphData = {
  "GGX": [
    {
      "country": {
        "name": "Germany",
        "iso": "DEU",
        "code": 134
      },
      "data": [
        994.297779648063,
        1208.09151996093,
        1316.28600127292,
        1333.66855906761,
        1354.73629983061,
        1486.80034606229,
        1655.2110823133,
        1642.45526121035,
        1637.98482202464,
        1695.82900815278,
        1585.32903504522,
        1678.15514411226,
        1723.43191604923,
        1482.22819353112,
        1538.58198542782,
        1627.0237948869,
        1763.02166719799,
        1744.43468186892,
        1943.11039024917,
        2227.78634362315,
        2173.51374542565,
        2215.6788787599,
        2281.1500917639,
        2350.03617148051,
        2427.23656453522
      ],
      "color": "#E61F00"
    },
    {
      "country": {
        "name": "Japan",
        "iso": "JPN",
        "code": 158
      },
      "data": [
        1501.04139088966,
        1607.80906420728,
        1674.74534166174,
        1645.83204382783,
        1544.21374961835,
        1536.79251308593,
        1761.75515122281,
        2067.73623145022,
        2196.22824459884,
        2430.25348388548,
        2443.66029603089,
        2035.89045701932,
        1893.03133683917,
        1669.5179230615,
        1875.02857844908,
        1819.68468320818,
        1863.20055379317,
        1916.21409386871,
        2356.09741577111,
        2313.52743066568,
        2139.43143441908,
        2190.43779622991,
        2260.29078570285,
        2328.99638392971,
        2405.85342402034
      ],
      "color": "#004EE0"
    },
    {
      "country": {
        "name": "India",
        "iso": "IND",
        "code": 534
      },
      "data": [
        149.86733939906,
        181.9595921866,
        201.750516513119,
        220.489819487844,
        253.021241040947,
        327.845459696937,
        351.194678316039,
        383.01446256694,
        468.925972852423,
        503.901534694775,
        500.112855538158,
        493.88664068965,
        534.668862911014,
        569.20991353607,
        624.754049214932,
        695.524721588715,
        711.617782036918,
        776.489826966819,
        839.248119712593,
        891.89317082172,
        948.359882411484,
        1011.84184071949,
        1086.12678383551,
        1168.36473510789,
        1255.85928082809
      ],
      "color": "#fcba03"
    },
    {
      "country": {
        "__typename": "Country",
        "code": 111,
        "name": "United States",
        "iso": "USA"
      },
      "data": [
        3683.34,
        3899.59,
        4119.15,
        4423.47,
        4654.17,
        5001.96,
        5485.77,
        5993.62,
        5983.28,
        6045.28,
        6032.29,
        6037.15,
        6218.82,
        6409.39,
        6653.33,
        6908.79,
        7301.43,
        7647.5,
        9666.48,
        10213.31,
        8960.29,
        8942.18,
        9233.09,
        9657.29,
        10060.55
      ],
      "color": "#01F50D"
    }
  ],
  "NGDP": [
    {
      "country": {
        "name": "Germany",
        "iso": "DEU",
        "code": 134
      },
      "data": [
        2077.02,
        2501.01,
        2813.08,
        2848.44,
        2994.86,
        3425.98,
        3744.85,
        3407.56,
        3402.44,
        3748.66,
        3529.38,
        3733.86,
        3890.1,
        3357.93,
        3468.9,
        3681.3,
        3965.57,
        3861.55,
        3803.01,
        4319.29,
        4598.12,
        4757.65,
        4923.01,
        5084.35,
        5253.1
      ],
      "color": "#E61F00"
    },
    {
      "country": {
        "name": "Japan",
        "iso": "JPN",
        "code": 158
      },
      "data": [
        4182.85,
        4519.56,
        4893.14,
        4831.47,
        4601.66,
        4579.75,
        5106.68,
        5289.49,
        5759.07,
        6233.15,
        6272.36,
        5212.33,
        4897,
        4444.93,
        5003.68,
        4930.84,
        5036.89,
        5148.78,
        5048.69,
        5378.14,
        5653.46,
        5977.36,
        6170.37,
        6351.1,
        6533.02
      ],
      "color": "#004EE0"
    },
    {
      "country": {
        "name": "India",
        "iso": "IND",
        "code": 534
      },
      "data": [
        523.768,
        618.369,
        721.589,
        834.218,
        949.118,
        1238.7,
        1224.1,
        1365.37,
        1708.46,
        1823.05,
        1827.64,
        1856.72,
        2039.13,
        2103.59,
        2294.12,
        2651.47,
        2701.11,
        2870.5,
        2708.77,
        3049.7,
        3312.95,
        3591.03,
        3884.73,
        4199.01,
        4534.34
      ],
      "color": "#fcba03"
    },
    {
      "country": {
        "__typename": "Country",
        "code": 111,
        "name": "United States",
        "iso": "USA"
      },
      "data": [
        10936.45,
        11458.25,
        12213.73,
        13036.63,
        13814.6,
        14451.88,
        14712.83,
        14448.93,
        14992.05,
        15542.6,
        16197.05,
        16784.83,
        17527.28,
        18238.3,
        18745.1,
        19542.98,
        20611.88,
        21433.23,
        20932.75,
        22675.27,
        24003.7,
        24892.61,
        25790.12,
        26719.63,
        27659.15
      ],
      "color": "#01F50D"
    }
  ],
  "NGDPDPC": [
    {
      "country": {
        "name": "Germany",
        "iso": "DEU",
        "code": 134
      },
      "data": [
        25460.33,
        30668.94,
        34534.81,
        35020.2,
        36894.47,
        42299.86,
        46367.72,
        42338.71,
        42379.84,
        46697.52,
        43883.39,
        46299.23,
        48035.95,
        41107.22,
        42124.32,
        44537.1,
        47832.06,
        46472.62,
        45732.8,
        51860.11,
        55144.37,
        57014.54,
        58976.41,
        60915.01,
        62969.27
      ],
      "color": "#E61F00"
    },
    {
      "country": {
        "name": "Japan",
        "iso": "JPN",
        "code": 158
      },
      "data": [
        32832.3,
        35410.22,
        38307.1,
        37819.1,
        36021.9,
        35847.23,
        39992.06,
        41469.77,
        45135.8,
        48760.91,
        49175.05,
        40934.76,
        38522.77,
        35005.66,
        39411.42,
        38903.3,
        39818.8,
        40801.66,
        40146.07,
        42927.73,
        45310.91,
        48118.31,
        49904.9,
        51620.42,
        53373.78
      ],
      "color": "#004EE0"
    },
    {
      "country": {
        "name": "India",
        "iso": "IND",
        "code": 534
      },
      "data": [
        479.063,
        556.326,
        638.787,
        726.918,
        814.353,
        1046.9,
        1019.51,
        1121.25,
        1384.17,
        1458.11,
        1443.88,
        1449.61,
        1573.88,
        1605.61,
        1732.05,
        1980.69,
        1996.95,
        2098.93,
        1964.88,
        2190.9,
        2357.64,
        2532.09,
        2714.71,
        2908.84,
        3114.63
      ],
      "color": "#fcba03"
    },
    {
      "country": {
        "__typename": "Country",
        "code": 111,
        "name": "United States",
        "iso": "USA"
      },
      "data": [
        37971.28,
        39411.55,
        41629.86,
        44025.56,
        46213.51,
        47869.24,
        48283.41,
        47007.67,
        48403.3,
        49829.06,
        51563.13,
        53071.82,
        55024.66,
        56848.51,
        58017.23,
        60105.85,
        63055.98,
        65253.52,
        63415.99,
        68308.97,
        71895.79,
        74130.27,
        76362.22,
        78660.27,
        80958.76
      ],
      "color": "#01F50D"
    }
  ],
  "NGSD_NGDP": [
    {
      "country": {
        "name": "Germany",
        "iso": "DEU",
        "code": 134
      },
      "data": [
        22.667,
        21.851,
        24.359,
        24.159,
        26.343,
        28.241,
        27.138,
        24.393,
        25.81,
        27.848,
        26.845,
        26.611,
        27.575,
        28.344,
        28.475,
        28.635,
        28.953,
        28.486,
        27.439,
        29.095,
        28.729,
        28.943,
        29.068,
        29.174,
        29.2
      ],
      "color": "#E61F00"
    },
    {
      "country": {
        "name": "Japan",
        "iso": "JPN",
        "code": 158
      },
      "data": [
        28.508,
        28.746,
        29.359,
        29.574,
        29.87,
        30.401,
        28.662,
        25.349,
        26.427,
        25.624,
        24.957,
        25.299,
        25.788,
        28.235,
        28.791,
        29.342,
        29.068,
        29.407,
        28.831,
        29.038,
        28.144,
        27.864,
        27.881,
        27.829,
        27.776
      ],
      "color": "#004EE0"
    },
    {
      "country": {
        "name": "India",
        "iso": "IND",
        "code": 534
      },
      "data": [
        25.961,
        29.109,
        32.476,
        33.463,
        34.651,
        36.843,
        32.025,
        33.665,
        33.701,
        35.402,
        33.541,
        32.286,
        32.954,
        31.067,
        29.547,
        29.147,
        29.953,
        29.809,
        29.427,
        28.872,
        29.109,
        29.388,
        29.366,
        29.331,
        29.338
      ],
      "color": "#fcba03"
    },
    {
      "country": {
        "__typename": "Country",
        "code": 111,
        "name": "United States",
        "iso": "USA"
      },
      "data": [
        18.335,
        17.418,
        17.755,
        18.19,
        19.25,
        17.559,
        15.276,
        13.938,
        15.466,
        16.498,
        18.777,
        19.201,
        20.356,
        20.141,
        18.733,
        19.216,
        19.052,
        18.608,
        17.802,
        17.523,
        18.109,
        18.605,
        18.819,
        18.978,
        19.097
      ],
      "color": "#01F50D"
    }
  ]
}