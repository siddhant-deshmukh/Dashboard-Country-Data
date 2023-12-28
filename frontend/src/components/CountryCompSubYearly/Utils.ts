import { ApolloClient, gql } from "@apollo/client"
import { ICountriesInfo, ICountryCompLinearData } from "../../types"

export async function GetCountrySubData(client: ApolloClient<object>, countryInfo: ICountriesInfo, subjectCode: string, startYear: number, endYear: number, color?: string) {

  let years = []
  for (let y = startYear; y < endYear; y++) {
    years.push(y)
  }

  const result = await client.query({
    query: QueryCountrySubjectData,
    variables: {
      ISO: countryInfo.iso,
      SubjectCode: subjectCode,
      Years: years,
    }
  })

  // console.log(result.error, result.errors, result.data, result.data?.countrySubData?.values)

  let theYearlyData = result.data?.countrySubData?.values as { value: number, year: number }[]
  let yearlyDataSorted = theYearlyData.slice().sort((d1, d2) => {
    // console.log("d1, d2", d1, d2)
    if (!d1.year && !d2.year) return -1;
    if (!d1.year || d1.year < d2.year) return -1;
    else if (d1.year > d2.year) return 1;
    return 1
  })
  // console.log(yearlyDataSorted)

  if (result.error || result.errors || !result.data?.countrySubData?.values) {
    console.error(result.error)
    return null
  }

  const countrySubData: ICountryCompLinearData = {
    country: countryInfo,
    data: yearlyDataSorted.map((data) => {
      return data.value
    }),
    color: color ? color : 'red',
  }
  // console.log('countrySubData', countrySubData)

  return countrySubData
}

export const QueryCountrySubjectData = gql`
    query QueryCountrySubjectData($ISO: String!, $SubjectCode: EnumSubjectCodes!, $Years: [Int!]! ) {
      countrySubData(fields: {iso: $ISO, subjectCode: $SubjectCode, years: $Years}) {
        values {
          value
          year
        }
        countryCode
        subjectCode
      }
    }
  ` 