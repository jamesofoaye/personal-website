import '../styles/index.css'
import { FormspreeProvider } from '@formspree/react';

function MyApp({ Component, pageProps }) {
  return (
    <FormspreeProvider project="1545700498336644988">
      <Component {...pageProps} />
    </FormspreeProvider>
  )
}

export default MyApp
