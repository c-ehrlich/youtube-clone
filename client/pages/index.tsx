import { ReactElement } from 'react'
import HomePageLayout from '../layout/home'
import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      test
    </div> 
  )
}

Home.getLayout = function(page: ReactElement){
  return <HomePageLayout>{page}</HomePageLayout>
}

export default Home
