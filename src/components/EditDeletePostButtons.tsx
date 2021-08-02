import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, IconButton, Link } from '@chakra-ui/react'
import { useDeletePostMutation, useMeQuery } from 'generated/graphql'
import NextLink from 'next/link'
interface Props {
   id: number
   creatorId: number
}

export const EditDeletePostButtons: React.FC<Props> = ({ id, creatorId }) => {

   const [{ data: meData }] = useMeQuery()
   const [{ fetching: deleteFetching }, deletePost] = useDeletePostMutation()

   if(meData?.me?.id !== creatorId ) {
      return null
   }
   
   return (
      <Box>
         <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
            <IconButton
               as={Link}
               colorScheme="teal"
               aria-label="Edit post"
               icon={<EditIcon />}
            />
         </NextLink>
         <IconButton
            onClick={() => {
               deletePost({ id })
            }}
            isLoading={deleteFetching}
            aria-label="delete post"
            icon={<DeleteIcon />}
         />
      </Box>
   )
}
