import { createAction } from '@reduxjs/toolkit'

export const setLayoutLoadingCounter = createAction<number>('layout/setLoadingCounter')

export const startLayoutLoading = createAction('layout/startLoadingCounter')

export const endLayoutLoading = createAction('layout/endLoadingCounter')