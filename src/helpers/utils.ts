export const authHeaders = (token: string | undefined) => {
  const headers = new Headers()

  if(token) {
    headers.append('Authorization', `Bearer ${ token }`)
  }

  return headers
}

export const setDateForForm = (date: Date | string | undefined): string | undefined => { // Format date from server for react hook form
  if(date === null || date === undefined) {
    return undefined
  }

  const dateObj = typeof date === 'string' || typeof date === 'function' ? new Date(date) : date

  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')

  return `${ year }-${ month }-${ day }`
}

export const formatPhone = (phone: string): string | undefined => { // Format phone number
  if(phone) {
    return `${ phone.slice(0, 3) }-${ phone.slice(3, 6) }-${ phone.slice(6, 10) }`
  }
}

// export const handleDeleteBtnClick = async (uuid: HandleDeleteBtnClickProps['uuid'], deleteBtnActive: HandleDeleteBtnClickProps['deleteBtnActive'], deleteFn: HandleDeleteBtnClickProps['deleteFn'], options: HandleDeleteBtnClickProps['options']): Promise<void> => { // Handle delete button click
//   const { setState, handleCloseForm, invalidateQuery } = options 

//   if(!deleteBtnActive && setState) {
//     setState(prevState => ({ ...prevState, deleteBtnActive: true }))
//   } else {
//     const result = await deleteFn(uuid)

//     if(result.success) {
//       handleSuccessfulFormSubmit(result.msg as string, { invalidateQuery, handleCloseForm })
//     } else errorPopup(result.msg)
//   }
// }