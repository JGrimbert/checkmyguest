export interface ILegend {
  amount: number
  amountProvision: number | 0
}

export interface IInputXL {
  name: string
  label: string
  append: string
  amount: number
}

export interface IInputRange {
  name: string
  label: string
  amount: number
  legend(o: ILegend): string
  min: number
  max: number
}

export interface IInputs {
  [key: string]: IInputXL | IInputRange
}
