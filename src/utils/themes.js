import { createTheme } from "@mui/material/styles"


export const customTheme = createTheme({
  components: {
   
  },
})

export const customStyles = {
  headCells: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      backgroundColor: "rgba(255,0,255,1)",
      color: "white", 
      fontSize: "1.3em"

    },
  },
  cells: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      fontSize: "1em"
    },
  },
}