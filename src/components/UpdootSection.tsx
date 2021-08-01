import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { PostSnippetFragment, useVoteMutation } from 'generated/graphql'
import { useState } from 'react'

interface UpdootSectionProps {
   post: PostSnippetFragment
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
   const [loading, setLoading] = useState<
      'updoot-loading' | 'downdoot-loading' | 'not-loading'
   >('not-loading')
   const [, vote] = useVoteMutation()
   return (
      <Flex
         alignItems="center"
         justifyContent="center"
         flexDirection="column"
         pr={4}
      >
         <IconButton
            onClick={async () => {
               if(post.voteStatus === 1) {
                  return
               }
               setLoading('updoot-loading')
               await vote({
                  postId: post.id,
                  value: 1,
               })
               setLoading('not-loading')
            }}
            colorScheme={post.voteStatus === 1 ? 'green': undefined}
            isLoading={loading === 'updoot-loading'}
            aria-label="Upvote post"
            icon={<ChevronUpIcon w={6} h={6} />}
         />
         <Text>{post.points}</Text>
         <IconButton
            onClick={async () => {
               if(post.voteStatus === -1) {
                  return
               }
               setLoading('downdoot-loading')
               await vote({
                  postId: post.id,
                  value: -1,
               })
               setLoading('not-loading')
            }}
            colorScheme={post.voteStatus === -1 ? 'red': undefined}
            isLoading={loading === 'downdoot-loading'}
            aria-label="Downvote post"
            icon={<ChevronDownIcon w={6} h={6} />}
         />
      </Flex>
   )
}
