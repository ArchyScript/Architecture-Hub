import { AnyObject } from '../typings'

interface PaystackPopupOptions {
  key: string
  email: string
  amount: number
  currency: string
  ref?: string
  callback: (response: AnyObject) => void
  onClose: () => void
  metadata: AnyObject
}

interface PaystackPopUp {
  setup: (
    options: PaystackPopupOptions,
  ) => {
    openIframe: () => void
  }
}

declare let PaystackPop: PaystackPopUp

export interface PaystackPaymentArguments {
  amount: number
  email: string
  firstname: string
  lastname: string
  phone: string
  program: string
  currency: 'NGN' | 'USD'
}

const testKey = ''

export const payWithPaystack = (
  args: PaystackPaymentArguments,
  callback?: Function,
  handleClose?: Function,
) => {
  const { amount, email, firstname, lastname, phone, program, currency } = args
  const handler = PaystackPop.setup({
    key: testKey || 'pk_live_e3776f5de5cc351401c37919931b471a67e7e54b',
    email,
    amount: amount * 100,
    currency,
    // ref: generateReferenceFromEmail(email),
    metadata: {
      amount,
      email,
      firstname,
      lastname,
      phone,
      program,
    },
    callback(response) {
      callback && callback(response)
    },
    onClose() {
      handleClose && handleClose()
    },
  })

  handler.openIframe()

  return handler
}
