import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import useQueryConffig from './useQueryConffig'
import { Schema, schema } from 'src/uitils/rules'
import { createSearchParams, useNavigate } from 'react-router-dom'

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])

function useSearchProducts() {
  const queryConfig = useQueryConffig()

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }

    navigate({
      pathname: '/',
      search: createSearchParams(config).toString()
    })
  })
  return { onSubmitSearch, register }
}
export default useSearchProducts
