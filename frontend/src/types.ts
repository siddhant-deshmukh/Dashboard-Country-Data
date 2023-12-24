export type ICountriesInfo = {
  name: string
  iso: string
  code: number
}
export type ISubjectsInfo = {
  name: string
  code: string
  scale?: string
  units: string
}
export interface IFieldsState {
  // countries?: {
  //   [key: string]: ICountriesInfo
  // }
  // subjects?: {
  //   [key: string]: ISubjectsInfo
  // }
  countries? : ICountriesInfo[]
  subjects?: ISubjectsInfo[]
}

export interface IYearlyData {
  year: number,
  value: number,
}

export interface ICountrySubjectData {
  country_code: number
  subject_code: number
  values: [IYearlyData]
}

export type ICountryCompLinearData = {
  country: ICountriesInfo,
  color?: string,
  data: number[]
}