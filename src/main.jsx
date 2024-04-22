import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { Layout } from "./layout.jsx"
import { Provider } from "react-redux"
import { store, persistor } from "./redux/store"
import { PersistGate } from "redux-persist/integration/react"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <React.StrictMode>
      <Layout />
    </React.StrictMode>
    </PersistGate>
  </Provider>
)