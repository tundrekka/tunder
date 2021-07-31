import { cacheExchange, Resolver } from '@urql/exchange-graphcache'
import {
   LogoutMutation,
   MeQuery,
   MeDocument,
   LoginMutation,
   RegisterMutation,
} from 'generated/graphql'
import { dedupExchange, fetchExchange, stringifyVariables } from 'urql'
import { betterUpdateQuery } from './betterUpdateQuery'
import { pipe, tap } from 'wonka'
import { Exchange } from 'urql'
import Router from 'next/router'

export type MergeMode = 'before' | 'after'

export const cursorPagination = (): Resolver => {
   return (_parent, fieldArgs, cache, info) => {
      const { parentKey: entityKey, fieldName } = info
      const allFields = cache.inspectFields(entityKey)
      const fieldInfos = allFields.filter(
         (info) => info.fieldName === fieldName
      )
      const size = fieldInfos.length
      if (size === 0) {
         return undefined
      }
      const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`
      const isInCache = cache.resolve(entityKey, fieldKey)
      info.partial = !isInCache
      let hasMore = true
      const results: string[] = []
      fieldInfos.forEach(fi => {
         const key = cache.resolve(entityKey, fi.fieldKey) as string
         const data = cache.resolve(key, 'posts') as string[]
         const _hasMore = cache.resolve(key, 'hasMore')
         if(!_hasMore) {
            hasMore = _hasMore as boolean
         }
         results.push(...data)
      })
      
      return {
         __typename: "PaginatedPosts",
         hasMore: hasMore,
         posts: results
      }
   }
}

const errorExchange: Exchange =
   ({ forward }) =>
   (ops$) => {
      return pipe(
         forward(ops$),
         tap(({ error }) => {
            if (error?.message.includes('not authenticated')) {
               console.log('error urqlclient error handler')
               Router.replace('/login')
            }
         })
      )
   }

export const createUrqlClient = (ssrExchange: any) => ({
   url: 'http://localhost:4001/graphql',
   fetchOptions: {
      credentials: 'include' as const,
   },
   exchanges: [
      dedupExchange,
      cacheExchange({
         keys: {
            PaginatedPosts: () => null
         },
         resolvers: {
            Query: {
               posts: cursorPagination(),
            },
         },
         updates: {
            Mutation: {
               createPost: (_result, args, cache, info) => {
                  const allFields = cache.inspectFields('Query')
                  const fieldInfos = allFields.filter(
                     (info) => info.fieldName === 'posts'
                  )
                  fieldInfos.forEach((fi) => {
                     cache.invalidate('Query', 'posts', fi.arguments)
                  })
                  cache.invalidate('Query', 'posts', {
                     limit: 12,
                     cursor: null
                  })
               },
               logout: (_result, args, cache, info) => {
                  betterUpdateQuery<LogoutMutation, MeQuery>(
                     cache,
                     { query: MeDocument },
                     _result,
                     () => ({ me: null })
                  )
               },

               login: (_result, args, cache, info) => {
                  betterUpdateQuery<LoginMutation, MeQuery>(
                     cache,
                     { query: MeDocument },
                     _result,
                     (result, query) => {
                        if (result.login.errors) {
                           return query
                        } else {
                           return {
                              me: result.login.user,
                           }
                        }
                     }
                  )
               },

               register: (_result, args, cache, info) => {
                  betterUpdateQuery<RegisterMutation, MeQuery>(
                     cache,
                     { query: MeDocument },
                     _result,
                     (result, query) => {
                        if (result.register.errors) {
                           return query
                        } else {
                           return {
                              me: result.register.user,
                           }
                        }
                     }
                  )
               },
            },
         },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
   ],
})
