import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>ID: { id }</p>
}

export default Home