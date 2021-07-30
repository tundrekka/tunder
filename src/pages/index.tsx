import { NavBar } from "components/NavBar"
import { usePostsQuery } from "generated/graphql"
import { withUrqlClient } from "next-urql"
import { createUrqlClient } from "utils/createUrqlClient"

const Index = () => {
  const [{data}] = usePostsQuery({
    variables: {
      limit: 3
    }
  })
  return (
    <div>
      <NavBar />
      <h2>hola index</h2>
      <br />
      {
        !data ? <p>Loading...</p> : data.posts.map(p => (
          <h4 key={p.id}>{p.title}</h4>
        ))
      }
    </div>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
