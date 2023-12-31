import { ApolloClient, ApolloError, gql } from "@apollo/client"
import { ICountriesInfo, ICountryCompLinearData } from "../../types"
import { GraphQLError } from "graphql"

export async function GetCountrySubData(
  client: ApolloClient<object>,
  countryInfo: ICountriesInfo,
  subjectCode: string,
  startYear: number,
  endYear: number,
  color?: string,
  setGErrors?: React.Dispatch<React.SetStateAction<string[]>>
) {

  try {
    let years = []
    for (let y = startYear; y < endYear; y++) {
      years.push(y)
    }

    const { data, error, errors, networkStatus } = await client.query({
      query: QueryCountrySubjectData,
      variables: {
        ISO: countryInfo.iso,
        SubjectCode: subjectCode,
        Years: years,
      }
    })
    console.log(data, error, errors, networkStatus)
    // console.log(result.error, result.errors, result.data, result.data?.countrySubData?.values)

    let theYearlyData = data?.countrySubData?.values as { value: number, year: number }[]
    let yearlyDataSorted = theYearlyData.slice().sort((d1, d2) => {
      // console.log("d1, d2", d1, d2)
      if (!d1.year && !d2.year) return -1;
      if (!d1.year || d1.year < d2.year) return -1;
      else if (d1.year > d2.year) return 1;
      return 1
    })
    // console.log(yearlyDataSorted)

    const countrySubData: ICountryCompLinearData = {
      country: countryInfo,
      data: yearlyDataSorted.map((data) => {
        return data.value
      }),
      color: color ? color : 'red',
    }
    // console.log('countrySubData', countrySubData)

    return countrySubData
  } catch (err) {
    if (setGErrors) {
      if (Array.isArray(err)) {
        let errors = err as GraphQLError[]
        setGErrors((prev) => {
          return errors.map((error) => error.message)
            .concat(prev.slice())
        })
      } else if (err) {
        let error = err as ApolloError
        setGErrors((prev) => {
          return ["While getting data of country " + countryInfo.name + " of subject " + subjectCode + " got error :" + error.message]
            .concat(prev.slice())
        })
      }
    }
    console.error("While fetching country data", err)
    return null
  }
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