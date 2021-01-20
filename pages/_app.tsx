import React from "react"
import { StylesProvider } from "@material-ui/core/styles"

import 'antd/dist/antd.css'

//side menu
import "components/side_menu.css"

import "lib/static/nprogress.css"
import "styles/body.scss"
import "styles/upload.scss"


const MyApp = ({ Component, pageProps }) => {

    React.useEffect(() => {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector("#jss-server-side")
      if (jssStyles) {
        jssStyles.parentElement.removeChild(jssStyles)
      }
    }, [])
   
    return (
      // <ProviderRedux store={store}>
        // {/* <ApolloProvider client={Client}> */}
          <StylesProvider injectFirst>
            <Component {...pageProps} />
          </StylesProvider>
        // {/* </ApolloProvider> */}
      // </ProviderRedux>
    )
  }
  
  export default MyApp
  