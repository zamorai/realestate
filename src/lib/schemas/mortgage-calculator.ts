import * as yup from 'yup';

export const mortgageCalculatorSchema = yup.object({
  homePrice: yup
    .number()
    .required('Home price is required')
    .positive('Home price must be positive')
    .max(100000000, 'Home price must be less than 100M'),
  downPaymentType: yup
    .string()
    .oneOf(['percentage', 'amount'], 'Invalid down payment type')
    .required('Down payment type is required'),
  downPayment: yup
    .number()
    .required('Down payment is required')
    .positive('Down payment must be positive'),
  loanTerm: yup
    .number()
    .required('Loan term is required')
    .oneOf([10, 15, 20, 30], 'Invalid loan term'),
  interestRate: yup
    .number()
    .required('Interest rate is required')
    .positive('Interest rate must be positive')
    .max(30, 'Interest rate must be less than 30%'),
  commonCharges: yup
    .number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value))
    .min(0, 'Common charges must be positive'),
  taxes: yup
    .number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value))
    .min(0, 'Taxes must be positive'),
});

export type MortgageCalculatorInputs = yup.InferType<typeof mortgageCalculatorSchema>; 