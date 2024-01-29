import { inject } from '@angular/core'
import { LangService } from './app/shared/services/lang/lang.service.ts'

export const colors = require('tailwindcss/colors')

export let colors2={...colors.red,DEFAULT:colors.red[600]}
export const changeTheme = () => {
  const theme = inject(LangService)
  let lang='uz'
  theme.lang$.subscribe(val=>theme=val)
  console.log(lang)
  if(lang===en){
    colors2={...colors.red,DEFAULT:colors.red[600]}
    return { ...colors.red, DEFAULT: colors.red[700] }
  }else{
    colors2='#3f51b5'
    return '#3f51b5'
  }
}
